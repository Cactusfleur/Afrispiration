import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Event } from "@/lib/types"
import { EditEventForm } from "@/app/admin/events/components/EditEventForm"

async function getEvent(id: string): Promise<Event | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching event:", error)
    return null
  }

  return data
}

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  await requireAdmin()

  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  const fields = [
    {
      name: "title",
      label: "Event Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter event title",
    },
    {
      name: "short_description",
      label: "Short Description",
      type: "textarea" as const,
      placeholder: "Brief description for event cards",
    },
    {
      name: "description",
      label: "Full Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Detailed event description",
    },
    {
      name: "event_date",
      label: "Event Date & Time",
      type: "datetime" as const,
      required: true,
      placeholder: "YYYY-MM-DD HH:MM",
    },
    {
      name: "end_date",
      label: "End Date & Time (Optional)",
      type: "datetime" as const,
      placeholder: "YYYY-MM-DD HH:MM",
    },
    {
      name: "location",
      label: "Location",
      type: "text" as const,
      required: true,
      placeholder: "City, Country",
    },
    {
      name: "venue_name",
      label: "Venue Name",
      type: "text" as const,
      placeholder: "Name of the venue",
    },
    {
      name: "address",
      label: "Full Address",
      type: "textarea" as const,
      placeholder: "Complete venue address",
    },
    {
      name: "organizer_name",
      label: "Organizer Name",
      type: "text" as const,
      placeholder: "Event organizer or company",
    },
    {
      name: "organizer_contact",
      label: "Organizer Contact",
      type: "email" as const,
      placeholder: "Contact email for organizer",
    },
    {
      name: "capacity",
      label: "Event Capacity",
      type: "number" as const,
      placeholder: "Maximum number of attendees",
    },
    {
      name: "price_info",
      label: "Price Information",
      type: "text" as const,
      placeholder: "e.g., Free, $50, $25-$100",
    },
    {
      name: "ticket_url",
      label: "Ticket URL",
      type: "text" as const,
      placeholder: "Link to purchase tickets",
    },
    {
      name: "featured_image_url",
      label: "Featured Image URL",
      type: "text" as const,
      placeholder: "Main event image URL",
    },
    {
      name: "tags",
      label: "Tags",
      type: "tags" as const,
      placeholder: "Add a tag",
    },
    {
      name: "featured",
      label: "Featured Event",
      type: "switch" as const,
    },
    {
      name: "published",
      label: "Published",
      type: "switch" as const,
    },
  ]

  const initialData = {
    title: event.title,
    short_description: event.short_description || "",
    description: event.description,
    event_date: event.event_date,
    end_date: event.end_date || "",
    location: event.location,
    venue_name: event.venue_name || "",
    address: event.address || "",
    organizer_name: event.organizer_name || "",
    organizer_contact: event.organizer_contact || "",
    capacity: event.capacity || 0,
    price_info: event.price_info || "",
    ticket_url: event.ticket_url || "",
    featured_image_url: event.featured_image_url || "",
    tags: event.tags || [],
    featured: event.featured || false,
    published: event.published || false,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Edit Event</h1>
          <p className="text-muted-foreground">Update event information</p>
        </div>

        <EditEventForm fields={fields} initialData={initialData} eventId={event.id} />
      </div>
    </AdminLayout>
  )
}
