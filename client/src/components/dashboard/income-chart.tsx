import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

interface MonthlyIncome {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export default function IncomeChart() {
  const { data, isLoading } = useQuery<MonthlyIncome[]>({
    queryKey: ["/api/finance/income-statement"],
    queryFn: async () => {
      const res = await fetch("/api/finance/income-statement");
      if (!res.ok) {
        throw new Error("Failed to fetch income statement");
      }
      return res.json();
    },
    initialData: [
      { month: "Jan", revenue: 0, expenses: 0, profit: 0 },
      { month: "Feb", revenue: 0, expenses: 0, profit: 0 },
      { month: "Mar", revenue: 0, expenses: 0, profit: 0 },
    ],
  });

  const formatCurrency = (value: number) => {
    return `M ${value.toLocaleString()}`;
  };

  return (
    <Card className="col-span-1 lg:col-span-2 border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Monthly Income Statement</h3>
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
        <div className="h-64 w-full">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <span>Loading chart data...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `M ${value}`} />
                <Tooltip formatter={(value) => [`M ${value}`, ""]} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsla(var(--primary), 0.2)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--accent))"
                  fill="hsla(var(--accent), 0.2)"
                  name="Expenses"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(var(--chart-3))"
                  fill="hsla(var(--chart-3), 0.2)"
                  name="Net Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-primary mr-2"></span>
            <span>Revenue</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-accent mr-2"></span>
            <span>Expenses</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-success mr-2"></span>
            <span>Net Profit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
