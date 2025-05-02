import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: "available" | "low_stock" | "out_of_stock";
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  image,
  status,
}: ProductCardProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "low_stock":
        return "bg-yellow-100 text-yellow-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "low_stock":
        return "Low Stock";
      case "out_of_stock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{name}</h4>
          <span className="text-primary font-semibold">M {price.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Stock: {stock} units</span>
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
            getStatusBadgeClass(status)
          )}>
            {getStatusLabel(status)}
          </span>
        </div>
      </div>
    </Card>
  );
}
