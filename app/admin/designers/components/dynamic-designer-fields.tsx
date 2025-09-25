"use client"

import { useState } from "react"
import { AFRICAN_COUNTRIES, WORLD_COUNTRIES } from "@/lib/countries"
import { useCategories } from "@/hooks/use-categories"

export function useDynamicDesignerFields() {
  const { getCategoryOptions, getSubcategoriesForCategory, isLoading } = useCategories()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const getFilteredSubcategoryOptions = () => {
    if (selectedCategories.length === 0) {
      return [] // No subcategories if no categories selected
    }

    const allSubcategories = selectedCategories.flatMap((category) => getSubcategoriesForCategory(category))
    return [...new Set(allSubcategories)] // Remove duplicates
  }

  const designerFields = [
    { name: "name", label: "Designer Name", type: "text" as const, required: true },
    { name: "bio", label: "Biography", type: "textarea" as const, placeholder: "Tell us about the designer..." },
    { name: "brand", label: "Brand", type: "textarea" as const, placeholder: "Designer Brand" },
    {
      name: "location",
      label: "Designer Nationality (up to 2)",
      type: "multi-select" as const,
      options: AFRICAN_COUNTRIES,
      maxSelections: 2,
      required: true,
      placeholder: "Select African nationality/nationalities",
    },
    {
      name: "production_location",
      label: "Production Location (up to 2)",
      type: "multi-select" as const,
      options: WORLD_COUNTRIES,
      maxSelections: 2,
      required: true,
      placeholder: "Select production location(s)",
    },
    {
      name: "category",
      label: "Categories",
      type: "multi-select" as const,
      options: getCategoryOptions(),
      placeholder: "Select categories",
      onChange: (values: string[]) => setSelectedCategories(values),
    },
    {
      name: "subcategory",
      label: "Sub Categories",
      type: "multi-select" as const,
      options: getFilteredSubcategoryOptions(),
      placeholder: selectedCategories.length === 0 ? "Select categories first" : "Select subcategories",
      disabled: selectedCategories.length === 0,
    },
    { name: "is_featured", label: "Featured Designer", type: "switch" as const },
    { name: "is_sustainable", label: "Sustainable Designer", type: "switch" as const },
    { name: "is_verified", label: "Verified Designer", type: "switch" as const },
    {
      name: "portfolio_images",
      label: "Portfolio Images",
      type: "image-multiple" as const,
      bucket: "designer-portfolios",
    },
    { name: "website_url", label: "Website URL", type: "text" as const, placeholder: "https://..." },
    { name: "instagram_url", label: "Instagram URL", type: "text" as const, placeholder: "https://instagram.com/..." },
    { name: "tiktok_url", label: "TikTok URL", type: "text" as const, placeholder: "https://tiktok.com/..." },
    { name: "email", label: "Email", type: "email" as const },
    { name: "phone", label: "Phone", type: "text" as const },
    { name: "image_url", label: "Profile Image", type: "image" as const, bucket: "designer-profiles" },
    { name: "cover_image", label: "Cover Image", type: "image" as const, bucket: "designer-covers" },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: ["active", "inactive", "pending"],
      required: true,
    },
  ]

  return { designerFields, isLoading, selectedCategories, setSelectedCategories }
}
