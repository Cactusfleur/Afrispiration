"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllPageContent, updatePageContent } from "@/lib/content"
import type { PageContent } from "@/lib/content"
import { ContentEditor } from "./ContentEditor"
import { FileText, Save, RefreshCw } from "lucide-react"

const pageLabels = {
  faq: "FAQ Page",
  about: "About Page", 
  coming_soon: "Coming Soon Page",
  submit: "Submit Page",
  events: "Events Page",
  blog: "Blog Page",
  designers: "Designers Page",
  footer: "Footer (Global)"
}

export function ContentManager() {
  const [pageContents, setPageContents] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("faq")

  useEffect(() => {
    fetchPageContents()
  }, [])

  const fetchPageContents = async () => {
    setLoading(true)
    const contents = await getAllPageContent()
    setPageContents(contents)
    setLoading(false)
  }

  const handleSave = async (pageKey: string, content: any) => {
    setSaving(pageKey)
    try {
      const success = await updatePageContent(pageKey, content)
      if (success) {
        // Update local state
        setPageContents(prev => 
          prev.map(page => 
            page.page_key === pageKey 
              ? { ...page, content, updated_at: new Date().toISOString() }
              : page
          )
        )
        alert("Content saved successfully!")
      } else {
        alert("Failed to save content. Please try again.")
      }
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Failed to save content. Please try again.")
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading content...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          {Object.entries(pageLabels).map(([key, label]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {label.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(pageLabels).map(([pageKey, pageLabel]) => {
          const pageContent = pageContents.find(p => p.page_key === pageKey)
          
          return (
            <TabsContent key={pageKey} value={pageKey}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {pageLabel}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last updated: {pageContent ? new Date(pageContent.updated_at).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <Badge variant="outline">{pageKey}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {pageContent ? (
                    <ContentEditor
                      pageKey={pageKey}
                      content={pageContent.content}
                      onSave={(content) => handleSave(pageKey, content)}
                      isSaving={saving === pageKey}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No content found for this page.</p>
                      <Button 
                        onClick={() => handleSave(pageKey, {})}
                        className="mt-4"
                      >
                        Initialize Content
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}