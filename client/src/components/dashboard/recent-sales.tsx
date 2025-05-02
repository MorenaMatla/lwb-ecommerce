import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  MemoryIcon, 
  HardDriveIcon, 
  MicrochipIcon 
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface Sale {
  id: number;
  productName: string;
  productDescription: string;
  productIcon: string;
  customer: string;
  date: string;
  amount: number;
  status: "completed" | "in_progress" | "pending";
}

export default function RecentSales() {
  const { data = [], isLoading } = useQuery<Sale[]>({
    queryKey: ["/api/sales/recent"],
    queryFn: async () => {
      const res = await fetch("/api/sales/recent");
      if (!res.ok) {
        throw new Error("Failed to fetch recent sales");
      }
      return res.json();
    }
  });

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "memory":
        return <MemoryIcon />;
      case "hdd":
        return <HardDriveIcon />;
      case "microchip":
        return <MicrochipIcon />;
      default:
        return <MemoryIcon />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="status-badge-completed">Completed</span>;
      case "in_progress":
        return <span className="status-badge-in-progress">In Progress</span>;
      case "pending":
        return <span className="status-badge-pending">Pending</span>;
      default:
        return <span className="status-badge-pending">Pending</span>;
    }
  };

  const getIconClass = (iconType: string) => {
    switch (iconType) {
      case "memory":
        return "bg-blue-100 text-blue-600";
      case "hdd":
        return "bg-red-100 text-red-600";
      case "microchip":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2 border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Sales</h3>
          <Link href="/sales" className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <span>Loading recent sales...</span>
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className={cn(
                          "h-8 w-8 rounded flex items-center justify-center",
                          getIconClass(sale.productIcon)
                        )}>
                          {getIcon(sale.productIcon)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{sale.productName}</p>
                          <p className="text-xs text-gray-500">{sale.productDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{sale.customer}</td>
                    <td className="px-4 py-3 text-sm">{sale.date}</td>
                    <td className="px-4 py-3 text-sm font-medium">M {sale.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {getStatusBadge(sale.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
