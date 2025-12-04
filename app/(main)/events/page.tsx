"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Calendar, SlidersHorizontal, X, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { EventCard } from "@/components/event-card"
import { mockEvents, eventCategories } from "@/lib/mock-data"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all")

  const filteredEvents = useMemo(() => {
    let events = [...mockEvents]

    // Search filter
    if (searchQuery) {
      events = events.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Location filter
    if (location) {
      events = events.filter(
        (e) =>
          e.location.toLowerCase().includes(location.toLowerCase()) ||
          e.address.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      events = events.filter((e) => selectedCategories.includes(e.category))
    }

    // Price filter
    if (priceFilter === "free") {
      events = events.filter((e) => e.fee === 0)
    } else if (priceFilter === "paid") {
      events = events.filter((e) => e.fee > 0)
    }

    // Sort
    if (sortBy === "date") {
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sortBy === "price-low") {
      events.sort((a, b) => a.fee - b.fee)
    } else if (sortBy === "price-high") {
      events.sort((a, b) => b.fee - a.fee)
    } else if (sortBy === "participants") {
      events.sort((a, b) => b.currentParticipants - a.currentParticipants)
    }

    return events
  }, [searchQuery, location, selectedCategories, sortBy, priceFilter])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLocation("")
    setSelectedCategories([])
    setPriceFilter("all")
    setSortBy("date")
  }

  const hasActiveFilters = searchQuery || location || selectedCategories.length > 0 || priceFilter !== "all"

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore <span className="gradient-text">Events</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Discover and join exciting activities happening near you</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative sm:w-48">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="sm:w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (Soonest)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="participants">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 sm:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedCategories.length + (priceFilter !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Categories */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Categories</Label>
                    <div className="space-y-2">
                      {eventCategories.map((category) => (
                        <div key={category.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-${category.value}`}
                            checked={selectedCategories.includes(category.value)}
                            onCheckedChange={() => toggleCategory(category.value)}
                          />
                          <Label htmlFor={`mobile-${category.value}`} className="text-sm font-normal">
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Price</Label>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Events" },
                        { value: "free", label: "Free Events" },
                        { value: "paid", label: "Paid Events" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-price-${option.value}`}
                            checked={priceFilter === option.value}
                            onCheckedChange={() => setPriceFilter(option.value as typeof priceFilter)}
                          />
                          <Label htmlFor={`mobile-price-${option.value}`} className="text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Category Pills */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {eventCategories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategories.includes(category.value) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category.value)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
            <Select value={priceFilter} onValueChange={(v) => setPriceFilter(v as typeof priceFilter)}>
              <SelectTrigger className="w-32 h-8 rounded-full">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="paid">Paid Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {location && (
                <Badge variant="secondary" className="gap-1">
                  Location: {location}
                  <button onClick={() => setLocation("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1 capitalize">
                  {cat}
                  <button onClick={() => toggleCategory(cat)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {priceFilter !== "all" && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  {priceFilter}
                  <button onClick={() => setPriceFilter("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {filteredEvents.length} events</p>
        </div>

        {filteredEvents.length > 0 ? (
          <div
            className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No events found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters or search query</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
