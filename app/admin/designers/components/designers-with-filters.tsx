"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import type { Designer } from "@/lib/types"
import { Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { DeleteDesignerButton } from "./DeleteDesignerButton"
import { DesignerFilters } from "@/components/designer-filters"

interface DesignersWithFiltersProps {
  initialDesigners: Designer[]
}

export function DesignersWithFilters({ initialDesigners }: DesignersWithFiltersProps) {
  const [designers, setDesigners] = useState<Designer[]>(initialDesigners)
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subcategory: "",
    designerLocation: "",
    productionLocation: "",
    sustainability: false,
  })

  const supabase = createClient()

  // Get unique countries for filter options
  const designerCountries = useMemo(() => {
    const countries = new Set<string>()
    designers.forEach((designer) => {
      if (designer.location && Array.isArray(designer.location)) {
        designer.location.forEach((loc) => countries.add(loc))
      }
    })
    return Array.from(countries).sort()
  }, [designers])

  const productionCountries = useMemo(() => {
    const countries = new Set<string>()
    designers.forEach((designer) => {
      if (designer.production_location && Array.isArray(designer.production_location)) {
        designer.production_location.forEach((loc) => countries.add(loc))
      }
    })
    return Array.from(countries).sort()
  }, [designers])

  // Filter designers based on current filters
  const filteredDesigners = useMemo(() => {
    return designers.filter((designer) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesName = designer.name.toLowerCase().includes(searchTerm)
        const matchesBio = designer.bio?.toLowerCase().includes(searchTerm)
        if (!matchesName && !matchesBio) return false
      }

      // Category filter
      if (filters.category) {
        if (!designer.category || !designer.category.includes(filters.category)) {
          return false
        }
      }

      // Subcategory filter
      if (filters.subcategory) {
        if (!designer.subcategory || !designer.subcategory.includes(filters.subcategory)) {
          return false
        }
      }

      // Designer location filter
      if (filters.designerLocation) {
        if (!designer.location || !designer.location.includes(filters.designerLocation)) {
          return false
        }
      }

      // Production location filter
      if (filters.productionLocation) {
        if (!designer.production_location || !designer.production_location.includes(filters.productionLocation)) {
          return false
        }
      }

      // Sustainability filter
      if (filters.sustainability && !designer.is_sustainable) {
        return false
      }

      return true
    })
  }, [designers, filters])

  // Refresh designers list when a designer is deleted
  const refreshDesigners = async () => {
    const { data, error } = await supabase.from("designers").select("*").order("created_at", { ascending: false })

    if (!error && data) {
      setDesigners(data)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Designers</h1>
          <p className="text-muted-foreground">
            Manage designer profiles and listings ({filteredDesigners.length} of {designers.length} shown)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/designers/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Designer
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <DesignerFilters
        onFiltersChange={setFilters}
        designerCountries={designerCountries}
        productionCountries={productionCountries}
      />

      {/* Designers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigners.map((designer) => (
          <Card key={designer.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{designer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {designer.location && designer.location.length > 0
                      ? designer.location.join(", ")
                      : "No location specified"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={designer.status === "active" ? "default" : "secondary"}>{designer.status}</Badge>
                  {designer.is_featured && <Badge variant="outline">Featured</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {designer.category && designer.category.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {designer.category.map((cat, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    {designer.subcategory && designer.subcategory.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {designer.subcategory.map((subcat, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subcat}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/designers/${designer.slug}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/admin/designers/${designer.id}/edit`}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <DeleteDesignerButton id={designer.id} onDelete={refreshDesigners} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDesigners.length === 0 && designers.length > 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="font-serif text-xl font-semibold mb-2">No designers match your filters</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or clearing some filters.</p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  search: "",
                  category: "",
                  subcategory: "",
                  designerLocation: "",
                  productionLocation: "",
                  sustainability: false,
                })
              }
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {designers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="font-serif text-xl font-semibold mb-2">No designers yet</h3>
            <p className="text-muted-foreground mb-4">Start building your directory by adding the first designer.</p>
            <Button asChild>
              <Link href="/admin/designers/new">
                <Plus className="h-4 w-4 mr-2" />
                Add First Designer
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
