import { Search, HelpCircle, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b bg- backdrop-blur-lg px-4 sm:px-12 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold">Loan Manager</h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop Search - Always visible on larger screens */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search borrowers..."
              className="pl-10 w-48 lg:w-64"
            />
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Help Button - Hidden on small screens */}
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Notification Button */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500" />
          </Button>

          {/* Mobile Menu Button - Only show on very small screens */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {isSearchOpen && (
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search borrowers..."
              className="pl-10 w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
