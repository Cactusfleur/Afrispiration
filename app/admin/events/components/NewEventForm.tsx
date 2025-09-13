"use client"

import { useState } from "react"
import { FormBuilder } from "@/components/form-builder"
import { useRouter } from "next/navigation"
import { createEvent } from "./action"

interface NewEventFormProps {
  fields: any[]
}

export function NewEventForm({ fields }: NewEventFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await createEvent(data)
      router.push("/admin/events")
    } catch (error) {
      console.error("Error creating event:", error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Create Event" isLoading={isLoading} />
}
