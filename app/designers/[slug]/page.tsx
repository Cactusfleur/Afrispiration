import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Designer } from "@/lib/types"
import { DesignerPageClient } from "./designer-page-client"

interface DesignerPageProps {
  params: Promise<{ slug: string }>
}

async function getDesignerBySlug(slug: string): Promise<Designer | null> {
  const supabase = await createClient()

  // Convert slug back to name format for search
  const searchName = slug.replace(/-/g, " ")

  const { data, error } = await supabase
    .from("designers")
    .select("*")
    .eq("status", "active")
    .ilike("name", `%${searchName}%`)
    .single()

  if (error) {
    console.error("Error fetching designer:", error)
    return null
  }

  return data
}

async function getRelatedDesigners(currentDesignerId: string, category?: string, limit = 4): Promise<Designer[]> {
  const supabase = await createClient()

  let query = supabase.from("designers").select("*").eq("status", "active").neq("id", currentDesignerId).limit(limit)

  // Prioritize designers from the same category
  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching related designers:", error)
    return []
  }

  // If we don't have enough designers from the same category, fetch more from other categories
  if (data.length < limit && category) {
    const remainingLimit = limit - data.length
    const { data: additionalData } = await supabase
      .from("designers")
      .select("*")
      .eq("status", "active")
      .neq("id", currentDesignerId)
      .neq("category", category)
      .limit(remainingLimit)

    return [...data, ...(additionalData || [])]
  }

  return data || []
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params
  const designer = await getDesignerBySlug(slug)

  if (!designer) {
    notFound()
  }

  const relatedDesigners = await getRelatedDesigners(designer.id, designer.category, 4)

  return <DesignerPageClient designer={designer} relatedDesigners={relatedDesigners} />
}
