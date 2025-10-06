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
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ImageUpload } from "@/components/image-upload"

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
  type:
    | "text"
    | "email"
    | "textarea"
    | "switch"
    | "tags"
    | "select"
    | "multi-select"
    | "number"
    | "datetime"
    | "image"
    | "image-multiple"
  required?: boolean
  placeholder?: string
  defaultValue?: string
  options?: readonly string[]
  maxSelections?: number
  bucket?: string // For image uploads
  onChange?: (value: any) => void
  disabled?: boolean
}

export function FormBuilder({ initialData = {}, onSubmit, fields, submitLabel = "Save", isLoading }: FormBuilderProps) {
  const [formData, setFormData] = useState(initialData)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = fields.filter((field) => field.required)
    const missingFields = requiredFields.filter((field) => {
      const value = formData[field.name]
      if (field.type === "multi-select") {
        return !value || !Array.isArray(value) || value.length === 0
      }
      return !value || (typeof value === "string" && value.trim() === "")
    })

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.map((f) => f.label).join(", ")}`)
      return
    }

    onSubmit(formData)
  }

  const updateField = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))

    const field = fields.find((f) => f.name === name)
    if (field?.onChange) {
      field.onChange(value)
    }

    if (name === "category") {
      setFormData((prev: any) => ({ ...prev, subcategory: [] }))
    }
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

  const toggleMultiSelectOption = (fieldName: string, option: string, maxSelections?: number) => {
    const currentValues = formData[fieldName] || []
    const isSelected = currentValues.includes(option)

    if (isSelected) {
      updateField(
        fieldName,
        currentValues.filter((val: string) => val !== option),
      )
    } else {
      if (!maxSelections || currentValues.length < maxSelections) {
        updateField(fieldName, [...currentValues, option])
      } else {
        alert(`You can only select up to ${maxSelections} options`)
      }
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.name] ?? field.defaultValue ?? ""

    switch (field.type) {
      case "image":
        return (
          <ImageUpload
            value={value || ""}
            onChange={(newValue) => updateField(field.name, newValue)}
            multiple={false}
            label={field.label}
            required={field.required}
            bucket={field.bucket}
          />
        )

      case "image-multiple":
        return (
          <ImageUpload
            value={value || []}
            onChange={(newValue) => updateField(field.name, newValue)}
            multiple={true}
            label={field.label}
            required={field.required}
            bucket={field.bucket}
          />
        )

      case "text":
      case "email":
        return (
          <Input
            type={field.type}
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
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
            disabled={field.disabled}
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
            disabled={field.disabled}
          />
        )

      case "switch":
        return (
          <Switch
            checked={value || false}
            onCheckedChange={(checked) => updateField(field.name, checked)}
            disabled={field.disabled}
          />
        )

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            required={field.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={field.disabled}
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
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Input
                className="flex-1 min-w-0"
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
                disabled={field.disabled}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addTag(field.name)}
                className="w-full sm:w-auto sm:shrink-0"
                disabled={field.disabled}
              >
                <Plus className="h-4 w-4 mr-1 sm:mr-0" />
                <span className="sm:hidden">Add Tag</span>
              </Button>
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {(value || []).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm max-w-full"
                >
                  <span className="truncate max-w-[200px] sm:max-w-[300px]">{tag}</span>
                  <button
                    type="button"
                    className="ml-1 text-muted-foreground hover:text-foreground shrink-0 touch-manipulation"
                    onClick={() => removeTag(field.name, tag)}
                    disabled={field.disabled}
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
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring touch-manipulation"
            popperClassName="z-[9999]"
            popperPlacement="bottom-start"
            showPopperArrow={false}
            disabled={field.disabled}
          />
        )

      case "multi-select":
        const selectedValues = value || []
        const isDisabled = field.disabled || false

        return (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              {field.maxSelections && `Select up to ${field.maxSelections} options`}
              {selectedValues.length > 0 && ` (${selectedValues.length}/${field.maxSelections || "∞"} selected)`}
            </div>

            {/* Selected values display */}
            {selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md">
                {selectedValues.map((selectedValue: string) => (
                  <Badge key={selectedValue} variant="secondary" className="flex items-center gap-1">
                    {selectedValue}
                    <button
                      type="button"
                      onClick={() => toggleMultiSelectOption(field.name, selectedValue, field.maxSelections)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      disabled={isDisabled}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Options dropdown */}
            <select
              onChange={(e) => {
                if (e.target.value && !isDisabled) {
                  toggleMultiSelectOption(field.name, e.target.value, field.maxSelections)
                  e.target.value = "" // Reset dropdown
                }
              }}
              disabled={isDisabled}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="">{field.placeholder || `Add ${field.label}`}</option>
              {field.options
                ?.filter((option) => !selectedValues.includes(option))
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {!field.type.startsWith("image") && (
            <Label htmlFor={field.name} className="text-sm sm:text-base">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}
          {renderField(field)}
        </div>
      ))}

      <Button type="submit" disabled={isLoading} className="w-full min-h-[44px] touch-manipulation">
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  )
}
