import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import QueryDetails from "./query-details";

interface Query {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "completed" | "automated";
  createdAt: string;
  autoRepliedAt?: string;
  response?: string;
}

export default function QueryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQueryId, setSelectedQueryId] = useState<number | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const { toast } = useToast();

  const { data = [], isLoading } = useQuery<Query[]>({
    queryKey: ["/api/queries", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "all" 
        ? "/api/queries" 
        : `/api/queries?status=${statusFilter}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch queries");
      }
      return res.json();
    }
  });

  const filteredQueries = data.filter((query) =>
    query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsComplete = async (id: number) => {
    try {
      await apiRequest("PATCH", `/api/queries/${id}/complete`, {});
      queryClient.invalidateQueries({ queryKey: ["/api/queries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/queries/count/pending"] });
      toast({
        title: "Query completed",
        description: "Query has been marked as complete",
      });
    } catch (error) {
      toast({
        title: "Failed to update query",
        description: "An error occurred while updating the query",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (queryId: number) => {
    setSelectedQueryId(queryId);
    setIsViewDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "automated":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Automated</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h3 className="font-semibold text-xl">Client Queries</h3>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search queries..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="automated">Automated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <p>Loading queries...</p>
        </div>
      ) : filteredQueries.length === 0 ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-gray-500">No queries found</p>
            {searchTerm && (
              <p className="text-gray-400 text-sm mt-1">
                Try a different search term
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{query.name}</p>
                      <p className="text-xs text-gray-500">{query.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{query.subject}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {query.message}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(query.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(query.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(query.id)}
                      >
                        View
                      </Button>
                      {query.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => markAsComplete(query.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Query Details Dialog */}
      <QueryDetails
        queryId={selectedQueryId}
        isOpen={isViewDetailsOpen}
        onClose={() => setIsViewDetailsOpen(false)}
      />
    </div>
  );
}
