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
  UserIcon, 
  CalendarIcon, 
  MailIcon,
  MessageSquareTextIcon,
  ClockIcon
} from "lucide-react";

interface QueryDetailsProps {
  queryId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QueryDetails({ queryId, isOpen, onClose }: QueryDetailsProps) {
  const { data: query, isLoading } = useQuery({
    queryKey: ["/api/queries", queryId],
    queryFn: async () => {
      if (!queryId) return null;
      
      const res = await fetch(`/api/queries/${queryId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch query details");
      }
      return res.json();
    },
    enabled: !!queryId && isOpen,
  });

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Query Details</DialogTitle>
          <DialogDescription>
            Detailed information about this client query.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <p>Loading query details...</p>
          </div>
        ) : !query ? (
          <div className="flex items-center justify-center p-6">
            <p>Query not found</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="border-none shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{query.subject}</CardTitle>
                <CardDescription>{getStatusBadge(query.status)}</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">From</p>
                      <p className="text-gray-600">{query.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <p className="text-gray-600">{query.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">Date</p>
                      <p className="text-gray-600">{formatDate(query.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MessageSquareTextIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Message</p>
                      <p className="text-gray-600 whitespace-pre-wrap">{query.message}</p>
                    </div>
                  </div>
                  
                  {query.status === "automated" && query.response && (
                    <div className="flex items-start gap-2">
                      <ClockIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Automated Response</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{query.response}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Sent on {query.autoRepliedAt ? formatDate(query.autoRepliedAt) : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}