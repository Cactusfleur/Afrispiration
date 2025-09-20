"use client"

import { useState, useEffect } from "react"
import { getPageContentClient } from "@/lib/content"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Search, X, Calendar } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [heroContent, setHeroContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [showUpcoming, setShowUpcoming] = useState(true)
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchEvents()
    fetchHeroContent()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, selectedTag, showUpcoming])

  const fetchHeroContent = async () => {
    const content = await getPageContentClient('events')
    setHeroContent(content?.hero || {
      title: "Fashion Events",
      description: "Discover upcoming fashion shows, networking events, workshops, and industry gatherings. Connect with designers, buyers, and fashion enthusiasts from around the world."
    })
  }

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

      // Extract all unique tags
      const tags = new Set<string>()
      data?.forEach((event) => {
        event.tags?.forEach((tag) => tags.add(tag))
      })
      setAllTags(Array.from(tags).sort())
    }

    setLoading(false)
  }

  const filterEvents = () => {
    let filtered = [...events]

    // Upcoming filter
    if (showUpcoming) {
      const now = new Date()
      filtered = filtered.filter((event) => new Date(event.event_date) >= now)
    }

    // Search filter
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

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((event) => event.tags?.includes(selectedTag))
    }

    setFilteredEvents(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTag("")
    setShowUpcoming(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
                {heroContent?.title || "Fashion Events"}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {heroContent?.description || "Discover upcoming fashion shows, networking events, workshops, and industry gatherings. Connect with designers, buyers, and fashion enthusiasts from around the world."}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Time Filter */}
              <div className="flex gap-2">
                <Button variant={showUpcoming ? "default" : "outline"} size="sm" onClick={() => setShowUpcoming(true)}>
                  <Calendar className="h-4 w-4 mr-1" />
                  Upcoming
                </Button>
                <Button
                  variant={!showUpcoming ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowUpcoming(false)}
                >
                  All Events
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag("")}
                >
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

              {/* Clear Filters */}
              {(searchTerm || selectedTag || !showUpcoming) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-semibold mb-2">
                {filteredEvents.length} Event{filteredEvents.length !== 1 ? "s" : ""}
              </h2>
              {(searchTerm || selectedTag || !showUpcoming) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Filtered by:</span>
                  {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
                  {selectedTag && <Badge variant="secondary">{selectedTag}</Badge>}
                  {!showUpcoming && <Badge variant="secondary">All Time</Badge>}
                </div>
              )}
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} featured={index === 0 && !searchTerm && !selectedTag} />
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

      <Footer />
    </div>
  )
}
