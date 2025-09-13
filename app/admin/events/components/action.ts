"use server"

import { requireAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { getEventSlug } from "@/lib/events"
import type { Event } from "@/lib/types"

export async function createEvent(data: any) {
  await requireAdmin()

  const formatDate = (dateString: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${dateString}`)
      }
      return date.toISOString()
    } catch (error) {
      console.error("Date formatting error:", error)
      throw new Error(`Invalid date format: ${dateString}`)
    }
  }

  const slug = getEventSlug(data.title)

  const eventData: Partial<Event> = {
    title: data.title,
    slug,
    description: data.description,
    short_description: data.short_description || undefined,
    event_date: formatDate(data.event_date),
    end_date: data.end_date ? formatDate(data.end_date) : undefined,
    location: data.location,
    venue_name: data.venue_name || undefined,
    address: data.address || undefined,
    ticket_url: data.ticket_url || undefined,
    price_info: data.price_info || undefined,
    featured_image_url: data.featured_image_url || undefined,
    organizer_name: data.organizer_name || undefined,
    organizer_contact: data.organizer_contact || undefined,
    capacity: data.capacity || undefined,
    tags: data.tags || undefined,
    featured: data.featured || false,
    published: data.published || false,
  }

  const supabase = await createClient()

  const { error } = await supabase.from("events").insert([eventData])

  if (error) {
    console.error("Error creating event:", error)
    throw new Error("Failed to create event")
  }

  revalidatePath("/admin/events")
}

export async function updateEvent(id: string, data: any) {
  await requireAdmin()

  const formatDate = (dateString: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${dateString}`)
      }
      return date.toISOString()
    } catch (error) {
      console.error("Date formatting error:", error)
      throw new Error(`Invalid date format: ${dateString}`)
    }
  }

  const slug = getEventSlug(data.title)

  const eventData: Partial<Event> = {
    title: data.title,
    slug,
    description: data.description,
    short_description: data.short_description || undefined,
    event_date: formatDate(data.event_date),
    end_date: data.end_date ? formatDate(data.end_date) : undefined,
    location: data.location,
    venue_name: data.venue_name || undefined,
    address: data.address || undefined,
    ticket_url: data.ticket_url || undefined,
    price_info: data.price_info || undefined,
    featured_image_url: data.featured_image_url || undefined,
    organizer_name: data.organizer_name || undefined,
    organizer_contact: data.organizer_contact || undefined,
    capacity: data.capacity || undefined,
    tags: data.tags || undefined,
    featured: data.featured || false,
    published: data.published || false,
    updated_at: new Date().toISOString(),
  }

  const supabase = await createClient()

  const { error } = await supabase.from("events").update(eventData).eq("id", id)

  if (error) {
    console.error("Error updating event:", error)
    throw new Error("Failed to update event")
  }

  revalidatePath("/admin/events")
}

export async function deleteEvent(eventId: string) {
  await requireAdmin()

  const supabase = await createClient()

  const { error } = await supabase.from("events").delete().eq("id", eventId)

  if (error) {
    console.error("Error deleting event:", error)
    throw new Error("Failed to delete event")
  }

  revalidatePath("/admin/events")
}
