"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, Share2, Heart, Star, ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { GlowCard } from "@/components/glow-card"
import { ReviewForm } from "@/components/review-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { mockEvents, mockReviews } from "@/lib/mock-data"
import { toast } from "sonner"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const event = mockEvents.find((e) => e.id === params.id)
  const hostReviews = mockReviews.filter((r) => r.hostId === event?.hostId)

  if (!event) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <AlertCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="text-muted-foreground mt-2">This event may have been removed or doesn't exist.</p>
        <Button className="mt-4" onClick={() => router.push("/events")}>
          Browse Events
        </Button>
      </div>
    )
  }

  const spotsLeft = event.maxParticipants - event.currentParticipants
  const isFull = spotsLeft <= 0
  const eventDate = new Date(event.date)
  const isPast = eventDate < new Date()
  const hasAttended = isPast && event.participants.some((p) => p.id === user?.id)

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to join events")
      router.push("/login")
      return
    }

    setIsJoining(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsJoining(false)
    setHasJoined(true)
    setIsJoinDialogOpen(false)
    toast.success("Successfully joined the event!")
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.name,
        text: event.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" priority />
              <div className="absolute left-4 top-4">
                <Badge className="bg-primary/90 backdrop-blur-sm capitalize">{event.category}</Badge>
              </div>
              {event.status !== "open" && (
                <div className="absolute right-4 top-4">
                  <Badge variant="destructive" className="capitalize">
                    {event.status}
                  </Badge>
                </div>
              )}
            </div>

            {/* Event Title & Quick Info */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{event.name}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {eventDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {event.time}
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">About this event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            <Separator />

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm text-muted-foreground">{event.address}</p>
                </div>
              </div>
              <div className="mt-4 aspect-[16/9] rounded-xl bg-muted overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(event.address)}`}
                />
              </div>
            </div>

            <Separator />

            {/* Participants */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Participants ({event.currentParticipants}/{event.maxParticipants})
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {event.participants.slice(0, 5).map((participant, i) => (
                    <Avatar key={i} className="border-2 border-background h-10 w-10">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{participant.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.currentParticipants > 5 && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-sm font-medium">
                      +{event.currentParticipants - 5}
                    </div>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {spotsLeft > 0 ? `${spotsLeft} spots left` : "No spots left"}
                </span>
              </div>
            </div>

            <Separator />

            {/* Host Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Host Reviews</h2>
                {hasAttended && <ReviewForm eventId={event.id} hostId={event.hostId} hostName={event.host.fullName} />}
              </div>
              {hostReviews.length > 0 ? (
                <div className="space-y-4">
                  {hostReviews.map((review) => (
                    <GlowCard key={review.id} className="p-4">
                      <div className="flex items-start gap-3">
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
                          <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </GlowCard>
                  ))}
                </div>
              ) : (
                <GlowCard className="text-center py-8">
                  <Star className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-muted-foreground">No reviews yet</p>
                </GlowCard>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <GlowCard>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {event.fee > 0 ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">${event.fee}</span>
                          <span className="text-muted-foreground">/ person</span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-primary">Free</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">{event.host.rating}</span>
                      <span className="text-sm text-muted-foreground">({event.host.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.currentParticipants} joined · {spotsLeft} spots left
                    </span>
                  </div>

                  {hasJoined ? (
                    <Button className="w-full" variant="secondary" disabled>
                      <Check className="mr-2 h-4 w-4" />
                      You're In!
                    </Button>
                  ) : isPast ? (
                    <Button className="w-full" disabled>
                      Event has ended
                    </Button>
                  ) : isFull ? (
                    <Button className="w-full" disabled>
                      Event is full
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={() => setIsJoinDialogOpen(true)}>
                      Join Event {event.fee > 0 && `· $${event.fee}`}
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setIsSaved(!isSaved)
                        toast.success(isSaved ? "Removed from saved" : "Saved to your list")
                      }}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </GlowCard>

              {/* Host Card */}
              <GlowCard>
                <h3 className="font-semibold mb-4">Meet your host</h3>
                <Link href={`/profile/${event.host.id}`} className="group">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={event.host.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{event.host.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">{event.host.fullName}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span>{event.host.rating} rating</span>
                        <span>·</span>
                        <span>{event.host.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {event.host.bio && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{event.host.bio}</p>}
                <Link href={`/profile/${event.host.id}`}>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Profile
                  </Button>
                </Link>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>

      {/* Join Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your booking</DialogTitle>
            <DialogDescription>You're about to join "{event.name}"</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Event fee</span>
              <span className="font-medium">{event.fee > 0 ? `$${event.fee}` : "Free"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Date</span>
              <span className="font-medium">
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Time</span>
              <span className="font-medium">{event.time}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{event.fee > 0 ? `$${event.fee}` : "Free"}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleJoin} disabled={isJoining}>
              {isJoining ? "Processing..." : "Confirm & Join"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
