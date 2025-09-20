import { getPageContent } from "@/lib/content"
import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Instagram, Facebook } from "lucide-react"

export async function Footer() {
  const content = await getPageContent('footer')
  
  // Fallback content if not found
  const brand = content?.brand || {
    name: "Afrispiration",
    description: "Discovering exceptional fashion talent from around the world. Curated designers, sustainable practices, cultural authenticity."
  }
  
  const company = content?.company || {
    title: "Company",
    links: [
      { label: "About Us", url: "/about" },
      { label: "FAQ", url: "/faq" },
      { label: "Join our directory", url: "/submit" },
      { label: "Join our WhatsApp Channel", url: "https://whatsapp.com/channel/0029VaEMFm5J93wYaEt7tA18" }
    ]
  }
  
  const social = content?.social || {
    instagram: "https://www.instagram.com/afrispiration/",
    facebook: "https://www.facebook.com/Afrispiration", 
    whatsapp: "https://whatsapp.com/channel/0029VaEMFm5J93wYaEt7tA18"
  }
  
  const newsletter = content?.newsletter || {
    title: "Stay Updated",
    description: "Get the latest designer spotlights and fashion insights delivered to your inbox."
  }
  
  const copyright = content?.copyright || "© 2025 Afrispiration. All rights reserved."

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">{brand.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-medium">Explore</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/designers" className="text-muted-foreground hover:text-foreground transition-colors">
                Designers
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>

            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-medium">{company.title}</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              {company.links?.map((link: any, index: number) => (
                <Link key={index} href={link.url} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">{newsletter.title}</h4>
            <p className="text-sm text-muted-foreground">
              {newsletter.description}
            </p>
            <NewsletterSignup placeholder="Your email" buttonText="Subscribe" />
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"

              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">

              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />

            </a>
            <a
              href={social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Join our WhatsApp Channel</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
