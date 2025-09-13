"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteDesigner } from "./action"

export function DeleteDesignerButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this designer?")) return
    startTransition(async () => {
      try {
        await deleteDesigner(id)
        window.location.reload() // refresh list after delete
      } catch (err) {
        alert("Failed to delete designer")
      }
    })
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className="text-red-600 hover:text-red-700 bg-transparent"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-3 w-3" />
      {isPending && "Deleting..."}
    </Button>
  )
}
