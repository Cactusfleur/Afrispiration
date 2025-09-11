"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbox } from "@/components/lightbox"
import type { Designer } from "@/lib/types"
import { MapPin, Instagram, Mail, Phone, Calendar, Factory, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import { DesignerCard } from "@/components/designer-card"

interface DesignerPageClientProps {
  designer: Designer
  relatedDesigners: Designer[]
}

export function DesignerPageClient({ designer, relatedDesigners }: DesignerPageClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const portfolioImages = designer.portfolio_images || []

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section with Cover Image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={designer.cover_image || "/placeholder.svg?height=600&width=1200&query=fashion designer studio"}
              alt={`${designer.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Modern Card Overlay */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 opacity-80">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl">
              {/* Designer Name */}
              <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4 text-center">{designer.name}</h1>

              {/* Verification and Award Icons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {designer.featured && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Verified</span>
                  </div>
                )}
                {designer.is_sustainable && (
                  <div className="flex items-center gap-1">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-xs text-muted-foreground">Sustainable</span>
                  </div>
                )}
              </div>

              {/* Category and Subcategory */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground lowercase tracking-wide">
                  {designer.category}
                  {designer.subcategory && ` ${designer.subcategory}`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/designers" className="hover:text-foreground">
                Designers
              </Link>
              <span>›</span>
              <span className="text-foreground font-medium">{designer.name}</span>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Sidebar - Designer Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">
                    DESIGNED BY
                  </h2>
                  <h1 className="font-serif text-3xl font-bold mb-6">{designer.name}</h1>
                </div>

                {designer.made_in_country && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      PRODUCTION LOCATION
                    </h3>
                    <div className="flex items-center gap-2">
                      <Factory className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{designer.made_in_country}</span>
                    </div>
                  </div>
                )}

                {designer.location && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      DESIGNER LOCATION
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{designer.location}</span>
                    </div>
                  </div>
                )}

                {designer.category && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">CATEGORY</h3>
                    <Badge variant="secondary" className="text-sm">
                      {designer.category}
                    </Badge>
                  </div>
                )}

                {designer.subcategory && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      SUBCATEGORY
                    </h3>
                    <Badge variant="outline" className="text-sm">
                      {designer.subcategory}
                    </Badge>
                  </div>
                )}

                {designer.years_experience && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      YEAR LAUNCHED
                    </h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{new Date().getFullYear() - designer.years_experience}</span>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">SOCIAL</h3>
                  <div className="flex gap-3">
                    {designer.instagram_url && (
                      <a
                        href={designer.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {designer.email && (
                      <a href={`mailto:${designer.email}`} className="text-muted-foreground hover:text-foreground">
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                    {designer.phone && (
                      <a href={`tel:${designer.phone}`} className="text-muted-foreground hover:text-foreground">
                        <Phone className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Website */}
                {designer.website_url && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">WEBSITE</h3>
                    <a
                      href={designer.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground break-all"
                    >
                      {designer.website_url}
                    </a>
                  </div>
                )}

                {/* Shop Now Button */}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/coming-soon">SHOP NOW</Link>
                </Button>
              </div>

              {/* Right Content - Biography and Past Works */}
              <div className="lg:col-span-2 space-y-8">
                {/* Biography */}
                {designer.bio && (
                  <div>
                    <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-6">
                      BIOGRAPHY
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-foreground leading-relaxed text-base">{designer.bio}</p>
                    </div>
                  </div>
                )}

                {portfolioImages.length > 0 && (
                  <div>
                    <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-6">
                      PAST WORKS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {portfolioImages.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group relative"
                          onClick={() => openLightbox(index)}
                        >
                          <img
                            src={image || "/placeholder.svg?height=400&width=400"}
                            alt={`${designer.name} work ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                              <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* More Designers section with responsive grid */}
        {relatedDesigners.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold mb-4">More Designers</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover other talented designers from our curated collection
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedDesigners.map((relatedDesigner) => (
                  <DesignerCard key={relatedDesigner.id} designer={relatedDesigner} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                  <Link href="/designers">View All Designers</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <Lightbox
        images={portfolioImages}
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
        alt={`${designer.name} portfolio`}
      />
    </div>
  )
}
