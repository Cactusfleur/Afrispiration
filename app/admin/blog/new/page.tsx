"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { FormBuilder } from "@/components/form-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const blogFields = [
  { name: "title", label: "Article Title", type: "text" as const, required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea" as const, placeholder: "Brief description of the article..." },
  {
    name: "content",
    label: "Content",
    type: "textarea" as const,
    required: true,
    placeholder: "Write your article content here...",
  },
  { name: "author_name", label: "Author Name", type: "text" as const, required: true },
  { name: "author_bio", label: "Author Bio", type: "textarea" as const, placeholder: "Brief author biography..." },
  { name: "author_image_url", label: "Author Image", type: "image" as const, bucket: "blog-authors" },
  { name: "featured_image_url", label: "Featured Image", type: "image" as const, bucket: "blog-featured" },
  {
    name: "tags",
    label: "Tags",
    type: "tags" as const,
    placeholder: "Add tag...",
  },
  { name: "featured", label: "Featured Article", type: "switch" as const },
  { name: "published", label: "Published", type: "switch" as const },
]

function slugify(text: string, suffix?: number) {
  const base = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")

  return suffix ? `${base}-${suffix}` : base
}

export default function NewBlogPostPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const baseSlug = slugify(data.title)
      let slug = baseSlug
      let suffix = 1

      // Check if slug already exists
      while (true) {
        const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", slug).maybeSingle()

        if (!existing) break // slug is unique
        slug = slugify(baseSlug, suffix++) // add -1, -2, etc.
      }

      const { error } = await supabase.from("blog_posts").insert([
        {
          ...data,
          slug,
          published_at: data.published ? new Date().toISOString() : null,
        },
      ])

      if (error) throw error

      router.push("/admin/blog")
    } catch (error) {
      console.error("Error creating blog post:", error)
      alert("Failed to create blog post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-sm sm:max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost" size="sm" className="w-fit">
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog Posts
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-serif text-xl sm:text-2xl">Create New Article</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <FormBuilder
              fields={blogFields}
              onSubmit={handleSubmit}
              submitLabel="Create Article"
              isLoading={isLoading}
              initialData={{ featured: false, published: false }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
