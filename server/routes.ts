import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { setupQueryService } from "./services/query-service";
import { setupBackupService } from "./services/backup-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication middleware and routes
  const { 
    requireSalesRole, 
    requireFinanceRole, 
    requireDeveloperRole,
    requireInvestorRole,
    requireSalesOrFinanceRole,
    requireFinanceOrInvestorRole
  } = setupAuth(app);

  // Set up services
  const queryService = setupQueryService();
  setupBackupService();

  // API Routes
  // ==========

  // Team Members
  app.get("/api/team-members", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Dashboard
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard statistics" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", requireSalesRole, async (req, res) => {
    try {
      const newProduct = await storage.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", requireSalesRole, async (req, res) => {
    try {
      const updatedProduct = await storage.updateProduct(parseInt(req.params.id), req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", requireSalesRole, async (req, res) => {
    try {
      const success = await storage.deleteProduct(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  app.get("/api/products/categories", async (req, res) => {
    try {
      const categories = await storage.getProductCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching product categories:", error);
      res.status(500).json({ message: "Failed to fetch product categories" });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getServiceById(parseInt(req.params.id));
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post("/api/services", requireSalesRole, async (req, res) => {
    try {
      const newService = await storage.createService(req.body);
      res.status(201).json(newService);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put("/api/services/:id", requireSalesRole, async (req, res) => {
    try {
      const updatedService = await storage.updateService(parseInt(req.params.id), req.body);
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(updatedService);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", requireSalesRole, async (req, res) => {
    try {
      const success = await storage.deleteService(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Sales
  app.get("/api/sales", requireSalesOrFinanceRole, async (req, res) => {
    try {
      let sales;
      if (req.query.status) {
        sales = await storage.getSalesByStatus(req.query.status as string);
      } else {
        sales = await storage.getAllSales();
      }
      res.json(sales);
    } catch (error) {
      console.error("Error fetching sales:", error);
      res.status(500).json({ message: "Failed to fetch sales records" });
    }
  });

  app.get("/api/sales/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const recentSales = await storage.getRecentSales(limit);
      res.json(recentSales);
    } catch (error) {
      console.error("Error fetching recent sales:", error);
      res.status(500).json({ message: "Failed to fetch recent sales" });
    }
  });

  app.get("/api/sales/:id", requireSalesOrFinanceRole, async (req, res) => {
    try {
      const sale = await storage.getSaleById(parseInt(req.params.id));
      if (!sale) {
        return res.status(404).json({ message: "Sale record not found" });
      }
      res.json(sale);
    } catch (error) {
      console.error("Error fetching sale:", error);
      res.status(500).json({ message: "Failed to fetch sale record" });
    }
  });

  app.post("/api/sales", requireSalesRole, async (req, res) => {
    try {
      const newSale = await storage.createSale(req.body);
      res.status(201).json(newSale);
    } catch (error) {
      console.error("Error creating sale:", error);
      res.status(500).json({ message: "Failed to create sale record" });
    }
  });

  app.put("/api/sales/:id", requireSalesRole, async (req, res) => {
    try {
      const updatedSale = await storage.updateSale(parseInt(req.params.id), req.body);
      if (!updatedSale) {
        return res.status(404).json({ message: "Sale record not found" });
      }
      res.json(updatedSale);
    } catch (error) {
      console.error("Error updating sale:", error);
      res.status(500).json({ message: "Failed to update sale record" });
    }
  });

  // Finance
  app.get("/api/finance/income-statement", requireFinanceOrInvestorRole, async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
      const month = req.query.month as string || new Date().toLocaleString('default', { month: 'long' });
      
      const incomeStatement = await storage.getIncomeStatement(year, month);
      res.json(incomeStatement);
    } catch (error) {
      console.error("Error fetching income statement:", error);
      res.status(500).json({ message: "Failed to fetch income statement" });
    }
  });

  app.get("/api/finance/trends", requireFinanceOrInvestorRole, async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
      const trends = await storage.getFinancialTrends(year);
      res.json(trends);
    } catch (error) {
      console.error("Error fetching financial trends:", error);
      res.status(500).json({ message: "Failed to fetch financial trends" });
    }
  });

  app.get("/api/finance/expense-breakdown", requireFinanceOrInvestorRole, async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
      const month = req.query.month as string || new Date().toLocaleString('default', { month: 'long' });
      
      const expenseBreakdown = await storage.getExpenseBreakdown(year, month);
      res.json(expenseBreakdown);
    } catch (error) {
      console.error("Error fetching expense breakdown:", error);
      res.status(500).json({ message: "Failed to fetch expense breakdown" });
    }
  });

  // Client Queries
  app.get("/api/queries", requireSalesRole, async (req, res) => {
    try {
      let queries;
      if (req.query.status) {
        queries = await storage.getQueriesByStatus(req.query.status as string);
      } else {
        queries = await storage.getAllQueries();
      }
      res.json(queries);
    } catch (error) {
      console.error("Error fetching queries:", error);
      res.status(500).json({ message: "Failed to fetch client queries" });
    }
  });

  app.get("/api/queries/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 2;
      const recentQueries = await storage.getRecentQueries(limit);
      res.json(recentQueries);
    } catch (error) {
      console.error("Error fetching recent queries:", error);
      res.status(500).json({ message: "Failed to fetch recent queries" });
    }
  });

  app.get("/api/queries/count/pending", async (req, res) => {
    try {
      const count = await storage.countPendingQueries();
      res.json(count);
    } catch (error) {
      console.error("Error counting pending queries:", error);
      res.status(500).json({ message: "Failed to count pending queries" });
    }
  });

  app.get("/api/queries/:id", requireSalesRole, async (req, res) => {
    try {
      const query = await storage.getQueryById(parseInt(req.params.id));
      if (!query) {
        return res.status(404).json({ message: "Query not found" });
      }
      res.json(query);
    } catch (error) {
      console.error("Error fetching query:", error);
      res.status(500).json({ message: "Failed to fetch query" });
    }
  });

  app.post("/api/queries", async (req, res) => {
    try {
      // Process the query with the query service
      const processedQuery = await queryService.processQuery(req.body);
      
      // Save the query with the appropriate status
      const newQuery = await storage.createQuery(processedQuery);
      
      res.status(201).json(newQuery);
    } catch (error) {
      console.error("Error submitting query:", error);
      res.status(500).json({ message: "Failed to submit query" });
    }
  });

  app.patch("/api/queries/:id/complete", requireSalesRole, async (req, res) => {
    try {
      const updatedQuery = await storage.updateQueryStatus(parseInt(req.params.id), "completed");
      if (!updatedQuery) {
        return res.status(404).json({ message: "Query not found" });
      }
      res.json(updatedQuery);
    } catch (error) {
      console.error("Error updating query status:", error);
      res.status(500).json({ message: "Failed to update query status" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
