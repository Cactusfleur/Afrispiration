"use client"

import { useState, useEffect } from "react"
import { getPageContentClient } from "@/lib/content"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DesignerCard } from "@/components/designer-card"
import { DesignerFilters } from "@/components/designer-filters"
import { Button } from "@/components/ui/button"
import type { Designer } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Grid, List } from "lucide-react"

export default function DesignersPage() {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [filteredDesigners, setFilteredDesigners] = useState<Designer[]>([])
  const [heroContent, setHeroContent] = useState<any>(null)
  const [designerCountries, setDesignerCountries] = useState<string[]>([])
  const [productionCountries, setProductionCountries] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetchDesigners()
    fetchHeroContent()
  }, [])

  const fetchDesigners = async () => {
    const supabase = createClient()
  const fetchHeroContent = async () => {
    const content = await getPageContentClient('designers')
    setHeroContent(content?.hero || {
      title: "Discover Exceptional Designers",
      description: "Explore our curated collection of innovative fashion designers from around the world. Each profile showcases unique perspectives, sustainable practices, and cultural authenticity."
    })
  }


    const { data, error } = await supabase
      .from("designers")
      .select("*")
      .eq("status", "active")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching designers:", error)
    } else {
      setDesigners(data || [])
      setFilteredDesigners(data || [])

      const designerLocs = Array.from(new Set((data || []).flatMap((d) => d.location || []).filter(Boolean)))
      const productionLocs = Array.from(
        new Set((data || []).flatMap((d) => d.production_location || []).filter(Boolean)),
      )

      setDesignerCountries(designerLocs)
      setProductionCountries(productionLocs)
    }

    setLoading(false)
  }

  const handleFiltersChange = (filters: {
    search: string
    category: string
    subcategory: string
    designerLocation: string
    productionLocation: string
    sustainability: boolean
  }) => {
    let filtered = [...designers]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (designer) =>
          designer.name.toLowerCase().includes(searchTerm) || designer.bio?.toLowerCase().includes(searchTerm),
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((designer) => designer.category === filters.category)
    }

    // Subcategory filter
    if (filters.subcategory) {
      filtered = filtered.filter((designer) => designer.subcategory === filters.subcategory)
    }

    if (filters.designerLocation) {
      filtered = filtered.filter((designer) =>
        designer.location?.some((loc) => loc.toLowerCase().includes(filters.designerLocation.toLowerCase())),
      )
    }

    if (filters.productionLocation) {
      filtered = filtered.filter((designer) =>
        designer.production_location?.some((loc) =>
          loc.toLowerCase().includes(filters.productionLocation.toLowerCase()),
        ),
      )
    }

    // Sustainability filter
    if (filters.sustainability) {
      filtered = filtered.filter((designer) => designer.is_sustainable === true)
    }

    setFilteredDesigners(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
                {heroContent?.title || "Discover Exceptional Designers"}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {heroContent?.description || "Explore our curated collection of innovative fashion designers from around the world. Each profile showcases unique perspectives, sustainable practices, and cultural authenticity."}
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-16">
                  <DesignerFilters
                    onFiltersChange={handleFiltersChange}
                    designerCountries={designerCountries}
                    productionCountries={productionCountries}
                  />
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold mb-1">
                      {filteredDesigners.length} Designer{filteredDesigners.length !== 1 ? "s" : ""}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Showing {filteredDesigners.length} of {designers.length} total designers
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

                {/* Designer Grid */}
                {filteredDesigners.length > 0 ? (
                  <div
                    className={
                      viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"
                    }
                  >
                    {filteredDesigners.map((designer) => (
                      <DesignerCard key={designer.id} designer={designer} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-serif text-xl font-semibold mb-2">No designers found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
