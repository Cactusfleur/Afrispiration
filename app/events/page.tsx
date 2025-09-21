import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"
import EventsClient from "./EventsClient"

export default async function EventsPage() {
  // Fetch editable content for the page header
  const pageContent = await getPageContentWithFallback("events", {
    hero: {
      title: "Fashion Events",
      description:
        "Discover upcoming fashion shows, networking events, workshops, and industry gatherings. Connect with designers, buyers, and fashion enthusiasts from around the world.",
    },
  })

  const heroContent = getNestedContent(pageContent, "hero", {})

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-muted/30 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {heroContent.title || "Fashion Events"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {heroContent.description ||
              "Discover upcoming fashion shows, networking events, workshops, and industry gatherings. Connect with designers, buyers, and fashion enthusiasts from around the world."}
          </p>
        </div>
      </section>

      {/* Client component handles data + filters */}
      <EventsClient />

      <Footer />
    </div>
  )
}
