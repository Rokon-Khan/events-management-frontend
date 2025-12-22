"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowRightIcon,
  Calendar,
  Compass,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/events", label: "Explore Events", icon: Compass },
  ];

  const userLinks = user
    ? [
        ...(user.role === "HOST" || user.role === "ADMIN"
          ? [
              {
                href: "/dashboard/events/create",
                label: "Create Event",
                icon: Plus,
              },
            ]
          : []),
        {
          href: "/dashboard",
          label: user.role === "ADMIN" ? "Admin Dashboard" : "My Events",
          icon: LayoutDashboard,
        },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              {/* <Sparkles className="h-5 w-5 text-primary-foreground" /> */}
              <Image
                src="/event-hub-logo.png"
                alt="EventHub Logo"
                width={20}
                height={20}
              />
            </div>
            <span className="text-xl font-bold gradient-text">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  className="gap-2"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
            {user?.role === "USER" && (
              <Link href="/become-host">
                <Button
                  variant={isActive("/become-host") ? "secondary" : "ghost"}
                  className="gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Become a Host
                </Button>
              </Link>
            )}
            {userLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  className="gap-2"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.profilePhoto || "/placeholder.svg"}
                        alt={user.fullName}
                      />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.profilePhoto || "/placeholder.svg"}
                        alt={user.fullName}
                      />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {user.fullName}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={"/dashboard/profile/"}
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "USER" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/become-host"
                        className="flex items-center gap-2"
                      >
                        <Shield className="h-4 w-4" />
                        Become a Host
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/users"
                          className="flex items-center gap-2"
                        >
                          <Users className="h-4 w-4" />
                          Manage Users
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/events"
                          className="flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4" />
                          Manage Events
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link href="/login">
                  <Button variant="ghost">
                    Log in <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-linear-to-r from-blue-600 to-purple-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              {user?.role === "USER" && (
                <Link href="/become-host" onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive("/become-host") ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Become a Host
                  </Button>
                </Link>
              )}
              {userLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
