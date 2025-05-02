import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  ChartIcon,
  MemoryIcon,
  CartIcon,
  MoneyIcon,
  QuestionIcon,
} from "@/components/ui/icons";
import { useQuery } from "@tanstack/react-query";

export default function MobileNav() {
  const [location] = useLocation();

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
      icon: <ChartIcon className="text-lg" />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <MemoryIcon className="text-lg" />,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: <CartIcon className="text-lg" />,
    },
    {
      name: "Finance",
      path: "/finance",
      icon: <MoneyIcon className="text-lg" />,
    },
    {
      name: "Queries",
      path: "/queries",
      icon: <QuestionIcon className="text-lg" />,
      badge: pendingQueries > 0 ? pendingQueries : undefined
    },
  ];

  return (
    <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-40">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center relative",
                isActive ? "text-primary" : "text-gray-600"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
              {item.badge && (
                <span className="absolute top-1 right-5 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
