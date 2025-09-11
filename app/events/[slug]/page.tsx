import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/lib/types"
import { Calendar, MapPin, Clock, ExternalLink, ArrowLeft, User, Users } from "lucide-react"
import { formatEventDate, formatEventTime } from "@/lib/events"
import Link from "next/link"

interface EventPageProps {
  params: Promise<{ slug: string }>
}

async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("events").select("*").eq("published", true).eq("slug", slug).single()

  if (error) {
    console.error("Error fetching event:", error)
    return null
  }

  return data
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const eventDate = formatEventDate(event.event_date)
  const eventTime = formatEventTime(event.event_date)
  const endTime = event.end_date ? formatEventTime(event.end_date) : null

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Back Button */}
        <section className="py-6 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </div>
        </section>

        {/* Event Header */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Event Image */}
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                {event.featured_image_url ? (
                  <img
                    src={event.featured_image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div className="space-y-6">
                <div>
                  {event.featured && <Badge className="mb-3 bg-primary text-primary-foreground">Featured Event</Badge>}
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{event.title}</h1>

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium text-sm text-muted-foreground">Date</h4>
                      </div>
                      <p className="font-semibold">{eventDate}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium text-sm text-muted-foreground">Time</h4>
                      </div>
                      <p className="font-semibold">
                        {eventTime}
                        {endTime && ` - ${endTime}`}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="sm:col-span-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
                      </div>
                      <p className="font-semibold">{event.location}</p>
                      {event.venue_name && <p className="text-sm text-muted-foreground mt-1">{event.venue_name}</p>}
                      {event.address && <p className="text-sm text-muted-foreground">{event.address}</p>}
                    </CardContent>
                  </Card>

                  {event.organizer_name && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium text-sm text-muted-foreground">Organizer</h4>
                        </div>
                        <p className="font-semibold">{event.organizer_name}</p>
                      </CardContent>
                    </Card>
                  )}

                  {event.capacity && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium text-sm text-muted-foreground">Capacity</h4>
                        </div>
                        <p className="font-semibold">{event.capacity} attendees</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Price and Ticket */}
                <div className="space-y-4">
                  {event.price_info && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Pricing</h4>
                      <p className="text-lg font-semibold">{event.price_info}</p>
                    </div>
                  )}

                  {event.ticket_url && (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Get Tickets
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Description */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold mb-6">About This Event</h2>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-foreground">{event.description}</div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        {event.organizer_contact && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="font-serif text-xl font-semibold mb-4">Contact Information</h3>
              <p className="text-muted-foreground">
                For questions about this event, please contact: {event.organizer_contact}
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
