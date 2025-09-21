"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deletePageContent(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("page_content").delete().eq("id", id)

  if (error) {
    console.error("Error deleting page content:", error)
    throw new Error("Failed to delete page content")
  }

  revalidatePath("/admin/pages-content")
  return true
}

export async function createPageContent(data: {
  page_key: string
  content: any
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("page_content").insert({
    page_key: data.page_key,
    content: data.content,
  })

  if (error) {
    console.error("Error creating page content:", error)
    throw new Error("Failed to create page content")
  }

  revalidatePath("/admin/pages-content")
  return true
}

export async function updatePageContent(
  id: string,
  data: {
    page_key: string
    content: any
  },
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("page_content")
    .update({
      page_key: data.page_key,
      content: data.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating page content:", error)
    throw new Error("Failed to update page content")
  }

  revalidatePath("/admin/pages-content")
  return true
}
