import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package2Icon, 
  UserIcon, 
  CalendarIcon, 
  BanknoteIcon,
  Clock10Icon
} from "lucide-react";

interface SaleDetailsProps {
  saleId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SaleDetails({ saleId, isOpen, onClose }: SaleDetailsProps) {
  const { data: sale, isLoading } = useQuery({
    queryKey: ["/api/sales", saleId],
    queryFn: async () => {
      if (!saleId) return null;
      
      const res = await fetch(`/api/sales/${saleId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch sale details");
      }
      return res.json();
    },
    enabled: !!saleId && isOpen,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Sale Details</DialogTitle>
          <DialogDescription>
            Detailed information about this sale.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <p>Loading sale details...</p>
          </div>
        ) : !sale ? (
          <div className="flex items-center justify-center p-6">
            <p>Sale not found</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="border-none shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{sale.productName}</CardTitle>
                <CardDescription>{sale.productType}</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Package2Icon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Description</p>
                      <p className="text-gray-600">{sale.productDescription}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Customer</p>
                      <p className="text-gray-600">{sale.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Date</p>
                      <p className="text-gray-600">{formatDate(sale.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BanknoteIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Amount</p>
                      <p className="text-gray-600">M {sale.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Sales Person</p>
                      <p className="text-gray-600">{sale.salesPerson}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock10Icon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Status</p>
                      <div className="mt-1">{getStatusBadge(sale.status)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}