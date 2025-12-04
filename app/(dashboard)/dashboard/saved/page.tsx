"use client"

import Link from "next/link"
import { Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/glow-card"
import { EventCard } from "@/components/event-card"
import { mockEvents } from "@/lib/mock-data"
import { toast } from "sonner"

export default function SavedEventsPage() {
  // Mock saved events (in real app, this would come from user data)
  const savedEvents = mockEvents.slice(0, 4)

  const handleRemove = (eventId: string) => {
    toast.success("Event removed from saved")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Saved <span className="gradient-text">Events</span>
        </h1>
        <p className="text-muted-foreground">Events you've saved for later</p>
      </div>

      {savedEvents.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedEvents.map((event) => (
            <div key={event.id} className="relative group">
              <EventCard event={event} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(event.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <GlowCard className="text-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-semibold">No saved events</h3>
          <p className="text-sm text-muted-foreground mt-1">Save events you're interested in to find them later</p>
          <Link href="/events">
            <Button className="mt-4">Browse Events</Button>
          </Link>
        </GlowCard>
      )}
    </div>
  )
}
