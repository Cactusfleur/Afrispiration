"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, Calendar, Mail, LogOut, Menu, X, Settings, Tags } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/designers",
    label: "Designers",
    icon: Users,
  },
  {
    href: "/admin/blog",
    label: "Blog Posts",
    icon: FileText,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: Tags,
  },
  {
    href: "/admin/pages-content",
    label: "Pages Content",
    icon: Settings,
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: Calendar,
  },
  {
    href: "/admin/signups",
    label: "Signups",
    icon: Mail,
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element
      if (isMobileMenuOpen && !target.closest("[data-mobile-nav]")) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="touch-manipulation min-h-[44px] min-w-[44px] shadow-lg bg-background/95 backdrop-blur-sm"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          data-mobile-nav
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 touch-manipulation",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-mobile-nav
        onTouchStart={(e) => {
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-border">
            <Link
              href="/admin/dashboard"
              className="block touch-manipulation"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <h1 className="font-serif text-lg sm:text-xl font-bold">Admin Panel</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Afrispiration</p>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors touch-manipulation min-h-[48px] active:scale-95",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted/80",
                      )}
                      onClick={closeMobileMenu}
                      tabIndex={isMobileMenuOpen ? 0 : -1}
                      onTouchStart={(e) => {
                        e.stopPropagation()
                        e.currentTarget.style.transform = "scale(0.98)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground touch-manipulation min-h-[48px] active:scale-95"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onTouchStart={(e) => {
                e.stopPropagation()
                e.currentTarget.style.transform = "scale(0.98)"
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <LogOut className="h-4 w-4 mr-3 shrink-0" />
              <span className="truncate">Sign Out</span>
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden touch-manipulation backdrop-blur-sm"
          onClick={closeMobileMenu}
          onTouchEnd={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
