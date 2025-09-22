"use client"

import React, { useState, useTransition, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DynamicPageContentForm } from "@/components/dynamic-page-content-form"
import { updatePageContent } from "../../components/action"
import { createClient } from "@/lib/supabase/client"
import AdminLayout from "@/components/admin-layout"
import Button from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EditPageContentPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pageContent, setPageContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPageContent = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("page_content").select("*").eq("id", id).single()

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
  }, [id, router])

  const handleSubmit = (data: any) => {
    startTransition(async () => {
      try {
        await updatePageContent(id, {
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

  if (loading) return <div>Loading...</div>
  if (!pageContent) return <div>Page content not found</div>

  return (
    <AdminLayout>
      <div className="max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Page Content</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Update content for {pageContent.page_key} with user-friendly forms
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
            <Link href="/admin/pages-content">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pages
            </Link>
          </Button>
        </div>

        <DynamicPageContentForm initialData={pageContent} onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </AdminLayout>
  )
}