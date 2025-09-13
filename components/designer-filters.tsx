"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Search, Leaf } from "lucide-react"

interface DesignerFiltersProps {
  onFiltersChange: (filters: {
    search: string
    category: string
    subcategory: string
    designerLocation: string
    productionLocation: string
    sustainability: boolean
  }) => void
}

const categories = ["Women", "Men", "Unisex", "Kids", "Accessories", "Shoes", "Jewellery", "Beauty & Fragrance",]

const subcategories = {
  Women: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  Men: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  Unisex: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  Kids: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  Accessories: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  Shoes: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  Jewellery: ["Ready to Wear (RWT)", "Made to measure", "Bespoke/Custom.", "Children's Wear", "Modest Fashion", "Bridal"],
  "Beauty & Fragrance": ["Skincare", "Fragrance", "Hair Care"],
}

const countries = [
  "Nigeria",
  "Ghana",
  "South Africa",
  "Kenya",
  "Morocco",
  "Egypt",
  "Ethiopia",
  "Senegal",
  "Ivory Coast",
  "Tanzania",
  "Uganda",
  "Rwanda",
  "Botswana",
  "Namibia",
  "Zimbabwe",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "France",
  "Italy",
  "Germany",
]

export function DesignerFilters({ onFiltersChange }: DesignerFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subcategory: "",
    designerLocation: "",
    productionLocation: "",
    sustainability: false,
  })

  const [designerLocationSearch, setDesignerLocationSearch] = useState("")
  const [productionLocationSearch, setProductionLocationSearch] = useState("")

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearFilters = () => {
    const cleared = {
      search: "",
      category: "",
      subcategory: "",
      designerLocation: "",
      productionLocation: "",
      sustainability: false,
    }
    setFilters(cleared)
    setDesignerLocationSearch("")
    setProductionLocationSearch("")
    onFiltersChange(cleared)
  }

  const hasActiveFilters = Object.values(filters).some((value) =>
    typeof value === "string" ? value !== "" : value === true,
  )

  const filteredDesignerCountries = countries.filter((country) =>
    country.toLowerCase().includes(designerLocationSearch.toLowerCase()),
  )

  const filteredProductionCountries = countries.filter((country) =>
    country.toLowerCase().includes(productionLocationSearch.toLowerCase()),
  )

  const availableSubcategories = filters.category
    ? subcategories[filters.category as keyof typeof subcategories] || []
    : []

  return (
    <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold">Filter Designers</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search Designers</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name or description..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            updateFilters({
              category: value === "all" ? "" : value,
              subcategory: "",
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {filters.category && (
        <div className="space-y-2">
          <Label>Subcategory</Label>
          
          <Select value={filters.subcategory} onValueChange={(value) => updateFilters({ subcategory: value === "all" ? "" : value, })}>
            <SelectTrigger>
              <SelectValue placeholder="All subcategories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subcategories</SelectItem>
              {availableSubcategories.map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Designer Location</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={designerLocationSearch}
            onChange={(e) => setDesignerLocationSearch(e.target.value)}
            className="pl-10 mb-2"
          />
        </div>
        <Select value={filters.designerLocation} onValueChange={(value) => updateFilters({ designerLocation: value })}>
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {filteredDesignerCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Production Location</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={productionLocationSearch}
            onChange={(e) => setProductionLocationSearch(e.target.value)}
            className="pl-10 mb-2"
          />
        </div>
        <Select
          value={filters.productionLocation}
          onValueChange={(value) => updateFilters({ productionLocation: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {filteredProductionCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sustainability"
            checked={filters.sustainability}
            onCheckedChange={(checked) => updateFilters({ sustainability: !!checked })}
          />
          <label
            htmlFor="sustainability"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
          >
            <Leaf className="h-4 w-4 text-green-600" />
            Sustainable
          </label>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <Label>Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: {filters.search}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ search: "" })} />
              </Badge>
            )}
            {filters.category && filters.category !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {filters.category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilters({ category: "", subcategory: "" })}
                />
              </Badge>
            )}
            {filters.subcategory && (
              <Badge variant="secondary" className="gap-1">
                {filters.subcategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ subcategory: "" })} />
              </Badge>
            )}
            {filters.designerLocation && (
              <Badge variant="secondary" className="gap-1">
                Designer: {filters.designerLocation}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ designerLocation: "" })} />
              </Badge>
            )}
            {filters.productionLocation && (
              <Badge variant="secondary" className="gap-1">
                Production: {filters.productionLocation}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ productionLocation: "" })} />
              </Badge>
            )}
            {filters.sustainability && (
              <Badge variant="secondary" className="gap-1">
                <Leaf className="h-3 w-3 text-green-600" />
                Sustainable
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ sustainability: false })} />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
