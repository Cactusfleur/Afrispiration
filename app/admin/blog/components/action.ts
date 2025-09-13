"use server"

import { createClient } from "@/lib/supabase/server"

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw new Error("Failed to delete blog post")
  }

  return true
}
