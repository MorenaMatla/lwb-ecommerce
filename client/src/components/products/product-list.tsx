import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "./product-card";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: "available" | "low_stock" | "out_of_stock";
  category: string;
}

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    }
  });

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h3 className="font-semibold text-xl">Product Catalog</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-64 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-gray-500">No products found</p>
            {searchTerm && (
              <p className="text-gray-400 text-sm mt-1">
                Try a different search term
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              image={product.image}
              status={product.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
