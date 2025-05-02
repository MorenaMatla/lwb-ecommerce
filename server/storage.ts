import { db } from "@db";
import { eq } from "drizzle-orm";
import * as schema from "@shared/schema";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { pool } from "@db";

const PostgresSessionStore = connectPgSimple(session);

interface QueryStorage {
  createQuery: (data: schema.InsertQuery) => Promise<schema.Query>;
  getQueriesByStatus: (status: string) => Promise<schema.Query[]>;
  getAllQueries: () => Promise<schema.Query[]>;
  getRecentQueries: (limit: number) => Promise<schema.Query[]>;
  getQueryById: (id: number) => Promise<schema.Query | null>;
  updateQueryStatus: (id: number, status: string) => Promise<schema.Query | null>;
  countPendingQueries: () => Promise<number>;
}

interface ProductStorage {
  createProduct: (data: schema.InsertProduct) => Promise<schema.Product>;
  getAllProducts: () => Promise<schema.Product[]>;
  getProductById: (id: number) => Promise<schema.Product | null>;
  updateProduct: (id: number, data: Partial<schema.InsertProduct>) => Promise<schema.Product | null>;
  deleteProduct: (id: number) => Promise<boolean>;
  getProductCategories: () => Promise<{ name: string; value: number; percentage: number; color: string }[]>;
}

interface ServiceStorage {
  createService: (data: schema.InsertService) => Promise<schema.Service>;
  getAllServices: () => Promise<schema.Service[]>;
  getServiceById: (id: number) => Promise<schema.Service | null>;
  updateService: (id: number, data: Partial<schema.InsertService>) => Promise<schema.Service | null>;
  deleteService: (id: number) => Promise<boolean>;
}

interface SaleStorage {
  createSale: (data: schema.InsertSale) => Promise<schema.Sale>;
  getAllSales: () => Promise<schema.Sale[]>;
  getSaleById: (id: number) => Promise<schema.Sale | null>;
  getSalesByStatus: (status: string) => Promise<schema.Sale[]>;
  updateSale: (id: number, data: Partial<schema.InsertSale>) => Promise<schema.Sale | null>;
  getRecentSales: (limit: number) => Promise<schema.Sale[]>;
}

interface FinanceStorage {
  getIncomeStatement: (year: number, month: string) => Promise<any>;
  getFinancialTrends: (year: number) => Promise<any[]>;
  getExpenseBreakdown: (year: number, month: string) => Promise<any>;
  getDashboardStats: () => Promise<any>;
}

interface UserStorage {
  createUser: (data: any) => Promise<schema.User>;
  getUserById: (id: number) => Promise<schema.User | null>;
  getUserByUsername: (username: string) => Promise<schema.User | null>;
  updateUser: (id: number, data: Partial<schema.InsertUser>) => Promise<schema.User | null>;
  deleteUser: (id: number) => Promise<boolean>;
  getAllUsers: () => Promise<schema.User[]>;
  getTeamMembers: () => Promise<any[]>;
}

