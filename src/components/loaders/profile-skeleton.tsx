import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Car, Clock, FileText, Mail, MapPin, Phone, User } from "lucide-react"

export default function PupilProfileSkeleton() {
  return (
    <div className="">
      <Card className="border-0 shadow-lg pt-0 mb-6">
        <CardContent className="">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarFallback className="text-2xl font-bold bg-muted">
                <Skeleton className="w-8 h-8 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Skeleton className="h-10 w-64 mb-2" />
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted">
                  <Car className="w-4 h-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full border bg-background">
                  <FileText className="w-4 h-4" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <User className="w-5 h-5 text-green-700/80" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <Skeleton className="h-5 w-48" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Mobile</p>
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Work Phone</p>
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <MapPin className="w-5 h-5 text-green-700/80" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Home Address</p>
              <Skeleton className="h-5 w-full mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pickup Address</p>
              <Skeleton className="h-5 w-full mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <FileText className="w-5 h-5 text-green-700/80" />
              License Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">License Number</p>
              <Skeleton className="h-6 w-40" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">License Type</p>
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Theory Test:</p>
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Certificate Number</p>
              <Skeleton className="h-5 w-32" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <Clock className="w-5 h-5 text-green-700/80" />
              Lesson Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Usual Availability</p>
              <Skeleton className="h-5 w-full" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Text Messaging</p>
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Notes</p>
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Student Since</p>
              <Skeleton className="h-5 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
