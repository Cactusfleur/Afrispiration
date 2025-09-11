"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Designer } from "@/lib/types"
import { getDesignerSlug } from "@/lib/utils/designer-utils"
import { MapPin, ExternalLink, Instagram } from "lucide-react"

interface DesignerCardProps {
  designer: Designer
}

export function DesignerCard({ designer }: DesignerCardProps) {
  const slug = getDesignerSlug(designer.name)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/designers/${slug}`}>
          <div className="aspect-[4/5] bg-muted relative overflow-hidden">
            {designer.image_url ? (
              <img
                src={designer.image_url || "/placeholder.svg"}
                alt={designer.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                <span className="text-muted-foreground font-serif text-2xl">{designer.name.charAt(0)}</span>
              </div>
            )}
            {designer.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>
        </Link>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {designer.specialties?.slice(0, 2).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {designer.sustainability_rating && designer.sustainability_rating >= 4 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Sustainable
              </Badge>
            )}
          </div>

          <Link href={`/designers/${slug}`}>
            <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {designer.name}
            </h3>
          </Link>

          {designer.location && (
            <div className="flex items-center gap-1 mb-3 text-muted-foreground text-sm">
              <MapPin className="h-3 w-3" />
              <span>{designer.location}</span>
            </div>
          )}

          {designer.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{designer.bio}</p>
          )}

          <div className="flex items-center gap-3">
            {designer.website_url && (
              <a
                href={designer.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {designer.instagram_url && (
              <a
                href={designer.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
