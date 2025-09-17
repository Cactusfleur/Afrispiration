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


import { designerFields } from "../../components/designer-fields"

export default function EditDesignerPage() {
  const [designer, setDesigner] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  useEffect(() => {
    const fetchDesigner = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("designers")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching designer:", error)
        alert("Failed to load designer.")
      } else {
        setDesigner(data)
      }
    }
    fetchDesigner()
  }, [id])

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("designers")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      router.push("/admin/designers")
    } catch (error) {
      console.error("Error updating designer:", error)
      alert("Failed to update designer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!designer) {
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
            <Link href="/admin/designers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Designers
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Edit Designer</CardTitle>
          </CardHeader>
          <CardContent>
            <FormBuilder
              fields={designerFields}
              onSubmit={handleSubmit}
              submitLabel="Update Designer"
              isLoading={isLoading}
              initialData={designer}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
