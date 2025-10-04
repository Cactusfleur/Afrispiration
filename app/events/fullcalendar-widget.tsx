"use client"

import { useMemo } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventInput } from "@fullcalendar/core"
import type { Event as AppEvent } from "@/lib/types"

// FullCalendar styles (local copy)
import "./fullcalendar.css"

type Props = {
  events: AppEvent[]
  onDateSelect?: (date: Date) => void
}

export default function FullCalendarWidget({ events, onDateSelect }: Props) {
  // Map app events to FullCalendar events
  const fcEvents: EventInput[] = useMemo(
    () =>
      (events || []).map((e) => ({
        id: e.id,
        title: e.title,
        start: e.event_date,
        end: e.end_date || undefined,
        url: `/events/${e.slug}`,
        // Extra data for potential custom rendering
        extendedProps: {
          featured_image_url: e.featured_image_url,
          location: e.location,
          tags: e.tags,
        },
      })),
    [events],
  )

  return (
    <div className="rounded-lg border bg-background p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        height="auto"
        firstDay={0} // Sunday
        fixedWeekCount={false}
        showNonCurrentDates={false}
        events={fcEvents}
        dateClick={(arg) => {
          onDateSelect?.(arg.date)
        }}
        // Keep event rendering simple and readable
        eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: true }}
        dayMaxEventRows={3}
        eventDisplay="block"
        // Accessible title formatting, e.g., "September 2025"
        titleFormat={{ year: "numeric", month: "long" }}
      />
    </div>
  )
}
