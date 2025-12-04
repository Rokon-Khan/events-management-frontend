"use client"

import Link from "next/link"
import { Calendar, Star, ArrowRight, CalendarCheck, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/glow-card"
import { EventCard } from "@/components/event-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { mockEvents } from "@/lib/mock-data"

export function UserDashboard() {
  const { user } = useAuth()

  const upcomingEvents = mockEvents
    .filter((e) => new Date(e.date) > new Date() && e.participants.some((p) => p.id === user?.id))
    .slice(0, 3)

  const pastEvents = mockEvents.filter(
    (e) => new Date(e.date) < new Date() && e.participants.some((p) => p.id === user?.id),
  )

  const stats = [
    { label: "Events Joined", value: 12, icon: CalendarCheck, change: "+3 this month" },
    { label: "Saved Events", value: 8, icon: Heart, change: "+2 this week" },
    { label: "Reviews Given", value: 6, icon: Star, change: "4.8 avg rating" },
    { label: "Hours Spent", value: 48, icon: Clock, change: "In activities" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, <span className="gradient-text">{user?.fullName?.split(" ")[0]}</span>
        </h1>
        <p className="text-muted-foreground">Here's what's happening with your events</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <GlowCard key={stat.label} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Activity Progress */}
      <GlowCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="font-semibold text-lg">Monthly Activity Goal</h2>
            <p className="text-sm text-muted-foreground">You're doing great! Keep it up.</p>
          </div>
          <Badge variant="outline" className="w-fit">
            8 of 10 events
          </Badge>
        </div>
        <Progress value={80} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">2 more events to reach your monthly goal</p>
      </GlowCard>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Link href="/dashboard/upcoming">
            <Button variant="ghost" className="gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
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

      {/* Recommended Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Link href="/events">
            <Button variant="ghost" className="gap-1">
              Explore <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
