"use client"

import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/glow-card"
import { EventCard } from "@/components/event-card"
import { useAuth } from "@/lib/auth-context"
import { mockEvents } from "@/lib/mock-data"

export default function UpcomingEventsPage() {
  const { user } = useAuth()

  const upcomingEvents = mockEvents
    .filter(
      (e) => new Date(e.date) > new Date() && (e.participants.some((p) => p.id === user?.id) || e.hostId === user?.id),
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const groupedEvents = upcomingEvents.reduce(
    (acc, event) => {
      const date = new Date(event.date)
      const month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      if (!acc[month]) acc[month] = []
      acc[month].push(event)
      return acc
    },
    {} as Record<string, typeof upcomingEvents>,
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Upcoming <span className="gradient-text">Events</span>
          </h1>
          <p className="text-muted-foreground">Events you're attending soon</p>
        </div>
        <Link href="/events">
          <Button variant="outline" className="gap-2 bg-transparent">
            Find More Events <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Calendar View Hint */}
      <GlowCard className="p-4 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">You have {upcomingEvents.length} upcoming events</p>
          <p className="text-sm text-muted-foreground">Stay organized and never miss an event</p>
        </div>
        <Badge variant="outline">{upcomingEvents.length} Events</Badge>
      </GlowCard>

      {/* Grouped Events */}
      {Object.keys(groupedEvents).length > 0 ? (
        Object.entries(groupedEvents).map(([month, events]) => (
          <div key={month}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {month}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <GlowCard className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-semibold">No upcoming events</h3>
          <p className="text-sm text-muted-foreground mt-1">Join an event to see it here</p>
          <Link href="/events">
            <Button className="mt-4">Browse Events</Button>
          </Link>
        </GlowCard>
      )}
    </div>
  )
}
