import { useState } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import StatsCard from "@/components/dashboard/stats-card";
import IncomeChart from "@/components/dashboard/income-chart";
import ProductChart from "@/components/dashboard/product-chart";
import RecentSales from "@/components/dashboard/recent-sales";
import RecentQueries from "@/components/dashboard/recent-queries";
import { Button } from "@/components/ui/button";
import { ChartIcon, RecycleIcon, UsersIcon, QuestionIcon } from "@/components/ui/icons";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  revenue: {
    value: number;
    change: number;
  };
  recycledComponents: {
    value: number;
    change: number;
  };
  activeClients: {
    value: number;
    change: number;
  };
  openQueries: {
    value: number;
    newToday: number;
  };
}

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("May 2025");

  const { data: stats = {
    revenue: { value: 0, change: 0 },
    recycledComponents: { value: 0, change: 0 },
    activeClients: { value: 0, change: 0 },
    openQueries: { value: 0, newToday: 0 }
  }, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }
      return res.json();
    }
  });

  return (
    <PageWrapper>
      {/* Dashboard Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="mt-2 md:mt-0 flex items-center space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{selectedMonth}</span>
            </Button>
            <Button className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Monthly Revenue"
            value={`M ${stats.revenue.value.toLocaleString()}`}
            change={{
              value: `${stats.revenue.change.toFixed(1)}% from last month`,
              isPositive: stats.revenue.change > 0
            }}
            icon={<ChartIcon className="h-5 w-5" />}
            iconColor="text-primary"
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Recycled Components"
            value={stats.recycledComponents.value.toLocaleString()}
            change={{
              value: `${stats.recycledComponents.change.toFixed(1)}% from last month`,
              isPositive: stats.recycledComponents.change > 0
            }}
            icon={<RecycleIcon className="h-5 w-5" />}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Active Clients"
            value={stats.activeClients.value.toString()}
            change={{
              value: `${stats.activeClients.change.toFixed(1)}% from last month`,
              isPositive: stats.activeClients.change > 0
            }}
            icon={<UsersIcon className="h-5 w-5" />}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Open Queries"
            value={stats.openQueries.value.toString()}
            change={{
              value: `${stats.openQueries.newToday} new today`,
              isPositive: false
            }}
            icon={<QuestionIcon className="h-5 w-5" />}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <IncomeChart />
        <ProductChart />
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RecentSales />
        <RecentQueries />
      </div>
    </PageWrapper>
  );
}
