// components/forms/designer-fields.ts
export const designerFields = [
  { name: "name", label: "Designer Name", type: "text" as const, required: true },
  { name: "bio", label: "Biography", type: "textarea" as const, placeholder: "Tell us about the designer..." },
  { name: "location", label: "Designer Country", type: "text" as const, placeholder: "Country" },
  { name: "production_location", label: "Production Country", type: "text" as const, placeholder: "Country" },
  {
    name: "category",
    label: "Category",
    type: "select" as const,
    options: ["Women", "Men", "Unisex", "Kids", "Accessories", "Shoes", "Jewellery", "Beauty & Fragrance"]
  },
  {
    name: "subcategory",
    label: "Sub Category",
    type: "select" as const,
    options: ["Skincare", "Fragrance", "Hair Care", "Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom"]
  },
  { name: "is_featured", label: "Featured Designer", type: "switch" as const },
  { name: "is_sustainable", label: "Sustainable Designer", type: "switch" as const },
  { name: "is_verified", label: "Verified Designer", type: "switch" as const },
  {
    name: "portfolio_images",
    label: "Portfolio Images",
    type: "tags" as const,
    placeholder: "https://..."
  },
  { name: "website_url", label: "Website URL", type: "text" as const, placeholder: "https://..." },
  { name: "instagram_url", label: "Instagram URL", type: "text" as const, placeholder: "https://instagram.com/..." },
  { name: "email", label: "Email", type: "email" as const },
  { name: "phone", label: "Phone", type: "text" as const },
  { name: "image_url", label: "Profile Image URL", type: "text" as const, placeholder: "https://..." },
  { name: "cover_image", label: "Cover Image URL", type: "text" as const, placeholder: "https://..." },
  {
    name: "status",
    label: "Status",
    type: "select" as const,
    options: ["active", "inactive", "pending"],
    required: true,
  },
]
