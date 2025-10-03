"use server"
import { notFound } from "next/navigation"
import { DesignerPageClient } from "./designer-page-client"
import { getDesignerBySlug, getRelatedDesigners } from "@/lib/designers"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/ScrollToTop"

interface DesignerPageProps {
  params: Promise<{ slug: string }>
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  try {
    const { slug } = await params
    const designer = await getDesignerBySlug(slug)

    if (!designer) {
      notFound()
    }

    const relatedDesigners = await getRelatedDesigners(designer.id, designer.category, 4)

    return <> 
    <ScrollToTop />
    <DesignerPageClient designer={designer} relatedDesigners={relatedDesigners} />
    <Footer/> 
    </>
  } catch (error) {
    console.error("Error in DesignerPage:", error)
    notFound()
  }
}
