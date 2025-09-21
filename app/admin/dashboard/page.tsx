import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Users, FileText, Calendar, Mail } from "lucide-react"

async function getDashboardStats() {
  const supabase = await createClient()

  const [{ count: designersCount }, { count: blogPostsCount }, { count: eventsCount }, { count: signupsCount }] =
    await Promise.all([
      supabase.from("designers").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("coming_soon_signups").select("*", { count: "exact", head: true }),
    ])

  return {
    designers: designersCount || 0,
    blogPosts: blogPostsCount || 0,
    events: eventsCount || 0,
    signups: signupsCount || 0,
  }
}

export default async function AdminDashboard() {
  await requireAdmin()
  const stats = await getDashboardStats()

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Welcome to the Afrispiration admin panel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Designers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.designers}</div>
              <p className="text-xs text-muted-foreground">Active designer profiles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.blogPosts}</div>
              <p className="text-xs text-muted-foreground">Published articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.events}</div>
              <p className="text-xs text-muted-foreground">Scheduled events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Signups</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.signups}</div>
              <p className="text-xs text-muted-foreground">Newsletter subscribers</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <a
                href="/admin/designers/new"
                className="p-4 sm:p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors text-center min-h-[100px] flex flex-col justify-center touch-manipulation"
              >
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm sm:text-base">Add Designer</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Create new profile</p>
              </a>

              <a
                href="/admin/blog/new"
                className="p-4 sm:p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors text-center min-h-[100px] flex flex-col justify-center touch-manipulation"
              >
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm sm:text-base">Write Article</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Create blog post</p>
              </a>

              <a
                href="/admin/events/new"
                className="p-4 sm:p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors text-center min-h-[100px] flex flex-col justify-center touch-manipulation"
              >
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm sm:text-base">Add Event</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Schedule new event</p>
              </a>

              <a
                href="/admin/signups"
                className="p-4 sm:p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors text-center min-h-[100px] flex flex-col justify-center touch-manipulation"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm sm:text-base">View Signups</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Manage subscribers</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
