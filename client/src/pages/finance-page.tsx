import { useState } from "react";
import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { DownloadIcon, CalendarIcon } from "lucide-react";

interface IncomeStatement {
  id: number;
  month: string;
  year: number;
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  expenses: {
    salaries: number;
    transportation: number;
    advertising: number;
    rent: number;
    utilities: number;
    other: number;
  };
  operatingProfit: number;
  taxRate: number;
  netProfit: number;
}

interface MonthlyTrend {
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export default function FinancePage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const { user } = useAuth();
  const isFinance = user?.role === 'finance';
  const isInvestor = user?.role === 'investor';

  const { data: incomeStatement, isLoading: isLoadingStatement } = useQuery<IncomeStatement>({
    queryKey: ["/api/finance/income-statement", selectedYear, selectedMonth],
    queryFn: async () => {
      const res = await fetch(`/api/finance/income-statement?year=${selectedYear}&month=${selectedMonth}`);
      if (!res.ok) {
        throw new Error("Failed to fetch income statement");
      }
      return res.json();
    }
  });

  const { data: trends, isLoading: isLoadingTrends } = useQuery<MonthlyTrend[]>({
    queryKey: ["/api/finance/trends", selectedYear],
    queryFn: async () => {
      const res = await fetch(`/api/finance/trends?year=${selectedYear}`);
      if (!res.ok) {
        throw new Error("Failed to fetch financial trends");
      }
      return res.json();
    }
  });

  const years = Array.from({ length: 3 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatCurrency = (value: number) => {
    return `M ${value.toLocaleString()}`;
  };

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h3 className="font-semibold text-xl">Financial Reports</h3>
        <div className="flex items-center space-x-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Monthly Income Statement */}
      <Card className="mb-6 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Income Statement - {selectedMonth} {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingStatement ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading income statement...</p>
            </div>
          ) : (
            incomeStatement ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableBody>
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-medium">Revenue</TableCell>
                      <TableCell className="text-right">{formatCurrency(incomeStatement.revenue)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium pl-8">Cost of Goods Sold</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.costOfGoodsSold)})
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell>Gross Profit</TableCell>
                      <TableCell className="text-right">{formatCurrency(incomeStatement.grossProfit)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Operating Expenses</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Salaries</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.expenses.salaries)})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Transportation</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.expenses.transportation)})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Advertising</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.expenses.advertising)})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Rent</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.expenses.rent)})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Utilities</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.expenses.utilities)})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Other Expenses</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.expenses.other)})
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell>Operating Profit</TableCell>
                      <TableCell className="text-right">{formatCurrency(incomeStatement.operatingProfit)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-8">Tax ({incomeStatement.taxRate * 100}%)</TableCell>
                      <TableCell className="text-right text-destructive">
                        ({formatCurrency(incomeStatement.operatingProfit * incomeStatement.taxRate)})
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50 font-semibold text-lg">
                      <TableCell>Net Profit</TableCell>
                      <TableCell className="text-right">{formatCurrency(incomeStatement.netProfit)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <p>No data available for the selected period</p>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Financial Trends */}
      <Card className="mb-6 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Financial Trends - {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingTrends ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading trend data...</p>
            </div>
          ) : (
            trends && trends.length > 0 ? (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trends}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `M ${value / 1000}k`} />
                    <Tooltip formatter={(value) => [`M ${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      activeDot={{ r: 8 }}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="hsl(var(--accent))"
                      name="Expenses"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="hsl(var(--chart-3))"
                      name="Net Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <p>No trend data available for the selected year</p>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      {(isFinance || isInvestor) && (
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Financial Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Revenue Breakdown</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trends}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`M ${value.toLocaleString()}`, ""]} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Profit Margin Analysis</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trends?.map(item => ({
                        name: item.name,
                        profitMargin: ((item.profit / item.revenue) * 100).toFixed(1)
                      }))}
                      margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "Profit Margin"]} />
                      <Bar dataKey="profitMargin" fill="hsl(var(--chart-3))" name="Profit Margin %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  );
}
