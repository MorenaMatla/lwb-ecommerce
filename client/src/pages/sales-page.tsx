import { useState } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, PlusIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import SalesForm from "@/components/sales/sales-form";
import SaleDetails from "@/components/sales/sale-details";
import SaleUpdateForm from "@/components/sales/sale-update-form";
import { formatDate } from "@/lib/utils";

interface Sale {
  id: number;
  productName: string;
  productType: string;
  customer: string;
  date: string;
  amount: number;
  status: "completed" | "in_progress" | "pending";
  salesPerson: string;
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  
  const { user } = useAuth();
  const isSalesPerson = user?.role === 'sales';

  const { data = [], isLoading } = useQuery<Sale[]>({
    queryKey: ["/api/sales", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "all" 
        ? "/api/sales" 
        : `/api/sales?status=${statusFilter}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch sales");
      }
      return res.json();
    }
  });

  const filteredSales = data.filter((sale) =>
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.salesPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleViewDetails = (saleId: number) => {
    setSelectedSaleId(saleId);
    setIsViewDetailsOpen(true);
  };

  const handleUpdateStatus = (saleId: number) => {
    setSelectedSaleId(saleId);
    setIsUpdateStatusOpen(true);
  };

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h3 className="font-semibold text-xl">Sales Records</h3>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search sales..."
              className="w-full md:w-64 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          {isSalesPerson && (
            <Button onClick={() => setIsAddSaleOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              <span>New Sale</span>
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading sales records...</p>
            </div>
          ) : filteredSales.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">No sales records found</p>
                {searchTerm && (
                  <p className="text-gray-400 text-sm mt-1">
                    Try a different search term
                  </p>
                )}
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Sales Person</TableHead>
                  <TableHead>Status</TableHead>
                  {isSalesPerson && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{sale.productName}</p>
                        <p className="text-xs text-gray-500">{sale.productType}</p>
                      </div>
                    </TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{formatDate(sale.date)}</TableCell>
                    <TableCell>M {sale.amount.toLocaleString()}</TableCell>
                    <TableCell>{sale.salesPerson}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    {isSalesPerson && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(sale.id)}
                          >
                            View
                          </Button>
                          {sale.status !== "completed" && (
                            <Button 
                              size="sm"
                              onClick={() => handleUpdateStatus(sale.id)}
                            >
                              Update
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Forms and Dialogs */}
      {isSalesPerson && (
        <SalesForm 
          isOpen={isAddSaleOpen} 
          onClose={() => setIsAddSaleOpen(false)}
          salesPersonName={user?.fullName || ""}
        />
      )}

      <SaleDetails
        saleId={selectedSaleId}
        isOpen={isViewDetailsOpen}
        onClose={() => setIsViewDetailsOpen(false)}
      />

      {isSalesPerson && (
        <SaleUpdateForm
          saleId={selectedSaleId}
          isOpen={isUpdateStatusOpen}
          onClose={() => setIsUpdateStatusOpen(false)}
        />
      )}
    </PageWrapper>
  );
}
