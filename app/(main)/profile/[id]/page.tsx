"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Star, Edit, Mail, Share2, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowCard } from "@/components/glow-card"
import { EventCard } from "@/components/event-card"
import { useAuth } from "@/lib/auth-context"
import { mockUsers, mockEvents, mockReviews } from "@/lib/mock-data"
import { toast } from "sonner"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState("events")

  const profileUser = mockUsers.find((u) => u.id === params.id)

  if (!profileUser) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <AlertCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-muted-foreground mt-2">This profile may have been removed or doesn't exist.</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Go Home
        </Button>
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === profileUser.id
  const hostedEvents = mockEvents.filter((e) => e.hostId === profileUser.id)
  const joinedEvents = mockEvents.filter((e) => e.participants.some((p) => p.id === profileUser.id))
  const userReviews = mockReviews.filter((r) => r.hostId === profileUser.id)

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: profileUser.fullName,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Profile link copied!")
    }
  }

  // Get avatar based on user
  const getAvatar = () => {
    if (profileUser.id === "user_1") return "/professional-man-headshot.png"
    if (profileUser.id === "user_2") return "/professional-woman-headshot.png"
    if (profileUser.id === "user_3") return "/asian-man-professional-headshot.png"
    if (profileUser.id === "user_4") return "/young-woman-smiling-headshot.png"
    if (profileUser.id === "admin_1") return "/administrator-avatar.jpg"
    return profileUser.avatar || "/placeholder.svg"
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Profile Header */}
        <GlowCard className="relative overflow-hidden">
          {/* Cover gradient */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />

          <div className="relative pt-16 pb-6 px-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              {/* Avatar */}
              <div className="relative -mt-24 sm:-mt-20">
                <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-2xl border-4 border-background overflow-hidden bg-muted">
                  <Image
                    src={getAvatar() || "/placeholder.svg"}
                    alt={profileUser.fullName}
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                  />
                </div>
                {profileUser.role === "host" && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary">Verified Host</Badge>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h1 className="text-2xl sm:text-3xl font-bold">{profileUser.fullName}</h1>
                  {profileUser.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">{profileUser.rating}</span>
                      <span className="text-sm text-muted-foreground">({profileUser.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>

                {profileUser.location && (
                  <div className="flex items-center gap-1 text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4" />
                    {profileUser.location}
                  </div>
                )}

                {profileUser.bio && <p className="mt-3 text-muted-foreground max-w-2xl">{profileUser.bio}</p>}

                {profileUser.interests.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profileUser.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full sm:w-auto">
                {isOwnProfile ? (
                  <Link href="/profile/edit" className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button className="flex-1 sm:flex-none gap-2">
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold gradient-text">{hostedEvents.length}</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">{joinedEvents.length}</div>
                <div className="text-sm text-muted-foreground">Events Joined</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">{new Date(profileUser.createdAt).getFullYear()}</div>
                <div className="text-sm text-muted-foreground">Member Since</div>
              </div>
            </div>
          </div>
        </GlowCard>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">{profileUser.role === "host" ? "Hosted Events" : "Joined Events"}</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            {(profileUser.role === "host" ? hostedEvents : joinedEvents).length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(profileUser.role === "host" ? hostedEvents : joinedEvents).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <GlowCard className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold">No events yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {profileUser.role === "host"
                    ? "This host hasn't created any events yet."
                    : "This user hasn't joined any events yet."}
                </p>
              </GlowCard>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {userReviews.length > 0 ? (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <GlowCard key={review.id}>
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{review.user.fullName}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-muted-foreground">{review.comment}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            ) : (
              <GlowCard className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold">No reviews yet</h3>
                <p className="text-sm text-muted-foreground mt-1">This user hasn't received any reviews yet.</p>
              </GlowCard>
            )}
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <GlowCard>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{profileUser.bio || "No bio provided yet."}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Interests</h3>
                  {profileUser.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profileUser.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No interests specified yet.</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Member Info</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Member since{" "}
                      {new Date(profileUser.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="capitalize">Role: {profileUser.role}</p>
                    {profileUser.location && <p>Location: {profileUser.location}</p>}
                  </div>
                </div>
              </div>
            </GlowCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
