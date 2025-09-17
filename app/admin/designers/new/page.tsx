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

import { designerFields } from "../components/designer-fields"

function slugify(text: string, suffix?: number) {
  let base = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")

  return suffix ? `${base}-${suffix}` : base
}

export default function NewDesignerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      let baseSlug = slugify(data.name)
      let slug = baseSlug
      let suffix = 1

      // 🔍 check if slug already exists
      while (true) {
        const { data: existing } = await supabase
          .from("designers")
          .select("id")
          .eq("slug", slug)
          .maybeSingle()

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

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/designers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Designers
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Add New Designer</CardTitle>
          </CardHeader>
          <CardContent>
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
