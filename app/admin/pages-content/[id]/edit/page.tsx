"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DynamicPageContentForm } from "@/components/dynamic-page-content-form"
import { updatePageContent } from "../../components/action"
import { createClient } from "@/lib/supabase/client"

interface EditPageContentPageProps {
  params: {
    id: string
  }
}

export default function EditPageContentPage({ params }: EditPageContentPageProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pageContent, setPageContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPageContent = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("page_content").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error fetching page content:", error)
        alert("Failed to load page content")
        router.push("/admin/pages-content")
        return
      }

      setPageContent(data)
      setLoading(false)
    }

    fetchPageContent()
  }, [params.id, router])

  const handleSubmit = (data: any) => {
    startTransition(async () => {
      try {
        await updatePageContent(params.id, {
          page_key: data.page_key,
          content: data.content,
        })

        router.push("/admin/pages-content")
      } catch (error) {
        console.error("Failed to update page content:", error)
        alert("Failed to update page content")
      }
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!pageContent) {
    return <div>Page content not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Page Content</h1>
        <p className="text-muted-foreground">Update content for {pageContent.page_key} with user-friendly forms</p>
      </div>

      <DynamicPageContentForm initialData={pageContent} onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  )
}
