import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";

interface ProductCategory {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export default function ProductChart() {
  const { data, isLoading } = useQuery<ProductCategory[]>({
    queryKey: ["/api/products/categories"],
    queryFn: async () => {
      const res = await fetch("/api/products/categories");
      if (!res.ok) {
        throw new Error("Failed to fetch product categories");
      }
      return res.json();
    },
    initialData: [
      { name: "RAM Modules", value: 0, percentage: 0, color: "hsl(var(--primary))" },
      { name: "Hard Drives", value: 0, percentage: 0, color: "hsl(var(--accent))" },
      { name: "Motherboards", value: 0, percentage: 0, color: "hsl(var(--chart-3))" },
    ],
  });

  const totalItems = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Product Categories</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-gray-500 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-64 w-full relative">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <span>Loading chart data...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.percentage}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} units`, name]} 
                  labelFormatter={() => ""}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-lg font-bold">{totalItems}</div>
          </div>
        </div>
        <div className="space-y-2 mt-4 text-sm">
          {data.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></span>
                <span>{category.name}</span>
              </div>
              <span>{category.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
