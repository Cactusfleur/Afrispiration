import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldX } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <ShieldX className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="font-serif text-2xl text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access the admin panel. Please contact a system administrator if you believe
              this is an error.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link href="/admin/login">Back to Login</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
