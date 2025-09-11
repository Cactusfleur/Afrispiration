import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Mail, Download, Calendar } from "lucide-react"

interface ComingSoonSignup {
  id: string
  email: string
  name?: string
  interests?: string[]
  referral_source?: string
  created_at: string
}

async function getSignups(): Promise<ComingSoonSignup[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("coming_soon_signups")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching signups:", error)
    return []
  }

  return data || []
}

export default async function AdminSignupsPage() {
  await requireAdmin()
  const signups = await getSignups()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Email Signups</h1>
            <p className="text-muted-foreground">Manage newsletter subscribers and coming soon signups</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{signups.length}</div>
              <p className="text-xs text-muted-foreground">All time subscribers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  signups.filter((signup) => {
                    const signupDate = new Date(signup.created_at)
                    const now = new Date()
                    return signupDate.getMonth() === now.getMonth() && signupDate.getFullYear() === now.getFullYear()
                  }).length
                }
              </div>
              <p className="text-xs text-muted-foreground">New this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Signups List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signups.slice(0, 50).map((signup) => (
                <div key={signup.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{signup.email}</p>
                        {signup.name && <p className="text-sm text-muted-foreground">{signup.name}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(signup.created_at).toLocaleDateString()}
                      </span>

                      {signup.interests && signup.interests.length > 0 && (
                        <div className="flex gap-1">
                          {signup.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {signup.referral_source && (
                        <span className="text-xs text-muted-foreground">via {signup.referral_source}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {signups.length === 0 && (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-serif text-lg font-semibold mb-2">No signups yet</h3>
                <p className="text-muted-foreground">Email signups will appear here as people subscribe.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
