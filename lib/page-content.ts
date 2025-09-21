import { createClient } from "@/lib/supabase/server"

export async function getPageContent(pageKey: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("page_content").select("content").eq("page_key", pageKey).single()

  if (error) {
    console.error(`Error fetching content for page ${pageKey}:`, error)
    return null
  }

  return data?.content || null
}

// Helper function to get content with fallback
export async function getPageContentWithFallback(pageKey: string, fallback: any = {}) {
  const content = await getPageContent(pageKey)
  console.log(content)
  return content || fallback
}

// Helper to get nested content safely
export function getNestedContent(content: any, path: string, fallback: any = null) {
  if (!content) return fallback

  const keys = path.split(".")
  let current = content

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key]
    } else {
      return fallback
    }
  }

  return current
}
