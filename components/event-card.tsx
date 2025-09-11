import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/types"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import { formatEventDate, formatEventTime } from "@/lib/events"

interface EventCardProps {
  event: Event
  featured?: boolean
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const eventDate = formatEventDate(event.event_date)
  const eventTime = formatEventTime(event.event_date)

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? "lg:col-span-2" : ""}`}>
      <CardContent className="p-0">
        <Link href={`/events/${event.slug}`}>
          <div className={`${featured ? "aspect-[16/9]" : "aspect-[16/10]"} bg-muted relative overflow-hidden`}>
            {event.featured_image_url ? (
              <img
                src={event.featured_image_url || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            {event.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>
        </Link>

        <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <Link href={`/events/${event.slug}`}>
            <h3
              className={`font-serif font-semibold mb-3 group-hover:text-primary transition-colors text-balance ${
                featured ? "text-2xl lg:text-3xl" : "text-xl"
              }`}
            >
              {event.title}
            </h3>
          </Link>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{eventTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Description */}
          {event.short_description && (
            <p className={`text-muted-foreground leading-relaxed mb-4 ${featured ? "text-base" : "text-sm"}`}>
              {event.short_description}
            </p>
          )}

          {/* Price and Ticket Link */}
          <div className="flex items-center justify-between">
            {event.price_info && <span className="text-sm font-medium text-foreground">{event.price_info}</span>}
            {event.ticket_url && (
              <Button asChild size="sm" variant="outline">
                <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Tickets
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
