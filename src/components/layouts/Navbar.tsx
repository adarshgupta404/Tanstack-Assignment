"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="group relative text-2xl font-bold text-primary hover:text-primary/80 transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10">PupilsApp</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/pupils">Pupils</NavLink>
          <NavLink to="/pupils/add">Add Pupil</NavLink>
          <ThemeToggle
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </nav>

        <Button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          variant="ghost"
          size="sm"
          className="md:hidden p-2 h-9 w-9 rounded-full hover:bg-accent transition-all duration-300 relative"
        >
          <Menu
            className={cn(
              "h-4 w-4 transition-all duration-300",
              isMobileMenuOpen && "rotate-90 scale-0"
            )}
          />
          <X
            className={cn(
              "absolute top-2 left-2 h-4 w-4 transition-all duration-300 rotate-90 scale-0",
              isMobileMenuOpen && "rotate-0 scale-100"
            )}
          />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t bg-background/95 backdrop-blur-md",
          isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          <MobileNavLink
            to="/pupils"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pupils
          </MobileNavLink>
          <MobileNavLink
            to="/pupils/add"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add Pupil
          </MobileNavLink>
          <div className="pt-2 border-t">
            <ThemeToggle
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-accent/50 group"
      activeProps={{
        className: "text-primary bg-accent/30",
      }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}

function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-accent/50 border border-transparent hover:border-border/50"
      activeProps={{
        className: "text-primary bg-accent/30 border-primary/20",
      }}
    >
      {children}
    </Link>
  );
}
