import { createClient } from "@/lib/supabase/server"
import type { Designer } from "@/lib/types"

export async function getDesigners(options?: {
  featured?: boolean
  specialty?: string
  location?: string
  limit?: number
}): Promise<Designer[]> {
  const supabase = await createClient()

  let query = supabase.from("designers").select("*").eq("status", "active").order("created_at", { ascending: false })

  if (options?.featured) {
    query = query.eq("featured", true)
  }

  if (options?.specialty) {
    query = query.contains("specialties", [options.specialty])
  }

  if (options?.location) {
    query = query.ilike("location", `%${options.location}%`)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching designers:", error)
    return []
  }

  return data || []
}

export async function getDesignerByName(name: string): Promise<Designer | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("designers")
    .select("*")
    .eq("status", "active")
    .ilike("name", name.replace("-", " "))
    .single()

  if (error) {
    console.error("Error fetching designer:", error)
    return null
  }

  return data
}

export async function getFeaturedDesigners(limit = 6): Promise<Designer[]> {
  return getDesigners({ featured: true, limit })
}

export function getDesignerSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}
