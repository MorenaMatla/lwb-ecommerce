import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ShoppingBag, Headphones, BarChart2, DollarSign, MessageSquare, User, LogOut } from "lucide-react";

// Footer component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">IWB Data Platform</h3>
            <p className="text-gray-400">Recycle. Innovate. Transform.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-4 md:mb-0">
            <div>
              <h4 className="font-semibold mb-2">Services</h4>
              <ul className="space-y-1">
                <li>Computer Recycling</li>
                <li>Component Sales</li>
                <li>E-Waste Disposal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Contact</li>
                <li>Sustainability</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <span className="cursor-pointer">Facebook</span>
              <span className="cursor-pointer">Twitter</span>
              <span className="cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
          © 2025 IWB. All rights reserved. Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
}

// Navigation item component
function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <li>
      <button 
        onClick={onClick}
        className={`flex items-center w-full space-x-3 p-2 rounded-md transition-colors ${
          active ? 'bg-primary text-white' : 'hover:bg-gray-200 text-gray-700'
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span>{label}</span>
      </button>
    </li>
  );
}

// Dashboard Footer Component - simpler than main footer
function DashboardFooter() {
  return (
    <div className="text-center py-4 text-sm text-gray-500 border-t">
      <p>© 2025 IWB Data Platform. All rights reserved.</p>
    </div>
  );
}

// Product Management Page
function ProductsPage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-gray-600">Manage your recycled computer components inventory</p>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border rounded-md w-80"
          />
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center">
          <span className="mr-2">+</span> Add New Product
        </button>
      </div>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">CPU Core i7 (Refurbished)</div>
                    <div className="text-sm text-gray-500">SKU: CPU-i7-REF-001</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Processors</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$120.00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">16GB DDR4 RAM</div>
                    <div className="text-sm text-gray-500">SKU: RAM-16GB-DDR4-002</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Memory</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$45.50</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">500GB SSD</div>
                    <div className="text-sm text-gray-500">SKU: SSD-500GB-003</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Storage</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$68.75</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sales Management Page
function SalesPage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sales</h1>
        <p className="text-gray-600">Track and manage your sales transactions</p>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option value="all">All Sales</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search sales..."
            className="px-4 py-2 border rounded-md w-80"
          />
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center">
          <span className="mr-2">+</span> New Sale
        </button>
      </div>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#ORD-001</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-sm text-gray-500">john.doe@example.com</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">CPU Core i7 (Refurbished)</div>
                <div className="text-sm text-gray-500">+ 2 more items</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$250.00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 25, 2025</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">View</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#ORD-002</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                <div className="text-sm text-gray-500">jane.smith@example.com</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">16GB DDR4 RAM</div>
                <div className="text-sm text-gray-500">+ 1 more item</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$115.25</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 28, 2025</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Services Management Page
function ServicesPage() {
  // State for managing services
  const [services, setServices] = useState([
    {
      id: 1,
      name: "E-Waste Collection",
      description: "Professional collection and responsible disposal of electronic waste from businesses and homes.",
      price: 50.00,
      unit: "pickup",
      status: "active"
    },
    {
      id: 2,
      name: "Computer Repair",
      description: "Expert repair services for desktop computers, laptops, and servers using recycled components where possible.",
      price: 75.00,
      unit: "hour",
      status: "active"
    },
    {
      id: 3,
      name: "Data Destruction",
      description: "Secure data wiping and physical destruction of storage media with certification.",
      price: 25.00,
      unit: "device",
      status: "active"
    }
  ]);
  
  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Handle edit button click
  const handleEditClick = (service: any) => {
    setCurrentService({...service});
    setIsEditModalOpen(true);
  };
  
  // Handle deactivate button click
  const handleStatusToggle = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? {...service, status: service.status === "active" ? "inactive" : "active"} 
        : service
    ));
  };
  
  // Handle save changes
  const handleSaveChanges = () => {
    if (!currentService) return;
    
    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ));
    
    setIsEditModalOpen(false);
    setCurrentService(null);
  };
  
  // Handle add new service
  const handleAddNewService = () => {
    const newId = Math.max(0, ...services.map(s => s.id)) + 1;
    const newService = {
      id: newId,
      name: "New Service",
      description: "Service description",
      price: 0,
      unit: "unit",
      status: "active"
    };
    
    setCurrentService(newService);
    setIsEditModalOpen(true);
  };
  
  // Filter services by search term
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="text-gray-600">Manage recycling and repair services</p>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search services..."
          className="instagram-input w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="instagram-gradient-btn"
          onClick={handleAddNewService}
        >
          <span className="mr-2">+</span> Add New Service
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <Card key={service.id} className="instagram-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{service.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold">${service.price.toFixed(2)} / {service.unit}</span>
                <span className={`px-2 py-1 ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs rounded-full`}>
                  {service.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex mt-4 justify-end">
                <button 
                  className="instagram-btn mr-2"
                  onClick={() => handleEditClick(service)}
                >
                  Edit
                </button>
                <button 
                  className={service.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}
                  onClick={() => handleStatusToggle(service.id)}
                >
                  {service.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {isEditModalOpen && currentService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentService.id ? 'Edit Service' : 'Add New Service'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input 
                  type="text" 
                  className="instagram-input"
                  value={currentService.name}
                  onChange={(e) => setCurrentService({...currentService, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="instagram-input"
                  rows={3}
                  value={currentService.description}
                  onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="instagram-input"
                    value={currentService.price}
                    onChange={(e) => setCurrentService({...currentService, price: parseFloat(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input 
                    type="text" 
                    className="instagram-input"
                    value={currentService.unit}
                    onChange={(e) => setCurrentService({...currentService, unit: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setCurrentService(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="instagram-gradient-btn"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Customer Queries Page
function QueriesPage() {
  // Sample queries data with state
  const [queries, setQueries] = useState([
    {
      id: 1,
      name: "Robert Johnson",
      email: "robert@example.com",
      subject: "Availability inquiry - Graphics Cards",
      message: "I'm interested in purchasing refurbished graphics cards for my gaming cafe. Do you have any NVIDIA RTX 3070 or 3080 models available? Looking for about 10-15 units.",
      date: "Apr 29, 2025",
      status: "pending"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      subject: "Bulk order request - Laptop Parts",
      message: "Our school is refurbishing 50 laptops for students. We need RAM, SSDs, and replacement keyboards. Can you provide a quote for bulk purchase?",
      date: "Apr 26, 2025",
      status: "responded"
    },
    {
      id: 3,
      name: "David Lee",
      email: "david@example.com",
      subject: "Return process - Defective Motherboard",
      message: "I purchased a refurbished motherboard last week and it's not working properly. It won't POST and shows debug code 55. What is your return policy?",
      date: "Apr 28, 2025",
      status: "pending"
    }
  ]);
  
  // State for filter and search
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for view/reply modal
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  
  // Handlers
  const handleViewQuery = (query: any) => {
    setSelectedQuery(query);
    setIsViewModalOpen(true);
  };
  
  const handleReplyQuery = (query: any) => {
    setSelectedQuery(query);
    setReplyMessage("");
    setIsReplyModalOpen(true);
  };
  
  const handleSendReply = () => {
    if (!selectedQuery || !replyMessage.trim()) return;
    
    // Update the query status in our state
    setQueries(queries.map(q => 
      q.id === selectedQuery.id 
        ? { ...q, status: "responded" } 
        : q
    ));
    
    // Close the modal
    setIsReplyModalOpen(false);
    setSelectedQuery(null);
    setReplyMessage("");
  };
  
  // Filter queries by status and search term
  const filteredQueries = queries.filter(query => {
    const matchesStatus = statusFilter === "all" || query.status === statusFilter;
    const matchesSearch = 
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Customer Queries</h1>
        <p className="text-gray-600">Manage and respond to customer inquiries</p>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <select 
            className="instagram-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Queries</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
          <input
            type="text"
            placeholder="Search queries..."
            className="instagram-input w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredQueries.map(query => (
              <tr key={query.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{query.name}</div>
                  <div className="text-sm text-gray-500">{query.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{query.subject}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{query.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${query.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : query.status === 'responded'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="instagram-btn mr-2"
                    onClick={() => handleReplyQuery(query)}
                  >
                    Reply
                  </button>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => handleViewQuery(query)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredQueries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No queries found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* View Query Modal */}
      {isViewModalOpen && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Query Details</h2>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{selectedQuery.subject}</h3>
                  <p className="text-sm text-gray-600">From: {selectedQuery.name} ({selectedQuery.email})</p>
                </div>
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${selectedQuery.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : selectedQuery.status === 'responded'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {selectedQuery.status.charAt(0).toUpperCase() + selectedQuery.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{selectedQuery.date}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-800 whitespace-pre-line">{selectedQuery.message}</p>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => {
                  setIsViewModalOpen(false);
                }}
              >
                Close
              </button>
              <button 
                className="instagram-gradient-btn"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleReplyQuery(selectedQuery);
                }}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reply Modal */}
      {isReplyModalOpen && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reply to Query</h2>
              <button 
                onClick={() => setIsReplyModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            
            <div className="border-b pb-4 mb-4">
              <div>
                <h3 className="font-bold text-gray-800">Re: {selectedQuery.subject}</h3>
                <p className="text-sm text-gray-600">To: {selectedQuery.name} ({selectedQuery.email})</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea 
                className="instagram-input"
                rows={6}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
              />
            </div>
            
            <div className="flex justify-between gap-2 mt-6">
              <div>
                <button
                  className="instagram-btn mr-2 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setReplyMessage(`Dear ${selectedQuery.name},\n\nThank you for your inquiry about ${selectedQuery.subject.toLowerCase()}. We appreciate your interest in our products.\n\nWe do have the items you're looking for in stock. Please let me know if you'd like to proceed with a purchase or if you have any other questions.\n\nBest regards,\nIWB Customer Support`);
                  }}
                >
                  Use Template
                </button>
              </div>
              <div>
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 mr-2"
                  onClick={() => {
                    setIsReplyModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="instagram-gradient-btn"
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Finance Page
function FinancePage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <p className="text-gray-600">View income statements and financial analytics</p>
      </header>
      
      <div className="flex items-center mb-6 gap-4">
        <select className="px-4 py-2 border rounded-md">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <select className="px-4 py-2 border rounded-md">
          <option value="4">April</option>
          <option value="3">March</option>
          <option value="2">February</option>
          <option value="1">January</option>
        </select>
        <button className="px-4 py-2 bg-primary text-white rounded-md">Generate Report</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$24,508</p>
            <p className="text-sm text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$16,230</p>
            <p className="text-sm text-red-500">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$8,278</p>
            <p className="text-sm text-green-500">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">33.8%</p>
            <p className="text-sm text-green-500">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Income Statement - April 2025</h2>
        <table className="min-w-full">
          <tbody>
            <tr className="border-b">
              <td className="py-3 text-left font-medium">Revenue</td>
              <td className="py-3 text-right">$24,508.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Product Sales</td>
              <td className="py-3 text-right">$18,350.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Services</td>
              <td className="py-3 text-right">$6,158.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left font-medium">Cost of Goods Sold</td>
              <td className="py-3 text-right">$10,250.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Components</td>
              <td className="py-3 text-right">$7,850.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Service Delivery</td>
              <td className="py-3 text-right">$2,400.00</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="py-3 text-left font-medium">Gross Profit</td>
              <td className="py-3 text-right font-medium">$14,258.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left font-medium">Operating Expenses</td>
              <td className="py-3 text-right">$5,980.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Salaries</td>
              <td className="py-3 text-right">$3,800.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Rent</td>
              <td className="py-3 text-right">$1,200.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Utilities</td>
              <td className="py-3 text-right">$450.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 text-left pl-6">Other Expenses</td>
              <td className="py-3 text-right">$530.00</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="py-3 text-left font-medium">Net Profit</td>
              <td className="py-3 text-right font-medium">$8,278.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dashboard Home Page
function DashboardHome() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to the IWB Data Platform</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">238</p>
            <p className="text-sm text-gray-500">Recycled components in inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$24,508</p>
            <p className="text-sm text-gray-500">Monthly revenue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-500">Open customer inquiries</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between border-b pb-2">
                <span>CPU Core i7 (Refurbished)</span>
                <span className="font-medium">$120.00</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>16GB DDR4 RAM</span>
                <span className="font-medium">$45.50</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>500GB SSD</span>
                <span className="font-medium">$68.75</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between border-b pb-2">
                <span>Availability inquiry - Graphics Cards</span>
                <span className="text-yellow-500">Pending</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Bulk order request - Laptop Parts</span>
                <span className="text-green-500">Completed</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Return process - Defective Motherboard</span>
                <span className="text-yellow-500">Pending</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Profile Page
function ProfilePage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </header>
      
      <div className="grid grid-cols-1 gap-6 max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                JD
              </div>
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-500">Administrator</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value="john.doe@iwb.com" 
                  className="w-full px-3 py-2 border rounded-md" 
                  readOnly 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value="John Doe" 
                  className="w-full px-3 py-2 border rounded-md" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input 
                  type="text" 
                  value="Administrator" 
                  className="w-full px-3 py-2 border rounded-md" 
                  readOnly 
                />
              </div>
              
              <div className="pt-4">
                <button className="bg-primary text-white px-4 py-2 rounded-md">
                  Update Profile
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded-md" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded-md" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded-md" 
                />
              </div>
              
              <div className="pt-4">
                <button className="bg-primary text-white px-4 py-2 rounded-md">
                  Change Password
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple Dashboard component with navigation
function SimpleDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Function to render the active page content
  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "products":
        return <ProductsPage />;
      case "sales":
        return <SalesPage />;
      case "services":
        return <ServicesPage />;
      case "queries":
        return <QueriesPage />;
      case "finance":
        return <FinancePage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="hidden md:flex flex-col w-64 bg-white border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">IWB Data Platform</h1>
            <p className="text-sm text-gray-500">Recycle. Innovate. Transform.</p>
          </div>
          
          <nav className="flex-grow p-4">
            <ul className="space-y-1">
              <NavItem 
                icon={<Home size={20} />} 
                label="Dashboard" 
                active={activePage === "dashboard"} 
                onClick={() => setActivePage("dashboard")}
              />
              <NavItem 
                icon={<ShoppingBag size={20} />} 
                label="Products" 
                active={activePage === "products"} 
                onClick={() => setActivePage("products")}
              />
              <NavItem 
                icon={<DollarSign size={20} />} 
                label="Sales" 
                active={activePage === "sales"} 
                onClick={() => setActivePage("sales")}
              />
              <NavItem 
                icon={<Headphones size={20} />} 
                label="Services" 
                active={activePage === "services"} 
                onClick={() => setActivePage("services")}
              />
              <NavItem 
                icon={<MessageSquare size={20} />} 
                label="Queries" 
                active={activePage === "queries"} 
                onClick={() => setActivePage("queries")}
              />
              <NavItem 
                icon={<BarChart2 size={20} />} 
                label="Finance" 
                active={activePage === "finance"} 
                onClick={() => setActivePage("finance")}
              />
            </ul>
            
            <div className="mt-8 pt-4 border-t">
              <ul className="space-y-1">
                <NavItem 
                  icon={<User size={20} />} 
                  label="Profile" 
                  active={activePage === "profile"} 
                  onClick={() => setActivePage("profile")}
                />
                <NavItem 
                  icon={<LogOut size={20} />} 
                  label="Logout" 
                  active={false} 
                  onClick={() => window.location.reload()}
                />
              </ul>
            </div>
          </nav>
        </div>
        
        {/* Mobile navigation - horizontal bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
          <div className="flex justify-around p-2">
            <button onClick={() => setActivePage("dashboard")} className={`p-2 rounded-full ${activePage === "dashboard" ? 'bg-primary text-white' : ''}`}>
              <Home size={24} />
            </button>
            <button onClick={() => setActivePage("products")} className={`p-2 rounded-full ${activePage === "products" ? 'bg-primary text-white' : ''}`}>
              <ShoppingBag size={24} />
            </button>
            <button onClick={() => setActivePage("sales")} className={`p-2 rounded-full ${activePage === "sales" ? 'bg-primary text-white' : ''}`}>
              <DollarSign size={24} />
            </button>
            <button onClick={() => setActivePage("queries")} className={`p-2 rounded-full ${activePage === "queries" ? 'bg-primary text-white' : ''}`}>
              <MessageSquare size={24} />
            </button>
            <button onClick={() => setActivePage("finance")} className={`p-2 rounded-full ${activePage === "finance" ? 'bg-primary text-white' : ''}`}>
              <BarChart2 size={24} />
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {renderPageContent()}
          </div>
          
          {/* Footer for dashboard */}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

// Auth Page Component
function AuthPageSimple({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">IWB Data Platform</h1>
            <p className="text-gray-600">Recycle. Innovate. Transform.</p>
          </div>
          
          <Card className="w-full">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="username"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="john.doe@iwb.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-primary hover:underline"
                  >
                    Don't have an account? Register
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Right side - Hero image & info (desktop only) */}
      <div className="hidden md:flex flex-1 bg-primary items-center justify-center p-10">
        <div className="max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-4">E-Waste Recycling Specialists</h2>
          <p className="mb-6">
            IWB is a leading company in Southern Africa specializing in the recycling 
            of computer parts. Our platform helps you manage inventory, track sales, 
            and monitor financial performance.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track recycled computer parts inventory
            </li>
            <li className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Generate monthly income statements
            </li>
            <li className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Manage customer queries with automated responses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Simple implementation to show content
function App() {
  // For demo, always show the auth page first
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isLoggedIn ? (
        /* Login page with footer */
        <>
          <div className="flex-grow">
            <AuthPageSimple onLogin={handleLogin} />
            {/* Temporary login button for testing */}
            <div className="fixed top-2 right-2">
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Demo Login
              </button>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        /* Dashboard doesn't need external footer as it has its own layout */
        <div className="dashboard-container h-screen">
          <SimpleDashboard />
        </div>
      )}
    </div>
  );
}

export default App;
