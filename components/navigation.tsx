"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation" // Added usePathname import for active page detection
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils" // Added cn utility for conditional styling

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() // Added pathname hook to detect current page

  const navItems = [
    { href: "/designers", label: "Designers" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-bold tracking-tight">Afrispiration</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">


            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors text-sm font-medium tracking-wide",
                    isActive
                      ? "text-foreground font-semibold border-b-2 border-foreground pb-1"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/submit"
              className={cn(
                "block px-3 py-2 transition-colors text-sm font-medium",
                pathname === "/submit" ? "text-foreground font-semibold" : "text-foreground/80 hover:text-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              Join our directory
            </Link>
            <Link
              href="/coming-soon"
              className={cn(
                "transition-colors text-sm font-medium tracking-wide",
                pathname === "/coming-soon" ? "text-foreground" : "text-foreground/80 hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "w-20 h-8 cursor-pointer flex justify-center items-center transition-colors text-sm font-medium tracking-wide border-2",
                  pathname === "/coming-soon" ? "border-black bg-black text-white" : "border-black",
                )}
              >
                SHOP
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 transition-colors text-sm font-medium rounded-md",
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}


              <Link
                href="/submit"
                className={cn(
                  "block px-3 py-2 transition-colors text-sm font-medium rounded-md",
                  pathname === "/submit"
                    ? "bg-muted text-foreground font-semibold"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted",
                )}
                onClick={() => setIsOpen(false)}
              >
                Join our directory
              </Link>

              <Link
                href="/coming-soon"
                className={cn(
                  "block px-3 py-2 transition-colors text-sm font-medium rounded-md",
                  pathname === "/coming-soon"
                    ? "bg-muted text-foreground font-semibold"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted",
                )}
                onClick={() => setIsOpen(false)}
              >
                SHOP
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
