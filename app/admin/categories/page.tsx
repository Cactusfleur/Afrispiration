"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Category {
  id: string
  name: string
  subcategories: string[]
  created_at: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: "", subcategories: "" })
  const [editData, setEditData] = useState({ name: "", subcategories: "" })
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name")

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      setMessage({ type: "error", text: "Failed to load categories" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return

    try {
      const subcategoriesArray = newCategory.subcategories
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      const { error } = await supabase.from("categories").insert([
        {
          name: newCategory.name.trim(),
          subcategories: subcategoriesArray,
        },
      ])

      if (error) throw error

      setNewCategory({ name: "", subcategories: "" })
      setMessage({ type: "success", text: "Category added successfully" })
      fetchCategories()
    } catch (error) {
      console.error("Error adding category:", error)
      setMessage({ type: "error", text: "Failed to add category" })
    }
  }

  const handleEditCategory = async (id: string) => {
    if (!editData.name.trim()) return

    try {
      const subcategoriesArray = editData.subcategories
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      const { error } = await supabase
        .from("categories")
        .update({
          name: editData.name.trim(),
          subcategories: subcategoriesArray,
        })
        .eq("id", id)

      if (error) throw error

      setEditingCategory(null)
      setMessage({ type: "success", text: "Category updated successfully" })
      fetchCategories()
    } catch (error) {
      console.error("Error updating category:", error)
      setMessage({ type: "error", text: "Failed to update category" })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const { error } = await supabase.from("categories").delete().eq("id", id)

      if (error) throw error

      setMessage({ type: "success", text: "Category deleted successfully" })
      fetchCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
      setMessage({ type: "error", text: "Failed to delete category" })
    }
  }

  const startEdit = (category: Category) => {
    setEditingCategory(category.id)
    setEditData({
      name: category.name,
      subcategories: category.subcategories.join(", "),
    })
  }

  const cancelEdit = () => {
    setEditingCategory(null)
    setEditData({ name: "", subcategories: "" })
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading categories...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold">Categories Management</h1>
        </div>

        {message && (
          <Alert className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Add New Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g., Women, Men, Accessories"
                />
              </div>
              <div>
                <Label htmlFor="subcategories">Subcategories (comma-separated)</Label>
                <Input
                  id="subcategories"
                  value={newCategory.subcategories}
                  onChange={(e) => setNewCategory({ ...newCategory, subcategories: e.target.value })}
                  placeholder="e.g., Dresses, Tops, Bottoms"
                />
              </div>
            </div>
            <Button onClick={handleAddCategory} className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No categories found. Add your first category above.
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    {editingCategory === category.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Category Name</Label>
                            <Input
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Subcategories (comma-separated)</Label>
                            <Input
                              value={editData.subcategories}
                              onChange={(e) => setEditData({ ...editData, subcategories: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditCategory(category.id)}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {category.subcategories.map((sub, index) => (
                              <Badge key={index} variant="secondary">
                                {sub}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
