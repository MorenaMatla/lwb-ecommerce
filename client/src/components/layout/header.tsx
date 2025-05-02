import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BellIcon, UserIcon, Settings, LogOut } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [notificationsCount] = useState(3);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  const initials = user ? getInitials(user.fullName || user.username) : "U";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard">
            <h1 className="text-xl font-bold cursor-pointer">IWB</h1>
          </Link>
          {user?.role && (
            <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-600 capitalize">
              {user.role}
            </span>
          )}
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-2 md:mr-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
            >
              <BellIcon className="h-5 w-5" />
              {notificationsCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary text-white">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block">{user?.fullName || user?.username.split('@')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
