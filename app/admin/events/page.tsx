import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/lib/types"
import { Plus, Edit, Eye, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { formatEventDate } from "@/lib/events"
import { DeleteEventButton } from "./components/DeleteEventButton"

async function getEvents(): Promise<Event[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data || []
}

export default async function AdminEventsPage() {
  await requireAdmin()
  const events = await getEvents()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground">Manage fashion events and gatherings</p>
          </div>
          <Button asChild>
            <Link href="/admin/events/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Link>
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-lg font-semibold">{event.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant={event.published ? "default" : "secondary"}>
                          {event.published ? "Published" : "Draft"}
                        </Badge>
                        {event.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatEventDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.short_description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.short_description}</p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {event.organizer_name && <span>Organized by {event.organizer_name}</span>}
                      {event.price_info && <span>{event.price_info}</span>}
                      {event.tags && (
                        <div className="flex gap-1">
                          {event.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/events/${event.slug}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="font-serif text-xl font-semibold mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">Start promoting fashion events and gatherings.</p>
              <Button asChild>
                <Link href="/admin/events/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Event
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
