"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Upload, User, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/glow-card"
import { useAuth } from "@/lib/auth-context"
import { interestOptions } from "@/lib/mock-data"
import { toast } from "sonner"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    location: "",
    interests: [] as string[],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        bio: user.bio || "",
        location: user.location || "",
        interests: user.interests || [],
      })
      setImagePreview(user.avatar || null)
    } else {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))

    updateUser({
      fullName: formData.fullName,
      bio: formData.bio,
      location: formData.location,
      interests: formData.interests,
      avatar: imagePreview || undefined,
    })

    setIsSubmitting(false)
    toast.success("Profile updated successfully!")
    router.push(`/profile/${user.id}`)
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Edit <span className="gradient-text">Profile</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Update your profile information and interests</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <GlowCard>
            <Label className="text-base font-semibold">Profile Photo</Label>
            <div className="mt-4 flex items-center gap-6">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-muted">
                {imagePreview ? (
                  <Image src={imagePreview || "/placeholder.svg"} alt="Profile preview" fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="cursor-pointer">
                  <Button type="button" variant="outline" className="gap-2 bg-transparent" asChild>
                    <span>
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </GlowCard>

          {/* Basic Info */}
          <GlowCard>
            <Label className="text-base font-semibold">Basic Information</Label>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, State"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others about yourself..."
                  className="min-h-[120px]"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">{formData.bio.length}/500 characters</p>
              </div>
            </div>
          </GlowCard>

          {/* Interests */}
          <GlowCard>
            <Label className="text-base font-semibold">Interests</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Select your interests to help find events and connect with others
            </p>

            {formData.interests.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="default"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {interestOptions
                .filter((i) => !formData.interests.includes(i))
                .map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
            </div>
          </GlowCard>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
