import { Search, HelpCircle, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { useBorrowerStore } from "@/store/useBorrowerStore";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "AI Flag Detected",
    message: "Sarah Dunn: Income inconsistency detected",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "Document Requested",
    message: "Alan Matthews: Additional documents requested",
    time: "15 min ago",
    unread: true,
  },
  {
    id: "3",
    title: "Loan Approved",
    message: "Previous loan for Michael Johnson approved",
    time: "1 hour ago",
    unread: false,
  },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchTerm: setStoreSearchTerm } = useBorrowerStore();

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setStoreSearchTerm(value);
  };

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleHelpClick = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  return (
    <>
      <header className="border-b bg-background/80 backdrop-blur-lg px-4 sm:px-12 py-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold">DemoApp</h1>
          </div>

        {/* Mobile Search - Inline Expansion */}
        <div className={`md:hidden flex items-center ${isSearchOpen ? 'flex-1 ml-4' : 'hidden'}`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search borrowers..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
          </div>
          {/* Close search button - also clears search */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => {
              handleSearch("");
              setIsSearchOpen(false);
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

          {/* Right side - Actions */}
          <div className={`flex items-center space-x-2 sm:space-x-4 ${isSearchOpen ? 'hidden md:flex' : ''}`}>
            {/* Desktop Search - Right aligned with actions */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search borrowers..."
                className="pl-10 w-48 lg:w-80"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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

            {/* Help Button - Always visible */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleHelpClick}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Notification Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-bold min-w-[12px]">
                  {unreadCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Help & Support</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHelpOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium mb-2">Getting Started</h3>
                <p className="text-muted-foreground">
                  Select a borrower from the pipeline to view their details and
                  take actions like requesting documents or approving loans.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">AI Flags</h3>
                <p className="text-muted-foreground">
                  Red warning icons indicate potential issues detected by our AI
                  system. Review these carefully before approval.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Workflow Steps</h3>
                <p className="text-muted-foreground">
                  Track the progress of each loan through our 7-step onboarding
                  process in the broker overview panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {isNotificationsOpen && (
        <div className="fixed top-16 right-4 sm:right-12 bg-background border rounded-lg shadow-lg w-80 max-w-[calc(100vw-2rem)] z-40">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 hover:bg-accent cursor-pointer ${
                  notification.unread ? "bg-accent/30" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </>
  );
}