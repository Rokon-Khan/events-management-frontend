"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, Share2, Heart, Star, ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { GlowCard } from "@/components/glow-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { eventApi } from "@/lib/eventApi"
import type { Event } from "@/lib/types"
import { toast } from "sonner"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [params.id])

  const fetchEvent = async () => {
    try {
      const response = await eventApi.getEventById(params.id as string)
      if (response.success) {
        setEvent(response.data)
      } else {
        toast.error("Event not found")
      }
    } catch (error) {
      toast.error("Failed to load event")
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

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
  const hasAttended = false // Would need participant data from API

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to join events")
      router.push("/login")
      return
    }

    setIsJoining(true)
    try {
      const response = await eventApi.participateInEvent(event.id)
      if (response.success) {
        setHasJoined(true)
        setIsJoinDialogOpen(false)
        toast.success("Successfully joined the event!")
        fetchEvent() // Refresh event data
      } else {
        toast.error(response.message || "Failed to join event")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
    }
    setIsJoining(false)
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
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={event.eventImage || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
              <div className="absolute left-4 top-4">
                <Badge className="bg-primary/90 backdrop-blur-sm">{event.eventCategory}</Badge>
              </div>
              {event.status !== "OPEN" && (
                <div className="absolute right-4 top-4">
                  <Badge variant="destructive">
                    {event.status}
                  </Badge>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{event.title}</h1>
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

            <div>
              <h2 className="text-xl font-semibold mb-3">
                Participants ({event.currentParticipants}/{event.maxParticipants})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {spotsLeft > 0 ? `${spotsLeft} spots left` : "No spots left"}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Host Reviews</h2>
              <GlowCard className="text-center py-8">
                <Star className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground">No reviews yet</p>
              </GlowCard>
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
                      {event.joiningFee > 0 ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">${event.joiningFee}</span>
                          <span className="text-muted-foreground">/ person</span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-primary">Free</span>
                      )}
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
                      Join Event {event.joiningFee > 0 && `· $${event.joiningFee}`}
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

              <GlowCard>
                <h3 className="font-semibold mb-4">Meet your host</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={event.user.profilePhoto || "/placeholder.svg"} />
                    <AvatarFallback>{event.user.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{event.user.email}</p>
                  </div>
                </div>
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
            <DialogDescription>You're about to join "{event.title}"</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Event fee</span>
              <span className="font-medium">{event.joiningFee > 0 ? `$${event.joiningFee}` : "Free"}</span>
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
              <span>{event.joiningFee > 0 ? `$${event.joiningFee}` : "Free"}</span>
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
