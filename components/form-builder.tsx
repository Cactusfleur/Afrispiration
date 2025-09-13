"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface FormBuilderProps {
  initialData?: any
  onSubmit: (data: any) => void
  fields: FormField[]
  submitLabel?: string
  isLoading?: boolean
}

interface FormField {
  name: string
  label: string
  type: "text" | "email" | "textarea" | "switch" | "tags" | "select" | "number" | "datetime"
  required?: boolean
  placeholder?: string
  options?: string[]
}

export function FormBuilder({ initialData = {}, onSubmit, fields, submitLabel = "Save", isLoading }: FormBuilderProps) {
  const [formData, setFormData] = useState(initialData)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateField = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const addTag = (fieldName: string) => {
    const tagValue = tagInputs[fieldName]?.trim()
    if (!tagValue) return

    const currentTags = formData[fieldName] || []
    if (!currentTags.includes(tagValue)) {
      updateField(fieldName, [...currentTags, tagValue])
    }
    setTagInputs((prev) => ({ ...prev, [fieldName]: "" }))
  }

  const removeTag = (fieldName: string, tagToRemove: string) => {
    const currentTags = formData[fieldName] || []
    updateField(
      fieldName,
      currentTags.filter((tag: string) => tag !== tagToRemove),
    )
  }

  const renderField = (field: FormField) => {
    const value = formData[field.name]

    switch (field.type) {
      case "text":
      case "email":
        return (
          <Input
            type={field.type}
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => updateField(field.name, Number.parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        )

      case "switch":
        return <Switch checked={value || false} onCheckedChange={(checked) => updateField(field.name, checked)} />

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            required={field.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case "tags":
        return (
          <div className="space-y-2">
            {/* Input + add button */}
            <div className="flex gap-2 items-center">
              <Input
                className="flex-1"
                value={tagInputs[field.name] || ""}
                onChange={(e) =>
                  setTagInputs((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
                placeholder={field.placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag(field.name)
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addTag(field.name)}
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-2">
              {(value || []).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1 break-all max-w-full"
                >
                  <span className="truncate max-w-[300px]">{tag}</span>
                  <button
                    type="button"
                    className="ml-1 text-muted-foreground hover:text-foreground shrink-0"
                    onClick={() => removeTag(field.name, tag)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

          </div>
        )

      case "datetime":
        return (
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => updateField(field.name, date?.toISOString() ?? null)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText={`Pick ${field.label}`}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            popperClassName="z-[9999]"   // ✅ ensures calendar popup stays on top
          />
        )


      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field)}
        </div>
      ))}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  )
}
