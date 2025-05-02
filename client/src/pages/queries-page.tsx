import { useState } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QueryList from "@/components/queries/query-list";
import QueryForm from "@/components/queries/query-form";
import { useAuth } from "@/hooks/use-auth";

export default function QueriesPage() {
  const [activeTab, setActiveTab] = useState("list");
  const { user } = useAuth();
  const isSalesPerson = user?.role === 'sales';

  return (
    <PageWrapper>
      <Card className="border-none">
        <CardContent className="p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-6">
              <TabsTrigger value="list">Client Queries</TabsTrigger>
              <TabsTrigger value="form">Submit Query</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <QueryList />
            </TabsContent>
            <TabsContent value="form">
              <QueryForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
