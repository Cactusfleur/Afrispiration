import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Designer Directory</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discovering exceptional fashion talent from around the world. Curated designers, sustainable practices,
              cultural authenticity.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-medium">Explore</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/designers" className="text-muted-foreground hover:text-foreground transition-colors">
                Designers
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Journal
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                Submit Profile
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-medium">Company</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest designer spotlights and fashion insights delivered to your inbox.
            </p>
            <NewsletterSignup placeholder="Your email" buttonText="Subscribe" />
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 Designer Directory. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218z" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
