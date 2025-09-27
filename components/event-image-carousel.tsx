"use client"

import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface EventImageCarouselProps {
  images: string[]
  title: string
  className?: string
  aspectRatio?: string
  showDots?: boolean
}

export function EventImageCarousel({
  images,
  title,
  className,
  aspectRatio = "aspect-[4/3]",
  showDots = false,
}: EventImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className={cn(aspectRatio, "bg-muted rounded-lg overflow-hidden flex items-center justify-center", className)}
      >
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>
    )
  }

  // If only one image, show it without carousel controls
  if (images.length === 1) {
    return (
      <div className={cn(aspectRatio, "bg-muted rounded-lg overflow-hidden", className)}>
        <img src={images[0] || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onSelect={(api) => {
          if (api) {
            setCurrentIndex(api.selectedScrollSnap())
          }
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className={cn(aspectRatio, "bg-muted rounded-lg overflow-hidden")}>
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />

        {/* Dots indicator */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/75",
                )}
                onClick={() => {
                  // This would need carousel API to jump to specific slide
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>
        )}
      </Carousel>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
