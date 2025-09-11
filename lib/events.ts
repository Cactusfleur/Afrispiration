import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/lib/types"

export async function getEvents(options?: {
  featured?: boolean
  upcoming?: boolean
  tag?: string
  limit?: number
}): Promise<Event[]> {
  const supabase = await createClient()

  let query = supabase.from("events").select("*").eq("published", true).order("event_date", { ascending: true })

  if (options?.featured) {
    query = query.eq("featured", true)
  }

  if (options?.upcoming) {
    query = query.gte("event_date", new Date().toISOString())
  }

  if (options?.tag) {
    query = query.contains("tags", [options.tag])
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data || []
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("events").select("*").eq("published", true).eq("slug", slug).single()

  if (error) {
    console.error("Error fetching event:", error)
    return null
  }

  return data
}

export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  return getEvents({ upcoming: true, limit })
}

export function getEventSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatEventTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
