"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Category {
  id: string
  name: string
  subcategories: string[]
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("categories").select("*").order("name")

      if (error) throw error

      setCategories(data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryOptions = () => {
    return categories.map((cat) => cat.name)
  }

  const getSubcategoryOptions = () => {
    const allSubcategories = categories.flatMap((cat) => cat.subcategories)
    return [...new Set(allSubcategories)] // Remove duplicates
  }

  const getSubcategoriesForCategory = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category?.subcategories || []
  }

  return {
    categories,
    isLoading,
    error,
    getCategoryOptions,
    getSubcategoryOptions,
    getSubcategoriesForCategory,
    refetch: fetchCategories,
  }
}
