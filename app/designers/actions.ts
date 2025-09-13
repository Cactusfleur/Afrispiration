"use server"

import { createClient } from "@/lib/supabase/server"

export async function deleteDesigner(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("designers").delete().eq("id", id)

  if (error) {
    console.error("Error deleting designer:", error)
    throw new Error("Failed to delete designer")
  }

  return true
}
