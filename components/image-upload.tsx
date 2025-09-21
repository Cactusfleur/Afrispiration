"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Upload, Loader2, GripVertical, ChevronUp, ChevronDown } from "lucide-react"
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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchDraggedIndex, setTouchDraggedIndex] = useState<number | null>(null)
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

  const handleImageDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleImageDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleImageDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const newImages = [...currentImages]
    const draggedImage = newImages[draggedIndex]

    // Remove dragged item
    newImages.splice(draggedIndex, 1)

    // Insert at new position
    const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex
    newImages.splice(insertIndex, 0, draggedImage)

    onChange(newImages)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleImageDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    setTouchStartY(e.touches[0].clientY)
    setTouchDraggedIndex(index)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null || touchDraggedIndex === null) return

    const currentY = e.touches[0].clientY
    const deltaY = currentY - touchStartY

    // Only prevent default if we're actually dragging
    if (Math.abs(deltaY) > 10) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent, dropIndex: number) => {
    if (touchDraggedIndex === null || touchDraggedIndex === dropIndex) {
      setTouchDraggedIndex(null)
      setTouchStartY(null)
      return
    }

    const newImages = [...currentImages]
    const draggedImage = newImages[touchDraggedIndex]

    // Remove dragged item
    newImages.splice(touchDraggedIndex, 1)

    // Insert at new position
    const insertIndex = touchDraggedIndex < dropIndex ? dropIndex - 1 : dropIndex
    newImages.splice(insertIndex, 0, draggedImage)

    onChange(newImages)
    setTouchDraggedIndex(null)
    setTouchStartY(null)
  }

  const moveImageUp = (index: number) => {
    if (index === 0) return

    const newImages = [...currentImages]
    const temp = newImages[index]
    newImages[index] = newImages[index - 1]
    newImages[index - 1] = temp

    onChange(newImages)
  }

  const moveImageDown = (index: number) => {
    if (index === currentImages.length - 1) return

    const newImages = [...currentImages]
    const temp = newImages[index]
    newImages[index] = newImages[index + 1]
    newImages[index + 1] = temp

    onChange(newImages)
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
        <div className="space-y-3">
          {multiple && currentImages.length > 1 && (
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <strong>💡 Tip:</strong>
              <span className="hidden md:inline"> Drag and drop images to reorder them.</span>
              <span className="md:hidden"> Use the arrow buttons to reorder images.</span> The first image will be the
              main portfolio image.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentImages.map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                className={`relative group transition-all duration-200 ${
                  draggedIndex === index || touchDraggedIndex === index ? "opacity-50 scale-95" : ""
                } ${dragOverIndex === index ? "ring-2 ring-primary ring-offset-2" : ""}`}
                draggable={multiple && currentImages.length > 1}
                onDragStart={(e) => handleImageDragStart(e, index)}
                onDragOver={(e) => handleImageDragOver(e, index)}
                onDragLeave={handleImageDragLeave}
                onDrop={(e) => handleImageDrop(e, index)}
                onDragEnd={handleImageDragEnd}
                onTouchStart={(e) => handleTouchStart(e, index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {multiple && currentImages.length > 1 && (
                  <>
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1 cursor-move hidden md:flex">
                      <GripVertical className="h-3 w-3" />
                      {index + 1}
                    </div>

                    <div className="absolute top-2 left-2 flex flex-col gap-1 md:hidden">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-6 w-6 p-0 bg-black/70 hover:bg-black/90 text-white border-0"
                        onClick={() => moveImageUp(index)}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <div className="bg-black/70 text-white px-1.5 py-0.5 rounded text-xs text-center min-w-[20px]">
                        {index + 1}
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-6 w-6 p-0 bg-black/70 hover:bg-black/90 text-white border-0"
                        onClick={() => moveImageDown(index)}
                        disabled={index === currentImages.length - 1}
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}

                {multiple && index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Main
                  </div>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={() => removeImage(imageUrl)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Count */}
      {multiple && currentImages.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {currentImages.length} image{currentImages.length !== 1 ? "s" : ""} uploaded
          {currentImages.length > 1 && (
            <>
              <span className="hidden md:inline"> • Drag to reorder</span>
              <span className="md:hidden"> • Use arrows to reorder</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
