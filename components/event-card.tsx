"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlowCard } from "@/components/glow-card"
import type { Event, EventCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: Event
  className?: string
}

const categoryColors: Record<EventCategory, string> = {
  concert: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  sports: "bg-green-500/10 text-green-500 border-green-500/20",
  hiking: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  gaming: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  food: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  art: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  tech: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  music: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  wellness: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  social: "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

export function EventCard({ event, className }: EventCardProps) {
  const spotsLeft = event.maxParticipants - event.currentParticipants
  const isFull = spotsLeft <= 0

  return (
    <Link href={`/events/${event.id}`}>
      <GlowCard className={cn("group overflow-hidden p-0 cursor-pointer", className)}>
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute left-3 top-3">
            <Badge className={cn("border", categoryColors[event.category])}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
          </div>
          {isFull && (
            <div className="absolute right-3 top-3">
              <Badge variant="destructive">Full</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {event.name}
          </h3>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <Clock className="h-4 w-4 shrink-0 ml-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={event.host.avatar || "/placeholder.svg"} />
                <AvatarFallback>{event.host.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{event.host.fullName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {event.currentParticipants}/{event.maxParticipants}
                </span>
              </div>
              {event.fee > 0 ? (
                <div className="flex items-center gap-0.5 font-semibold text-primary">
                  <DollarSign className="h-4 w-4" />
                  <span>{event.fee}</span>
                </div>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </Link>
  )
}
