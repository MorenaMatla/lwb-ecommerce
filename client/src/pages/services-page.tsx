import { useState } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import ServiceForm from "@/components/services/service-form";
import ServiceDeleteDialog from "@/components/services/service-delete-dialog";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  status: "active" | "inactive";
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const { user } = useAuth();
  const isSalesPerson = user?.role === 'sales';

  const { data = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }
      return res.json();
    }
  });

  const filteredServices = data.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    setSelectedService(null);
    setIsAddServiceOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsEditServiceOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h3 className="font-semibold text-xl">Services</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search services..."
              className="w-full md:w-64 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isSalesPerson && (
            <Button onClick={handleAddService}>
              <PlusIcon className="h-4 w-4 mr-2" />
              <span>Add Service</span>
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">No services found</p>
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
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  {isSalesPerson && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>M {service.price.toLocaleString()}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={service.status === "active" 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-gray-100 text-gray-800 border-gray-200"}>
                        {service.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    {isSalesPerson && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditService(service)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteService(service)}
                          >
                            Delete
                          </Button>
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
        <>
          <ServiceForm 
            isOpen={isAddServiceOpen} 
            onClose={() => setIsAddServiceOpen(false)}
          />
          
          <ServiceForm 
            service={selectedService}
            isOpen={isEditServiceOpen} 
            onClose={() => setIsEditServiceOpen(false)}
          />
          
          <ServiceDeleteDialog 
            service={selectedService}
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
          />
        </>
      )}
    </PageWrapper>
  );
}
