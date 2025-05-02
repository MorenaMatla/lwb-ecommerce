import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  ChartIcon,
  MemoryIcon,
  ToolsIcon,
  CartIcon,
  MoneyIcon,
  QuestionIcon,
} from "@/components/ui/icons";
import { useQuery } from "@tanstack/react-query";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  isOnline: boolean;
}

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
    queryFn: async () => {
      const res = await fetch("/api/team-members");
      if (!res.ok) {
        throw new Error("Failed to fetch team members");
      }
      return res.json();
    },
    initialData: [] // Start with empty array until data is loaded
  });

  const { data: pendingQueries } = useQuery<number>({
    queryKey: ["/api/queries/count/pending"],
    queryFn: async () => {
      const res = await fetch("/api/queries/count/pending");
      if (!res.ok) {
        throw new Error("Failed to fetch pending queries count");
      }
      return res.json();
    },
    initialData: 0
  });

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <ChartIcon className="w-5 mr-3" />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <MemoryIcon className="w-5 mr-3" />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <ToolsIcon className="w-5 mr-3" />,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: <CartIcon className="w-5 mr-3" />,
    },
    {
      name: "Finance",
      path: "/finance",
      icon: <MoneyIcon className="w-5 mr-3" />,
    },
    {
      name: "Client Queries",
      path: "/queries",
      icon: <QuestionIcon className="w-5 mr-3" />,
      badge: pendingQueries > 0 ? pendingQueries : undefined
    },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 pt-6 h-full">
      <nav>
        <div className="px-4 mb-4">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-3 h-4 w-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg",
                  isActive
                    ? "bg-blue-50 text-primary"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        
        {user?.role === "sales" || user?.role === "developer" ? (
          <div className="mt-6 px-4">
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-xs uppercase text-gray-500 font-semibold mb-3">
                Team Members
              </h4>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-medium">
                      {member.initials}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <div 
                      className={cn(
                        "ml-auto h-2 w-2 rounded-full", 
                        member.isOnline ? "bg-green-400" : "bg-gray-300"
                      )} 
                      title={member.isOnline ? "Online" : "Offline"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </aside>
  );
}
