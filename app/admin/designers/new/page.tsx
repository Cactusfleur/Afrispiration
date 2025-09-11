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

const designerFields = [
  { name: "name", label: "Designer Name", type: "text" as const, required: true },
  { name: "bio", label: "Biography", type: "textarea" as const, placeholder: "Tell us about the designer..." },
  { name: "location", label: "Location", type: "text" as const, placeholder: "City, Country" },
  { name: "website_url", label: "Website URL", type: "text" as const, placeholder: "https://..." },
  { name: "instagram_url", label: "Instagram URL", type: "text" as const, placeholder: "https://instagram.com/..." },
  { name: "email", label: "Email", type: "email" as const },
  { name: "phone", label: "Phone", type: "text" as const },
  { name: "image_url", label: "Profile Image URL", type: "text" as const, placeholder: "https://..." },
  {
    name: "specialties",
    label: "Specialties",
    type: "tags" as const,
    placeholder: "Add specialty and press Enter",
  },
  { name: "years_experience", label: "Years of Experience", type: "number" as const },
  {
    name: "price_range",
    label: "Price Range",
    type: "select" as const,
    options: ["$", "$$", "$$$", "$$$$"],
  },
  { name: "sustainability_rating", label: "Sustainability Rating (1-5)", type: "number" as const },
  { name: "featured", label: "Featured Designer", type: "switch" as const },
  {
    name: "status",
    label: "Status",
    type: "select" as const,
    options: ["active", "inactive", "pending"],
    required: true,
  },
]

export default function NewDesignerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("designers").insert([
        {
          ...data,
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
              initialData={{ status: "active", featured: false }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
