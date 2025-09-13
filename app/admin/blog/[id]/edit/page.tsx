"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { FormBuilder } from "@/components/form-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

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
  { name: "author_image_url", label: "Author Image URL", type: "text" as const, placeholder: "https://..." },
  { name: "featured_image_url", label: "Featured Image URL", type: "text" as const, placeholder: "https://..." },
  {
    name: "tags",
    label: "Tags",
    type: "tags" as const,
    placeholder: "Add tag...",
  },
  { name: "featured", label: "Featured Article", type: "switch" as const },
  { name: "published", label: "Published", type: "switch" as const },
]

export default function EditBlogPostPage() {
  const [blogPost, setBlogPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  useEffect(() => {
    const fetchBlogPost = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching blog post:", error)
        alert("Failed to load blog post.")
      } else {
        setBlogPost(data)
      }
    }
    fetchBlogPost()
  }, [id])

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const updateData = {
        ...data,
        updated_at: new Date().toISOString(),
      }

      // Set published_at if publishing for the first time
      if (data.published && !blogPost.published_at) {
        updateData.published_at = new Date().toISOString()
      }
      // Clear published_at if unpublishing
      else if (!data.published) {
        updateData.published_at = null
      }

      const { error } = await supabase.from("blog_posts").update(updateData).eq("id", id)

      if (error) throw error

      router.push("/admin/blog")
    } catch (error) {
      console.error("Error updating blog post:", error)
      alert("Failed to update blog post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!blogPost) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto text-center py-12">Loading...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog Posts
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Edit Article</CardTitle>
          </CardHeader>
          <CardContent>
            <FormBuilder
              fields={blogFields}
              onSubmit={handleSubmit}
              submitLabel="Update Article"
              isLoading={isLoading}
              initialData={blogPost}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
