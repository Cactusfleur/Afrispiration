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
    query = query.contains("location", [options.location])
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



export async function getDesignerBySlug(slug: string): Promise<Designer | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("designers")
      .select("*")
      .eq("status", "active")
      .ilike("slug", `%${slug}%`)
      .single()

    if (error) {
      console.error("Error fetching designer:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getDesignerBySlug:", error)
    return null
  }
}

export async function getRelatedDesigners(currentDesignerId: string, categories?: string[], limit = 4): Promise<Designer[]> {
  try {
    const supabase = await createClient()

    let query = supabase.from("designers").select("*").eq("status", "active").neq("id", currentDesignerId).limit(limit)

    if (categories && categories.length > 0) {
      query = query.overlaps("category", categories)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching related designers:", error)
      return []
    }

    // If we don't have enough designers with overlapping categories, fetch more from other categories
    if (data && data.length < limit && categories && categories.length > 0) {
      const remainingLimit = limit - data.length
      const { data: additionalData } = await supabase
        .from("designers")
        .select("*")
        .eq("status", "active")
        .neq("id", currentDesignerId)
        .not("category", "overlaps", categories)
        .limit(remainingLimit)

      return [...data, ...(additionalData || [])]
    }

    return data || []
  } catch (error) {
    console.error("Error in getRelatedDesigners:", error)
    return []
  }
}