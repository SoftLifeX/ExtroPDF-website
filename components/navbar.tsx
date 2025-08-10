"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            ExtroPDF
          </Link>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/pricing" className="hover:text-foreground/80">
              Pricing
            </Link>
            {user && (
              <Link href="/documents" className="hover:text-foreground/80">
                Documents
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden px-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              <Link href="/pricing" className="text-sm font-medium">
                Pricing
              </Link>
              {user && (
                <Link href="/documents" className="text-sm font-medium">
                  Documents
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile Logo */}
        <Link href="/" className="md:hidden text-xl font-bold">
          ExtroPDF
        </Link>

        {/* Right-side actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    {user.image ? (
                      <Image
                        src={user.image}
                        height={100}
                        width={100}
                        alt={user.name || "User"}
                      />
                    ) : (
                      <AvatarFallback>
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 cursor-pointer hover:text-red-700"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
