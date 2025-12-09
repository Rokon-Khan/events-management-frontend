"use client";

import { GlowCard } from "@/components/glow-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth-context";
import { mockEvents, mockReviews } from "@/lib/mock-data";
import {
  ArrowRight,
  Calendar,
  DollarSign,
  Eye,
  Plus,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export function HostDashboard() {
  const { user } = useAuth();

  const hostedEvents = mockEvents.filter((e) => e.hostId === user?.id);
  const upcomingHosted = hostedEvents.filter(
    (e) => new Date(e.date) > new Date()
  );
  const totalRevenue = hostedEvents.reduce(
    (acc, e) => acc + e.fee * e.currentParticipants,
    0
  );
  const totalParticipants = hostedEvents.reduce(
    (acc, e) => acc + e.currentParticipants,
    0
  );
  const hostReviews = mockReviews.filter((r) => r.hostId === user?.id);

  const stats = [
    {
      label: "Total Events",
      value: hostedEvents.length,
      icon: Calendar,
      change: "+2 this month",
      trend: "up",
    },
    {
      label: "Total Participants",
      value: totalParticipants,
      icon: Users,
      change: "+18 this week",
      trend: "up",
    },
    {
      label: "Revenue",
      value: `$${totalRevenue}`,
      icon: DollarSign,
      change: "+12%",
      trend: "up",
    },
    {
      label: "Avg Rating",
      value: user?.rating || 0,
      icon: Star,
      change: `${hostReviews.length} reviews`,
      trend: "neutral",
    },
  ];

  const recentParticipants = mockEvents
    .filter((e) => e.hostId === user?.id)
    .flatMap((e) =>
      e.participants.map((p) => ({
        ...p,
        eventName: e.name,
        eventDate: e.date,
      }))
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Host <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your events and track performance
          </p>
        </div>
        <GlowCard className="px-3 py-2">
          <Link href="/dashboard/events/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </GlowCard>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <GlowCard key={stat.label} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge
                variant={stat.trend === "up" ? "default" : "secondary"}
                className="text-xs gap-1"
              >
                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <GlowCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Upcoming Events</h2>
            <Link href="/dashboard/my-events">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingHosted.length > 0 ? (
              upcomingHosted.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {event.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      {event.currentParticipants}/{event.maxParticipants}
                    </Badge>
                    <Link href={`/events/${event.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No upcoming events
                </p>
              </div>
            )}
          </div>
        </GlowCard>

        {/* Recent Reviews */}
        <GlowCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Reviews</h2>
            <Link href="/dashboard/reviews">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {hostReviews.length > 0 ? (
              hostReviews.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="flex gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={review.user.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {review.user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">
                        {review.user.fullName}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Star className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No reviews yet</p>
              </div>
            )}
          </div>
        </GlowCard>
      </div>

      {/* Recent Participants */}
      <GlowCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Recent Participants</h2>
          <Link href="/dashboard/participants">
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentParticipants.length > 0 ? (
                recentParticipants.map((participant, idx) => (
                  <TableRow key={`${participant.id}-${idx}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={participant.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {participant.fullName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {participant.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {participant.eventName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(participant.eventDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/profile/${participant.id}`}>
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No participants yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GlowCard>
    </div>
  );
}
