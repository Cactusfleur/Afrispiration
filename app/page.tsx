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
    .gte("event_date", new Date().toISOString())
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

export default async function HomePage() {
  const [featuredDesigners, upcomingEvents, stats] = await Promise.all([
    getFeaturedDesigners(),
    getUpcomingEvents(),
    getStats(),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
                Discover Exceptional
                <span className="block text-muted-foreground">Fashion Talent</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
                A curated platform showcasing emerging and established African fashion designers from around the world. Explore
                sustainable, innovative, and culturally rich design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/designers">
                    Explore Designers
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
                <h3 className="font-serif text-3xl font-bold mb-2">{stats.designerCount}+</h3>
                <p className="text-muted-foreground">Curated Designers</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{stats.eventCount}+</h3>
                <p className="text-muted-foreground">Fashion Events</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{stats.countryCount}+</h3>
                <p className="text-muted-foreground">African Countries + Diaspora</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Designers Preview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Designers</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Meet the innovative minds shaping the future of fashion with sustainable practices and cultural
                authenticity.
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
                  View All Designers
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
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                  Join us at the latest fashion events, workshops, and showcases happening around the world.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-lg transition-shadow">
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
                        <h3 className="font-serif text-xl font-semibold mb-3 text-balance">{event.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{event.location}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {event.short_description || event.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/events">
                    View All Events
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
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Latest from the Journal</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Insights, trends, and stories from the world of sustainable and innovative fashion design.
              </p>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Read More Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
