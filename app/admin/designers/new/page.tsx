"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { FormBuilder } from "@/components/form-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { useDynamicDesignerFields } from "../components/dynamic-designer-fields"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// ✅ Direct supabase client (using anon key from .env)
const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// ✅ Debugging helper: list all buckets
async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets()
  if (error) {
    console.error("❌ Error listing buckets:", error)
  } else {
    console.log("✅ Buckets:", data)
  }
}
async function listAfrispirationFiles() {
  const { data, error } = await supabase.storage
    .from("afrispiration") // ✅ use your bucket name
    .list("", { limit: 100 }) // "" means root folder

  if (error) {
    console.error("❌ Error listing files:", error)
  } else {
    console.log("✅ Files in afrispiration bucket:", data)
  }
}

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

export default function NewDesignerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { designerFields, isLoading: fieldsLoading } = useDynamicDesignerFields()

  useEffect(() => {
    listAfrispirationFiles()
  }, [])

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const baseSlug = slugify(data.name)
      let slug = baseSlug
      let suffix = 1

      // 🔍 check if slug already exists
      while (true) {
        const { data: existing } = await supabase.from("designers").select("id").eq("slug", slug).maybeSingle()

        if (!existing) break // slug is unique ✅
        slug = slugify(baseSlug, suffix++) // add -1, -2, etc.
      }

      const { error } = await supabase.from("designers").insert([
        {
          ...data,
          slug,
          status: data.status || "active",
        },
      ])

      if (error) throw error

      router.push("/admin/designers")
    } catch (error) {
      console.error("Error creating designer:", error)
      alert("Failed to create designer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (fieldsLoading) {
    return (
      <AdminLayout>
        <div className="max-w-sm sm:max-w-2xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Button asChild variant="ghost" size="sm" className="w-fit">
              <Link href="/admin/designers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Designers
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-lg">Loading categories...</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Please wait while we fetch the latest categories
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-sm sm:max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost" size="sm" className="w-fit">
            <Link href="/admin/designers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Designers
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-serif text-xl sm:text-2xl">Add New Designer</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <FormBuilder
              fields={designerFields}
              onSubmit={handleSubmit}
              submitLabel="Create Designer"
              isLoading={isLoading}
              initialData={{ status: "active", is_featured: false }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
