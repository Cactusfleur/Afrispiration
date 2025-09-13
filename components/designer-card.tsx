
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Designer } from "@/lib/types"
import { MapPin, } from "lucide-react"
import { SustainabilityIcon } from "./icons"
import { Separator } from "./ui/separator"

interface DesignerCardProps {
  designer: Designer
}

export function DesignerCard({ designer }: DesignerCardProps) {
  const slug = designer.slug

  return (

    <Card key={designer.id} className="group hover:shadow-lg transition-shadow">
      <Link href={`/designers/${designer.slug}`}>
        <CardContent className="p-0">
          <div className="aspect-[4/5] bg-muted rounded-t-lg">
            <img
              src={designer.image_url || "/placeholder.svg?height=400&width=300"}
              alt={designer.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {designer.is_sustainable && <SustainabilityIcon />}

              {designer.production_location && (
                <div className="flex items-center gap-1  text-muted-foreground text-sm">
                  Made in
                  <MapPin className="h-3 w-3" />
                  <span>{designer.production_location}</span>
                </div>
              )}

            </div>
            <Separator className="my-3" />
            <h3 className="font-serif text-xl font-semibold mb-2">{designer.name}</h3>
            {designer.location && (
              <div className="flex items-center gap-1  text-muted-foreground text-sm">
                <MapPin className="h-3 w-3" />
                <span>{designer.location}</span>
              </div>
            )}

            <div className="flex space-x-2 my-2">
              <Badge variant="secondary" className="text-xs">
                {designer.category}
              </Badge>
              {designer.subcategory && (
                <Badge variant="secondary" className="text-xs">
                  {designer.subcategory}
                </Badge>
              )}
            </div>

            <p className="text-sm leading-relaxed line-clamp-3">
              {designer.bio}
            </p>

            {/* See more button */}
            <div className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              See more →
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
