import { createClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/types"

export async function getBlogPosts(options?: {
  featured?: boolean
  tag?: string
  limit?: number
}): Promise<BlogPost[]> {
  const supabase = await createClient()

  let query = supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false })

  if (options?.featured) {
    query = query.eq("featured", true)
  }

  if (options?.tag) {
    query = query.contains("tags", [options.tag])
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("published", true).eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  return getBlogPosts({ featured: true, limit })
}

export function getBlogPostSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}
