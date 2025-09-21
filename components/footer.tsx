import { getPageContentWithFallback } from "@/lib/page-content"
import { FooterClient } from "./footer-client"

export async function Footer() {
  const content = await getPageContentWithFallback("footer", {
    brand: {
      name: "Afrispiration",
      description:
        "Discovering exceptional fashion talent from around the world. Curated designers, sustainable practices, cultural authenticity."
    },
    company: {
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "FAQ", url: "/faq" },
        { label: "Join our directory", url: "/submit" },
        { label: "Join WhatsApp", url: "https://whatsapp.com/channel/0029VaEMFm5J93wYaEt7tA18" }
      ]
    },
    social: {
      instagram: "https://www.instagram.com/afrispiration/",
      facebook: "https://www.facebook.com/Afrispiration",
      whatsapp: "https://whatsapp.com/channel/0029VaEMFm5J93wYaEt7tA18"
    },
    newsletter: {
      title: "Stay Updated",
      description: "Get the latest designer spotlights and fashion insights."
    },
    copyright: `© ${new Date().getFullYear()} Afrispiration. All rights reserved.`
  })

  return <FooterClient content={content} />
}
