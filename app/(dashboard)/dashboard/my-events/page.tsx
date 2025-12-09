"use client";

import { EventCard } from "@/components/event-card";
import { GlowCard } from "@/components/glow-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { mockEvents } from "@/lib/mock-data";
import {
  Calendar,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function MyEventsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  const isHost = user?.role === "HOST" || user?.role === "ADMIN";

  const myEvents = isHost
    ? mockEvents.filter((e) => e.hostId === user?.id)
    : mockEvents.filter((e) => e.participants.some((p) => p.id === user?.id));

  const upcomingEvents = myEvents.filter((e) => new Date(e.date) > new Date());
  const pastEvents = myEvents.filter((e) => new Date(e.date) <= new Date());

  const filteredUpcoming = upcomingEvents.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPast = pastEvents.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    toast.success("Event deleted successfully");
    setDeleteEventId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isHost ? "My Hosted Events" : "My Events"}
          </h1>
          <p className="text-muted-foreground">
            {isHost
              ? "Manage and track your hosted events"
              : "Events you've joined"}
          </p>
        </div>
        {isHost && (
          <Link href="/events/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming" className="gap-2">
            Upcoming{" "}
            <Badge variant="secondary">{filteredUpcoming.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            Past <Badge variant="secondary">{filteredPast.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {filteredUpcoming.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((event) => (
                <div key={event.id} className="relative group">
                  <EventCard event={event} />
                  {isHost && (
                    <div className="absolute top-3 right-3 z-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/events/${event.id}`}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/events/edit/${event.id}`}
                              className="flex items-center gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Participants ({event.currentParticipants})
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive flex items-center gap-2"
                            onClick={() => setDeleteEventId(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <GlowCard className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold">No upcoming events</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isHost
                  ? "Create your first event to get started"
                  : "Join an event to see it here"}
              </p>
              <Link href={isHost ? "/events/create" : "/events"}>
                <Button className="mt-4">
                  {isHost ? "Create Event" : "Browse Events"}
                </Button>
              </Link>
            </GlowCard>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {filteredPast.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPast.map((event) => (
                <div key={event.id} className="opacity-75">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <GlowCard className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold">No past events</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your completed events will appear here
              </p>
            </GlowCard>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteEventId}
        onOpenChange={() => setDeleteEventId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event and notify all participants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
