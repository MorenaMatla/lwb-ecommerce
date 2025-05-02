import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Query {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "pending" | "completed" | "automated";
  autoRepliedAt?: string;
}

export default function RecentQueries() {
  const { toast } = useToast();
  
  const { data = [], isLoading } = useQuery<Query[]>({
    queryKey: ["/api/queries/recent"],
    queryFn: async () => {
      const res = await fetch("/api/queries/recent");
      if (!res.ok) {
        throw new Error("Failed to fetch recent queries");
      }
      return res.json();
    }
  });

  const markAsComplete = async (id: number) => {
    try {
      await apiRequest("PATCH", `/api/queries/${id}/complete`, {});
      queryClient.invalidateQueries({ queryKey: ["/api/queries/recent"] });
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

  return (
    <Card className="border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Queries</h3>
          <Link href="/queries" className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <span>Loading recent queries...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <p>No recent queries</p>
            </div>
          ) : (
            data.map((query) => (
              <div key={query.id} className="border-b border-gray-100 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{query.name}</p>
                      <p className="text-xs text-gray-500">{query.email}</p>
                    </div>
                  </div>
                  <span className={
                    query.status === "pending" 
                      ? "status-badge-pending" 
                      : query.status === "automated" 
                        ? "status-badge-automated" 
                        : "status-badge-completed"
                  }>
                    {query.status === "pending" 
                      ? "Pending" 
                      : query.status === "automated" 
                        ? "Automated" 
                        : "Completed"}
                  </span>
                </div>
                <p className="text-sm mt-2">{query.message}</p>
                <div className={
                  query.status === "automated" 
                    ? "mt-2 flex items-center justify-between" 
                    : "mt-2 flex items-center justify-end space-x-2"
                }>
                  {query.status === "automated" ? (
                    <>
                      <p className="text-xs text-gray-500">
                        Auto-replied {query.autoRepliedAt}
                      </p>
                      <Button variant="link" size="sm" className="text-xs text-gray-500 hover:text-primary hover:underline">
                        View
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="link" size="sm" className="text-xs text-primary hover:underline">
                        Reply
                      </Button>
                      {query.status === "pending" && (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-xs text-gray-500 hover:text-primary hover:underline"
                          onClick={() => markAsComplete(query.id)}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
