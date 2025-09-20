"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { DynamicPageContentForm } from "@/components/dynamic-page-content-form"
import { createPageContent } from "../components/action"

export default function NewPageContentPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (data: any) => {
    startTransition(async () => {
      try {
        await createPageContent({
          page_key: data.page_key,
          content: data.content,
        })

        router.push("/admin/pages-content")
      } catch (error) {
        console.error("Failed to create page content:", error)
        alert("Failed to create page content")
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Page Content</h1>
        <p className="text-muted-foreground">Create content for a new page or section with user-friendly forms</p>
      </div>

      <DynamicPageContentForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  )
}