interface IStorage extends QueryStorage, ProductStorage, ServiceStorage, SaleStorage, FinanceStorage, UserStorage {
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      tableName: 'sessions',
      createTableIfMissing: true
    });
  }

  // Query Storage Methods
  async createQuery(data: schema.InsertQuery): Promise<schema.Query> {
    const [query] = await db.insert(schema.queries).values(data).returning();
    return query;
  }

  async getQueriesByStatus(status: string): Promise<schema.Query[]> {
    return await db.select().from(schema.queries).where(eq(schema.queries.status, status));
  }

  async getAllQueries(): Promise<schema.Query[]> {
    return await db.select().from(schema.queries).orderBy(schema.queries.createdAt);
  }

  async getRecentQueries(limit: number): Promise<schema.Query[]> {
    const queries = await db.select().from(schema.queries).orderBy(schema.queries.createdAt).limit(limit);
    return queries;
  }

  async getQueryById(id: number): Promise<schema.Query | null> {
    const [query] = await db.select().from(schema.queries).where(eq(schema.queries.id, id));
    return query || null;
  }

  async updateQueryStatus(id: number, status: string): Promise<schema.Query | null> {
    const [updatedQuery] = await db
      .update(schema.queries)
      .set({ status })
      .where(eq(schema.queries.id, id))
      .returning();
    return updatedQuery || null;
  }

  async countPendingQueries(): Promise<number> {
    const result = await db
      .select({ count: db.fn.count() })
      .from(schema.queries)
      .where(eq(schema.queries.status, "pending"));
    return parseInt(result[0].count.toString(), 10);
  }

  // Product Storage Methods
  async createProduct(data: schema.InsertProduct): Promise<schema.Product> {
    const [product] = await db.insert(schema.products).values(data).returning();
    return product;
  }

  async getAllProducts(): Promise<schema.Product[]> {
    return await db.select().from(schema.products);
  }

  async getProductById(id: number): Promise<schema.Product | null> {
    const [product] = await db.select().from(schema.products).where(eq(schema.products.id, id));
    return product || null;
  }

  async updateProduct(id: number, data: Partial<schema.InsertProduct>): Promise<schema.Product | null> {
    const [product] = await db
      .update(schema.products)
      .set(data)
      .where(eq(schema.products.id, id))
      .returning();
    return product || null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(schema.products).where(eq(schema.products.id, id));
    return result.rowCount > 0;
  }

  async getProductCategories(): Promise<{ name: string; value: number; percentage: number; color: string }[]> {
    // Group products by category and count them
    const products = await db.select().from(schema.products);
    const categories: Record<string, { count: number; color: string }> = {};
    
    // Count products in each category
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = { count: 0, color: this.getCategoryColor(product.category) };
      }
      categories[product.category].count += 1;
    });
    
    // Calculate percentages
    const totalCount = products.length;
    const result = Object.entries(categories).map(([name, { count, color }]) => ({
      name,
      value: count,
      percentage: Math.round((count / totalCount) * 100),
      color
    }));
    
    return result;
  }
  
  private getCategoryColor(category: string): string {
    // Assign consistent colors to categories
    const colorMap: Record<string, string> = {
      'RAM': 'hsl(var(--primary))',
      'Hard Drive': 'hsl(var(--accent))',
      'Motherboard': 'hsl(var(--chart-3))',
      'CPU': 'hsl(var(--chart-4))',
      'GPU': 'hsl(var(--chart-5))'
    };
    
    return colorMap[category] || 'hsl(var(--primary))';
  }

  // Service Storage Methods
  async createService(data: schema.InsertService): Promise<schema.Service> {
    const [service] = await db.insert(schema.services).values(data).returning();
    return service;
  }

  async getAllServices(): Promise<schema.Service[]> {
    return await db.select().from(schema.services);
  }

  async getServiceById(id: number): Promise<schema.Service | null> {
    const [service] = await db.select().from(schema.services).where(eq(schema.services.id, id));
    return service || null;
  }

  async updateService(id: number, data: Partial<schema.InsertService>): Promise<schema.Service | null> {
    const [service] = await db
      .update(schema.services)
      .set(data)
      .where(eq(schema.services.id, id))
      .returning();
    return service || null;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(schema.services).where(eq(schema.services.id, id));
    return result.rowCount > 0;
  }

  // Sale Storage Methods
  async createSale(data: schema.InsertSale): Promise<schema.Sale> {
    const [sale] = await db.insert(schema.sales).values(data).returning();
    return sale;
  }

  async getAllSales(): Promise<schema.Sale[]> {
    return await db.select().from(schema.sales);
  }

  async getSaleById(id: number): Promise<schema.Sale | null> {
    const [sale] = await db.select().from(schema.sales).where(eq(schema.sales.id, id));
    return sale || null;
  }

  async getSalesByStatus(status: string): Promise<schema.Sale[]> {
    return await db.select().from(schema.sales).where(eq(schema.sales.status, status));
  }

  async updateSale(id: number, data: Partial<schema.InsertSale>): Promise<schema.Sale | null> {
    const [sale] = await db
      .update(schema.sales)
      .set(data)
      .where(eq(schema.sales.id, id))
      .returning();
    return sale || null;
  }

  async getRecentSales(limit: number): Promise<schema.Sale[]> {
    const sales = await db.select().from(schema.sales).orderBy(schema.sales.date).limit(limit);
    return sales;
  }

  // Finance Storage Methods
  async getIncomeStatement(year: number, month: string): Promise<any> {
    // For a real implementation, this would query the database for financial records
    // Here we're returning sample data based on the provided parameters
    const incomeStatements = await db.select().from(schema.incomeStatements)
      .where(eq(schema.incomeStatements.year, year))
      .where(eq(schema.incomeStatements.month, month));
    
    return incomeStatements[0] || null;
  }

  async getFinancialTrends(year: number): Promise<any[]> {
    // Get all income statements for the given year
    const statements = await db.select().from(schema.incomeStatements)
      .where(eq(schema.incomeStatements.year, year));
    
    // Transform to required format for charts
    return statements.map(statement => ({
      name: statement.month.substring(0, 3), // Abbreviated month name
      revenue: statement.revenue,
      expenses: statement.costOfGoodsSold + 
                statement.expenses.salaries + 
                statement.expenses.transportation + 
                statement.expenses.advertising + 
                statement.expenses.rent + 
                statement.expenses.utilities + 
                statement.expenses.other,
      profit: statement.netProfit
    }));
  }

  async getExpenseBreakdown(year: number, month: string): Promise<any> {
    const [statement] = await db.select().from(schema.incomeStatements)
      .where(eq(schema.incomeStatements.year, year))
      .where(eq(schema.incomeStatements.month, month));
    
    if (!statement) return null;
    
    return {
      categories: [
        'Salaries',
        'Transportation',
        'Advertising',
        'Rent',
        'Utilities',
        'Other'
      ],
      values: [
        statement.expenses.salaries,
        statement.expenses.transportation,
        statement.expenses.advertising,
        statement.expenses.rent,
        statement.expenses.utilities,
        statement.expenses.other
      ]
    };
  }

  async getDashboardStats(): Promise<any> {
    // Simulate dashboard statistics
    // In a real implementation, this would be calculated from actual database data
    return {
      revenue: {
        value: 248500,
        change: 12.5
      },
      recycledComponents: {
        value: 1245,
        change: 8.3
      },
      activeClients: {
        value: 78,
        change: 5.2
      },
      openQueries: {
        value: 12,
        newToday: 3
      }
    };
  }

  // User Storage Methods
  async createUser(data: any): Promise<schema.User> {
    const [user] = await db.insert(schema.users).values(data).returning();
    return user;
  }

  async getUserById(id: number): Promise<schema.User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user || null;
  }

  async getUserByUsername(username: string): Promise<schema.User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user || null;
  }

  async updateUser(id: number, data: Partial<schema.InsertUser>): Promise<schema.User | null> {
    const [user] = await db
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
      .returning();
    return user || null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(schema.users).where(eq(schema.users.id, id));
    return result.rowCount > 0;
  }

  async getAllUsers(): Promise<schema.User[]> {
    return await db.select().from(schema.users);
  }

  async getTeamMembers(): Promise<any[]> {
    // Get all users except the current one
    const users = await db.select({
      id: schema.users.id,
      fullName: schema.users.fullName,
      role: schema.users.role
    }).from(schema.users);
    
    // Format for the team members display
    return users.map(user => ({
      id: user.id,
      name: user.fullName,
      role: user.role,
      initials: this.getInitials(user.fullName),
      isOnline: Math.random() > 0.5 // Randomly set online status for demo
    }));
  }
  
  private getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
}

export const storage = new DatabaseStorage();
