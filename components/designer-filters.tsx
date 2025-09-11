"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"

interface DesignerFiltersProps {
  onFiltersChange: (filters: {
    search: string
    specialty: string
    location: string
    priceRange: string
    sustainability: boolean
  }) => void
}

const specialties = [
  "Fashion",
  "Accessories",
  "Jewelry",
  "Sustainable",
  "Luxury",
  "Contemporary",
  "Menswear",
  "Womenswear",
  "Modest Fashion",
  "Handcrafted",
  "Tailoring",
]

const locations = [
  "Lagos, Nigeria",
  "Accra, Ghana",
  "Cape Town, South Africa",
  "Dubai, UAE",
  "London, UK",
  "New York, USA",
  "Paris, France",
]

export function DesignerFilters({ onFiltersChange }: DesignerFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    specialty: "",
    location: "",
    priceRange: "",
    sustainability: false,
  })

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearFilters = () => {
    const cleared = {
      search: "",
      specialty: "",
      location: "",
      priceRange: "",
      sustainability: false,
    }
    setFilters(cleared)
    onFiltersChange(cleared)
  }

  const hasActiveFilters = Object.values(filters).some((value) =>
    typeof value === "string" ? value !== "" : value === true,
  )

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

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
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

      {/* Specialty */}
      <div className="space-y-2">
        <Label>Specialty</Label>
        <Select value={filters.specialty} onValueChange={(value) => updateFilters({ specialty: value })}>
          <SelectTrigger>
            <SelectValue placeholder="All specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specialties</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <Select value={filters.location} onValueChange={(value) => updateFilters({ location: value })}>
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Select value={filters.priceRange} onValueChange={(value) => updateFilters({ priceRange: value })}>
          <SelectTrigger>
            <SelectValue placeholder="All price ranges" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All price ranges</SelectItem>
            <SelectItem value="$">$ - Affordable</SelectItem>
            <SelectItem value="$$">$$ - Moderate</SelectItem>
            <SelectItem value="$$$">$$$ - Premium</SelectItem>
            <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sustainability Filter */}
      <div className="space-y-2">
        <Label>Sustainability Focus</Label>
        <Button
          variant={filters.sustainability ? "default" : "outline"}
          size="sm"
          onClick={() => updateFilters({ sustainability: !filters.sustainability })}
          className="w-full justify-start"
        >
          {filters.sustainability ? "✓ " : ""}Sustainable Practices
        </Button>
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
            {filters.specialty && (
              <Badge variant="secondary" className="gap-1">
                {filters.specialty}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ specialty: "" })} />
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="gap-1">
                {filters.location}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ location: "" })} />
              </Badge>
            )}
            {filters.priceRange && (
              <Badge variant="secondary" className="gap-1">
                {filters.priceRange}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ priceRange: "" })} />
              </Badge>
            )}
            {filters.sustainability && (
              <Badge variant="secondary" className="gap-1">
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
