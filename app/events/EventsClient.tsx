"use client"

import { useState, useEffect, useMemo } from "react"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Search, X, Calendar } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically load the calendar widget to avoid SSR issues
const FullCalendarWidget = dynamic(() => import("./fullcalendar-widget"), { ssr: false })

export default function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [showUpcoming, setShowUpcoming] = useState(true)
  const [allTags, setAllTags] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, selectedTag, showUpcoming, selectedDate])

  const fetchEvents = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("event_date", { ascending: true })

    if (error) {
      console.error("Error fetching events:", error)
    } else {
      setEvents(data || [])
      const tags = new Set<string>()
      data?.forEach((event) => {
        event.tags?.forEach((tag: string) => tags.add(tag))
      })
      setAllTags(Array.from(tags).sort())
    }
    setLoading(false)
  }

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)

  const filterEvents = () => {
    let filtered = [...events]

    if (selectedDate) {
      const sod = startOfDay(selectedDate)
      const eod = endOfDay(selectedDate)
      filtered = filtered.filter((ev) => {
        const start = new Date(ev.event_date)
        const end = ev.end_date ? new Date(ev.end_date) : start
        return end >= sod && start <= eod
      })
    } else if (showUpcoming) {
      const now = new Date()
      filtered = filtered.filter((event) => new Date(event.event_date) >= now)
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(search) ||
          event.description.toLowerCase().includes(search) ||
          event.location.toLowerCase().includes(search) ||
          event.organizer_name?.toLowerCase().includes(search) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(search)),
      )
    }

    if (selectedTag) {
      filtered = filtered.filter((event) => event.tags?.includes(selectedTag))
    }

    setFilteredEvents(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTag("")
    setShowUpcoming(true)
    setSelectedDate(null)
  }

  const dayEvents = useMemo(() => {
    if (!selectedDate) return []
    const sod = startOfDay(selectedDate)
    const eod = endOfDay(selectedDate)
    return events.filter((ev) => {
      const start = new Date(ev.event_date)
      const end = ev.end_date ? new Date(ev.end_date) : start
      return end >= sod && start <= eod
    })
  }, [events, selectedDate])

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </main>
    )
  }

  return (
    <main className="flex-1">
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-semibold">Calendar</h2>
            {selectedDate && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedDate(null)}>
                <X className="h-4 w-4 mr-1" />
                Clear date
              </Button>
            )}
          </div>

          <FullCalendarWidget
            events={events}
            onDateSelect={(d) => {
              setSelectedDate(d)
              const el = document.getElementById("day-events-panel")
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
          />

          {selectedDate && (
            <div id="day-events-panel" className="mt-6 rounded-md border bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">
                  Events on{" "}
                  {selectedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </h3>
                <Badge variant="secondary">{dayEvents.length}</Badge>
              </div>
              {dayEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dayEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No events on this date.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={!selectedDate && showUpcoming ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedDate(null)
                  setShowUpcoming(true)
                }}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Upcoming
              </Button>
              <Button
                variant={!selectedDate && !showUpcoming ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedDate(null)
                  setShowUpcoming(false)
                }}
              >
                All Events
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant={selectedTag === "" ? "default" : "outline"} size="sm" onClick={() => setSelectedTag("")}>
                All Types
              </Button>
              {allTags.slice(0, 4).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>

            {(searchTerm || selectedTag || !showUpcoming || selectedDate) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-semibold mb-2">
              {filteredEvents.length} Event{filteredEvents.length !== 1 ? "s" : ""}
            </h2>
            {(searchTerm || selectedTag || !showUpcoming || selectedDate) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Filtered by:</span>
                {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
                {selectedTag && <Badge variant="secondary">{selectedTag}</Badge>}
                {!selectedDate && !showUpcoming && <Badge variant="secondary">All Time</Badge>}
                {selectedDate && (
                  <Badge variant="secondary">
                    {selectedDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  featured={index === 0 && !searchTerm && !selectedTag && !selectedDate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="font-serif text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or browse all events.</p>
              <Button onClick={clearFilters}>View All Events</Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
