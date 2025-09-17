"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

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
            <Link
              href="/coming-soon"
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium tracking-wide"
            >
              <div className="w-20 h-8 cursor-pointer flex justify-center items-center transition-colors text-sm font-medium tracking-wide border-2 border-black">
                SHOP
              </div>
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://forms.gle/PSoHZw5gV2sxP5MbA"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Join our directory
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


              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/coming-soon"
                className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              >
                  SHOP
              </Link>

              <Link
                href="https://forms.gle/PSoHZw5gV2sxP5MbA"
                className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Join our directory
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
