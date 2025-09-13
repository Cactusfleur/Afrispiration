import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import NewEventForm from "@/components/new-event-form"

export default async function NewEventPage() {
  await requireAdmin()

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
    },
    {
      name: "end_date",
      label: "End Date & Time (Optional)",
      type: "datetime" as const,
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Create New Event</h1>
          <p className="text-muted-foreground">Add a new fashion event or gathering</p>
        </div>

        <NewEventForm fields={fields} />
      </div>
    </AdminLayout>
  )
}
