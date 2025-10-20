import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Designer, Event } from "@/lib/types"
import { DesignerCard } from "@/components/designer-card"
import { BlogCard } from "@/components/blog-card"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"
import { getFeaturedBlogPosts } from "@/lib/blog"
import { MapExplorer } from "@/components/map-explorer"
import { countryNameToIso2 } from "@/lib/country-codes"

async function getFeaturedDesigners(): Promise<Designer[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("designers")
    .select("*")
    .eq("is_featured", true)
    .eq("status", "active")
    .limit(3)

  if (error) {
    console.error("Error fetching featured designers:", error)
    return []
  }

  return data || []
}

async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .gte("end_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(2)

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return []
  }

  return data || []
}

async function getStats() {
  const supabase = await createClient()

  // Get total designer count
  const { count: designerCount } = await supabase
    .from("designers")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")

  // Get total event count
  const { count: eventCount } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("published", true)

  // Get unique countries from designer locations
  const { data: designers } = await supabase
    .from("designers")
    .select("location")
    .eq("status", "active")
    .not("location", "is", null)

  // Count unique countries from all designer locations
  const uniqueCountries = new Set<string>()
  designers?.forEach((designer) => {
    if (designer.location && Array.isArray(designer.location)) {
      designer.location.forEach((country: string) => {
        uniqueCountries.add(country)
      })
    }
  })

  return {
    designerCount: designerCount || 0,
    eventCount: eventCount || 0,
    countryCount: uniqueCountries.size,
  }
}

async function getDesignerCountsByCountryIso2(): Promise<Record<string, number>> {
  const supabase = await createClient()
  const { data: designers } = await supabase
    .from("designers")
    .select("location")
    .eq("status", "active")
    .not("location", "is", null)

  const counts: Record<string, number> = {}
  designers?.forEach((d: { location?: string[] | null }) => {
    ;(d.location ?? []).forEach((countryName) => {
      const iso2 = countryNameToIso2(countryName)
      if (!iso2) return
      counts[iso2] = (counts[iso2] || 0) + 1
    })
  })
  return counts
}

async function getProductionCountsByCountryIso2(): Promise<Record<string, number>> {
  const supabase = await createClient()
  const { data: designers } = await supabase
    .from("designers")
    .select("production_location")
    .eq("status", "active")
    .not("production_location", "is", null)

  const counts: Record<string, number> = {}
  designers?.forEach((d: { production_location?: string[] | null }) => {
    ;(d.production_location ?? []).forEach((countryName) => {
      const iso2 = countryNameToIso2(countryName)
      if (!iso2) return
      counts[iso2] = (counts[iso2] || 0) + 1
    })
  })
  return counts
}

export default async function HomePage() {
  const [featuredDesigners, upcomingEvents, stats, featuredBlogs, pageContent, countsByIso2, productionCountsByIso2] =
    await Promise.all([
      getFeaturedDesigners(),
      getUpcomingEvents(),
      getStats(),
      getFeaturedBlogPosts(3),
      getPageContentWithFallback("home", {
        hero: {
          title: "Discover Exceptional",
          subtitle: "African Fashion",
          description:
            "A curated platform showcasing emerging and established African fashion designers from around the world. Explore sustainable, innovative, and culturally rich design.",
          buttonText: "Explore Designers",
          buttonUrl: "/designers",
        },
        stats: {
          designers: "Curated Designers",
          events: "Fashion Events",
          countries: "African Countries + Diaspora",
        },
        featuredSection: {
          title: "Featured Designers",
          description:
            "Meet the innovative minds shaping the present and future of African fashion with sustainable practices and cultural authenticity.",
          buttonText: "View All Designers",
        },
        eventsSection: {
          title: "Upcoming Events",
          description: "Join us at the latest fashion events, workshops, and showcases happening around the world.",
          buttonText: "View All Events",
        },
        journalSection: {
          title: "Latest from the Journal",
          description: "Insights, trends, and stories from the world of sustainable and innovative fashion design.",
          buttonText: "Read More Articles",
        },
      }),
      getDesignerCountsByCountryIso2(),
      getProductionCountsByCountryIso2(), // new
    ])

  const heroContent = getNestedContent(pageContent, "hero", {})
  const statsContent = getNestedContent(pageContent, "stats", {})
  const featuredContent = getNestedContent(pageContent, "featuredSection", {})
  const eventsContent = getNestedContent(pageContent, "eventsSection", {})
  const journalContent = getNestedContent(pageContent, "journalSection", {})

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
                {heroContent.title || "Discover Exceptional"}
                <span className="block text-muted-foreground">{heroContent.subtitle || "African Fashion"}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
                {heroContent.description ||
                  "A curated platform showcasing emerging and established African fashion designers from around the world. Explore sustainable, innovative, and culturally rich design."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href={heroContent.buttonUrl || "/designers"}>
                    {heroContent.buttonText || "Explore Designers"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stats */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{stats.designerCount - 1}+</h3>
                <p className="text-muted-foreground">{statsContent.designers || "Curated Designers"}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{stats.eventCount - 1}+</h3>
                <p className="text-muted-foreground">{statsContent.events || "Fashion Events"}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{stats.countryCount - 1}+</h3>
                <p className="text-muted-foreground">{statsContent.countries || "African Countries + Diaspora"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Explore Designer & Production Locations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Toggle between where designers are from and where they produce. Click in Designer mode, or hover in
                Production mode, to view designers filtered by that country.
              </p>
            </div>
            <MapExplorer
              designerCountsByIso2={countsByIso2}
              productionCountsByIso2={productionCountsByIso2}
              className=""
            />
          </div>
        </section>

        {/* Featured Designers Preview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {featuredContent.title || "Featured Designers"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                {featuredContent.description ||
                  "Meet the innovative minds shaping the present and future of African fashion with sustainable practices and cultural authenticity."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredDesigners.map((designer) => (
                <DesignerCard key={designer.slug} designer={designer} />
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/designers">
                  {featuredContent.buttonText || "View All Designers"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  {eventsContent.title || "Upcoming Events"}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                  {eventsContent.description ||
                    "Join us at the latest fashion events, workshops, and showcases happening around the world."}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="aspect-[16/10] bg-muted rounded-t-lg">
                          <img
                            src={event.featured_image_url || "/placeholder.svg?height=300&width=500"}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <div className="p-6">
                          <Badge variant="secondary" className="mb-3">
                            {new Date(event.event_date).toLocaleDateString()}
                          </Badge>
                          <h3 className="font-serif text-xl font-semibold mb-3 text-balance group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">{event.location}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {event.short_description || event.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/events">
                    {eventsContent.buttonText || "View All Events"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Latest from Journal */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {journalContent.title || "Latest from the Journal"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                {journalContent.description ||
                  "Insights, trends, and stories from the world of sustainable and innovative fashion design."}
              </p>
            </div>

            {featuredBlogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {featuredBlogs.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/blog">
                      {journalContent.buttonText || "Read More Articles"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground mb-6">No blog posts available yet.</p>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog">
                    {journalContent.buttonText || "Visit Blog"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
