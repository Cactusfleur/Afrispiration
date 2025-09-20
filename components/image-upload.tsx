"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Upload, Loader2 } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface ImageUploadProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  label?: string
  required?: boolean
  bucket?: string
}

export function ImageUpload({
  value,
  onChange,
  multiple = false,
  label = "Images",
  required = false,
  bucket = "afrispiration",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const currentImages = multiple ? (Array.isArray(value) ? value : value ? [value] : []) : value ? [value] : []

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${bucket}/${fileName}`

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return publicUrl
  }

  const handleFileSelect = async (files: FileList) => {
    if (!files.length) return

    setIsUploading(true)
    try {
      const uploadPromises = Array.from(files).map(uploadFile)
      const uploadedUrls = await Promise.all(uploadPromises)

      if (multiple) {
        const newImages = [...currentImages, ...uploadedUrls]
        onChange(newImages)
      } else {
        onChange(uploadedUrls[0])
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload images. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeImage = async (imageUrl: string) => {
    try {
      // Extract file path from URL for deletion
      const urlParts = imageUrl.split("/")
      const fileName = urlParts[urlParts.length - 1]
      const filePath = `${bucket}/${fileName}`

      await supabase.storage.from(bucket).remove([filePath])

      if (multiple) {
        const newImages = currentImages.filter((img) => img !== imageUrl)
        onChange(newImages)
      } else {
        onChange("")
      }
    } catch (error) {
      console.error("Delete error:", error)
      // Still remove from UI even if deletion fails
      if (multiple) {
        const newImages = currentImages.filter((img) => img !== imageUrl)
        onChange(newImages)
      } else {
        onChange("")
      }
    }
  }

  return (
    <div className="space-y-4">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}

          <div className="text-sm text-muted-foreground">
            {isUploading ? (
              "Uploading images..."
            ) : (
              <>
                <span className="font-medium">Click to upload</span> or drag and drop
                <br />
                PNG, JPG, GIF up to 10MB
                {multiple && " (multiple files allowed)"}
              </>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      {/* Image Previews */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(imageUrl)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Image Count */}
      {multiple && currentImages.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {currentImages.length} image{currentImages.length !== 1 ? "s" : ""} uploaded
        </div>
      )}
    </div>
  )
}
