"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MoreVertical, Eye, Shield, Star, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlowCard } from "@/components/glow-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { mockUsers, mockEvents } from "@/lib/mock-data"
import { toast } from "sonner"

export default function ManageHostsPage() {
  const { user: currentUser } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  if (currentUser?.role !== "admin") {
    return (
      <GlowCard className="text-center py-12">
        <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="font-semibold">Access Denied</h3>
        <p className="text-sm text-muted-foreground mt-1">You don't have permission to view this page</p>
      </GlowCard>
    )
  }

  const hosts = mockUsers.filter((u) => u.role === "host")
  const filteredHosts = hosts.filter(
    (host) =>
      host.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      host.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getHostStats = (hostId: string) => {
    const hostEvents = mockEvents.filter((e) => e.hostId === hostId)
    const totalRevenue = hostEvents.reduce((acc, e) => acc + e.fee * e.currentParticipants, 0)
    const totalParticipants = hostEvents.reduce((acc, e) => acc + e.currentParticipants, 0)
    return { events: hostEvents.length, revenue: totalRevenue, participants: totalParticipants }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Manage <span className="gradient-text">Hosts</span>
        </h1>
        <p className="text-muted-foreground">View and manage event hosts</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlowCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hosts.length}</p>
              <p className="text-sm text-muted-foreground">Total Hosts</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hosts.length}</p>
              <p className="text-sm text-muted-foreground">Verified Hosts</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {(hosts.reduce((acc, h) => acc + h.rating, 0) / hosts.length).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search hosts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Hosts Table */}
      <GlowCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Host</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHosts.map((host) => {
                const stats = getHostStats(host.id)
                return (
                  <TableRow key={host.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={host.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{host.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{host.fullName}</p>
                          <p className="text-sm text-muted-foreground">{host.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{host.rating}</span>
                        <span className="text-muted-foreground text-sm">({host.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{stats.events}</span>
                      </div>
                    </TableCell>
                    <TableCell>{stats.participants}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{stats.revenue}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/profile/${host.id}`} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            View Events
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive flex items-center gap-2"
                            onClick={() => toast.success("Host status revoked")}
                          >
                            <XCircle className="h-4 w-4" />
                            Revoke Host Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </GlowCard>
    </div>
  )
}
