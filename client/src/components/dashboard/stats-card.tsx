import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    isPositive: boolean;
  };
  icon: ReactNode;
  iconColor: string;
  iconBgColor: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <Card className="border-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className={cn(
              "flex items-center text-sm mt-1",
              change.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-4 w-4 mr-1",
                  change.isPositive ? "rotate-0" : "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span>{change.value}</span>
            </p>
          </div>
          <div className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center",
            iconBgColor,
            iconColor
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
