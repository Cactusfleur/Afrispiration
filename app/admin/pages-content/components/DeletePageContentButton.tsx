"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deletePageContent } from "./action"
import { useRouter } from "next/navigation"

interface DeletePageContentButtonProps {
  id: string
  pageKey: string
}

export function DeletePageContentButton({ id, pageKey }: DeletePageContentButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    startTransition(async () => {
      try {
        await deletePageContent(id)
        router.refresh()
      } catch (error) {
        console.error("Failed to delete page content:", error)
        alert("Failed to delete page content")
      }
      setShowConfirm(false)
    })
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Deleting..." : "Confirm"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleCancel} disabled={isPending}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      className="text-destructive hover:text-destructive bg-transparent"
    >
      <Trash2 className="h-3 w-3 mr-1" />
      Delete
    </Button>
  )
}
