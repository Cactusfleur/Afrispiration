import { getPageContent } from "@/lib/page-content"
import type { ReactNode } from "react"

interface DynamicContentProps {
  pageKey: string
  children: (content: any) => ReactNode
  fallback?: ReactNode
}

export async function DynamicContent({ pageKey, children, fallback }: DynamicContentProps) {
  const content = await getPageContent(pageKey)

  if (!content && fallback) {
    return <>{fallback}</>
  }

  return <>{children(content)}</>
}
// Client component version for when you need interactivity
;("use client")
interface ClientDynamicContentProps {
  content: any
  children: (content: any) => ReactNode
  fallback?: ReactNode
}

export function ClientDynamicContent({ content, children, fallback }: ClientDynamicContentProps) {
  if (!content && fallback) {
    return <>{fallback}</>
  }

  return <>{children(content)}</>
}
