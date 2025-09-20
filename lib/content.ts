import { createClient } from "@/lib/supabase/server"
import { createClient as createClientClient } from "@/lib/supabase/client"

export interface PageContent {
  id: string
  page_key: string
  content: any
  created_at: string
  updated_at: string
}

// Server-side function to get page content
export async function getPageContent(pageKey: string): Promise<any> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("page_key", pageKey)
    .single()

  if (error) {
    console.error(`Error fetching content for ${pageKey}:`, error)
    return null
  }

  return data?.content || null
}

// Client-side function to get page content
export async function getPageContentClient(pageKey: string): Promise<any> {
  const supabase = createClientClient()

  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("page_key", pageKey)
    .single()

  if (error) {
    console.error(`Error fetching content for ${pageKey}:`, error)
    return null
  }

  return data?.content || null
}

// Client-side function to update page content
export async function updatePageContent(pageKey: string, content: any): Promise<boolean> {
  const supabase = createClientClient()

  const { error } = await supabase
    .from("page_content")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("page_key", pageKey)

  if (error) {
    console.error(`Error updating content for ${pageKey}:`, error)
    return false
  }

  return true
}

// Get all page content for admin
export async function getAllPageContent(): Promise<PageContent[]> {
  const supabase = createClientClient()

  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .order("page_key")

  if (error) {
    console.error("Error fetching all page content:", error)
    return []
  }

  return data || []
}