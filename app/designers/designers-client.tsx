"use client"

import { useState, useEffect } from "react"
import { DesignerCard } from "@/components/designer-card"
import { DesignerFilters } from "@/components/designer-filters"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
import type { Designer } from "@/lib/types"
import { countryNameToIso2 } from "@/lib/country-codes"

interface Props {
  designers: Designer[]
  designerCountries: string[]
  productionCountries: string[]
  initialDesignerIso2?: string
}

export default function DesignersClient({
  designers,
  designerCountries,
  productionCountries,
  initialDesignerIso2,
}: Props) {
  const [filteredDesigners, setFilteredDesigners] = useState(designers)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const initialDesignerLocationName =
    initialDesignerIso2 && (designerCountries.find((c) => countryNameToIso2(c) === initialDesignerIso2) || undefined)

  useEffect(() => {
    if (!initialDesignerIso2) return
    const filtered = designers.filter((d) =>
      (d.location ?? []).some((loc) => countryNameToIso2(loc) === initialDesignerIso2),
    )
    setFilteredDesigners(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDesignerIso2, designers])

  const handleFiltersChange = (filters: {
    search: string
    category: string
    subcategory: string
    designerLocation: string
    productionLocation: string
    sustainability: boolean
  }) => {
    let filtered = [...designers]

    if (filters.search) {
      const s = filters.search.toLowerCase()
      filtered = filtered.filter((d) => d.name.toLowerCase().includes(s) || d.bio?.toLowerCase().includes(s))
    }

    if (filters.category) {
      filtered = filtered.filter((d) => d.category && d.category.includes(filters.category))
    }

    if (filters.subcategory) {
      filtered = filtered.filter((d) => d.subcategory && d.subcategory.includes(filters.subcategory))
    }

    if (filters.designerLocation)
      filtered = filtered.filter((d) =>
        d.location?.some((loc) => loc.toLowerCase().includes(filters.designerLocation.toLowerCase())),
      )
    if (filters.productionLocation)
      filtered = filtered.filter((d) =>
        d.production_location?.some((loc) => loc.toLowerCase().includes(filters.productionLocation.toLowerCase())),
      )
    if (filters.sustainability) filtered = filtered.filter((d) => d.is_sustainable)

    setFilteredDesigners(filtered)
  }

  return (
    <main className="flex-1">
      {/* Filters & Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <DesignerFilters
              onFiltersChange={handleFiltersChange}
              designerCountries={designerCountries}
              productionCountries={productionCountries}
              initialFilters={
                initialDesignerLocationName
                  ? {
                      designerLocation: initialDesignerLocationName,
                    }
                  : undefined
              }
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-1">
                  {filteredDesigners.length} Designer
                  {filteredDesigners.length !== 1 && "s"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Showing {filteredDesigners.length} of {designers.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {filteredDesigners.length ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}
              >
                {filteredDesigners.map((d) => (
                  <DesignerCard key={d.id} designer={d} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-serif text-xl font-semibold mb-2">No designers found</h3>
                <p className="text-muted-foreground">Adjust your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
