"use client"

import { useState } from "react"
import { FormBuilder } from "@/components/form-builder"
import { useRouter } from "next/navigation"
import { updateEvent } from "./action"

interface EditEventFormProps {
  fields: any[]
  initialData: any
  eventId: string
}

export function EditEventForm({ fields, initialData, eventId }: EditEventFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await updateEvent(eventId, data)
      router.push("/admin/events")
    } catch (error) {
      console.error("Error updating event:", error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormBuilder
      fields={fields}
      initialData={initialData}
      onSubmit={handleSubmit}
      submitLabel="Update Event"
      isLoading={isLoading}
    />
  )
}
