"use client"

import { createContext, useContext, type ReactNode } from "react"

interface PageContentContextType {
  content: any
}

const PageContentContext = createContext<PageContentContextType | null>(null)

interface PageContentProviderProps {
  children: ReactNode
  content: any
}

export function PageContentProvider({ children, content }: PageContentProviderProps) {
  return <PageContentContext.Provider value={{ content }}>{children}</PageContentContext.Provider>
}

export function usePageContent() {
  const context = useContext(PageContentContext)
  if (!context) {
    throw new Error("usePageContent must be used within a PageContentProvider")
  }
  return context.content
}
