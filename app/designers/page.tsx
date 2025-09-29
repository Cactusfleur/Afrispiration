import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"
import DesignersClient from "./designers-client"
import { createClient } from "@/lib/supabase/server"

export default async function DesignersPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const supabase = await createClient()

  // ✅ Fetch editable content for hero/intro section
  const pageContent = await getPageContentWithFallback("designers", {
    hero: {
      title: "Discover Designers",
      description:
        "Explore a curated list of fashion designers from around the world. Filter by location, production country, and more.",
    },
  })

  const heroContent = getNestedContent(pageContent, "hero", {})

  // ✅ Fetch designers
  const { data: designers = [] } = await supabase
    .from("designers")
    .select("*")
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })

  // ✅ Extract unique filter options
  const safeDesigners = designers ?? []

  const designerCountries = Array.from(new Set(safeDesigners.flatMap((d) => d.location ?? []).filter(Boolean)))

  const productionCountries = Array.from(
    new Set(safeDesigners.flatMap((d) => d.production_location ?? []).filter(Boolean)),
  )

  const initialDesignerIso2 =
    (typeof searchParams?.designerIso2 === "string" && searchParams?.designerIso2) || undefined

  const initialProductionIso2 =
    (typeof searchParams?.productionIso2 === "string" && searchParams?.productionIso2) || undefined

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* ✅ Hero Section */}
      <section className="py-16 bg-muted/30 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {heroContent.title || "Discover Designers"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {heroContent.description ||
              "Explore a curated list of fashion designers from around the world. Filter by location, production country, and more."}
          </p>
        </div>
      </section>

      {/* ✅ Client component handles filters & UI */}
      <DesignersClient
        designers={designers ?? []}
        designerCountries={designerCountries}
        productionCountries={productionCountries}
        initialDesignerIso2={initialDesignerIso2}
        initialProductionIso2={initialProductionIso2}
      />

      <Footer />
    </div>
  )
}
