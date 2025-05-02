import { pgTable, text, serial, integer, boolean, timestamp, jsonb, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(), // 'sales', 'finance', 'developer', 'investor'
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.email("Please enter a valid email address"),
  password: (schema) => schema.min(8, "Password must be at least 8 characters"),
  fullName: (schema) => schema.min(1, "Full name is required"),
  role: (schema) => schema.refine(val => ['sales', 'finance', 'developer', 'investor'].includes(val), {
    message: "Role must be one of: sales, finance, developer, investor"
  })
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  stock: integer("stock").notNull(),
  image: text("image").notNull(),
  status: text("status").notNull(), // 'available', 'low_stock', 'out_of_stock'
  category: text("category").notNull(), // 'RAM', 'Hard Drive', 'Motherboard', etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertProductSchema = createInsertSchema(products, {
  name: (schema) => schema.min(1, "Product name is required"),
  description: (schema) => schema.min(1, "Description is required"),
  price: (schema) => schema.positive("Price must be positive"),
  stock: (schema) => schema.nonnegative("Stock cannot be negative"),
  image: (schema) => schema.url("Please provide a valid image URL"),
  status: (schema) => schema.refine(val => ['available', 'low_stock', 'out_of_stock'].includes(val), {
    message: "Status must be one of: available, low_stock, out_of_stock"
  }),
  category: (schema) => schema.refine(val => ['RAM', 'Hard Drive', 'Motherboard', 'CPU', 'GPU'].includes(val), {
    message: "Category must be one of: RAM, Hard Drive, Motherboard, CPU, GPU"
  })
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Services Table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  duration: text("duration").notNull(), // e.g., '2 hours', '3 days'
  status: text("status").notNull(), // 'active', 'inactive'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertServiceSchema = createInsertSchema(services, {
  name: (schema) => schema.min(1, "Service name is required"),
  description: (schema) => schema.min(1, "Description is required"),
  price: (schema) => schema.positive("Price must be positive"),
  duration: (schema) => schema.min(1, "Duration is required"),
  status: (schema) => schema.refine(val => ['active', 'inactive'].includes(val), {
    message: "Status must be one of: active, inactive"
  })
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Sales Table
export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  productName: text("product_name").notNull(),
  productType: text("product_type").notNull(),
  productDescription: text("product_description").notNull(),
  productIcon: text("product_icon").notNull(), // 'memory', 'hdd', 'microchip', etc.
  customer: text("customer").notNull(),
  amount: doublePrecision("amount").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull(), // 'completed', 'in_progress', 'pending'
  salesPerson: text("sales_person").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSaleSchema = createInsertSchema(sales, {
  productName: (schema) => schema.min(1, "Product name is required"),
  productType: (schema) => schema.min(1, "Product type is required"),
  productDescription: (schema) => schema.min(1, "Product description is required"),
  productIcon: (schema) => schema.refine(val => ['memory', 'hdd', 'microchip'].includes(val), {
    message: "Product icon must be one of: memory, hdd, microchip"
  }),
  customer: (schema) => schema.min(1, "Customer is required"),
  amount: (schema) => schema.positive("Amount must be positive"),
  status: (schema) => schema.refine(val => ['completed', 'in_progress', 'pending'].includes(val), {
    message: "Status must be one of: completed, in_progress, pending"
  }),
  salesPerson: (schema) => schema.min(1, "Sales person is required")
});

export type InsertSale = z.infer<typeof insertSaleSchema>;
export type Sale = typeof sales.$inferSelect;

// Client Queries Table
export const queries = pgTable("queries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull(), // 'pending', 'completed', 'automated'
  response: text("response"),
  autoRepliedAt: timestamp("auto_replied_at"),
  createdAt: timestamp("created_at").notNull()
});

export const insertQuerySchema = createInsertSchema(queries, {
  name: (schema) => schema.min(1, "Name is required"),
  email: (schema) => schema.email("Please enter a valid email address"),
  subject: (schema) => schema.min(1, "Subject is required"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
  status: (schema) => schema.refine(val => ['pending', 'completed', 'automated'].includes(val), {
    message: "Status must be one of: pending, completed, automated"
  })
});

export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type Query = typeof queries.$inferSelect;

// Income Statements Table
export const incomeStatements = pgTable("income_statements", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  revenue: doublePrecision("revenue").notNull(),
  costOfGoodsSold: doublePrecision("cost_of_goods_sold").notNull(),
  grossProfit: doublePrecision("gross_profit").notNull(),
  expenses: jsonb("expenses").notNull(), // { salaries, transportation, advertising, rent, utilities, other }
  operatingProfit: doublePrecision("operating_profit").notNull(),
  taxRate: doublePrecision("tax_rate").notNull(),
  netProfit: doublePrecision("net_profit").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertIncomeStatementSchema = createInsertSchema(incomeStatements, {
  month: (schema) => schema.min(1, "Month is required"),
  year: (schema) => schema.min(2020, "Year must be 2020 or later"),
  revenue: (schema) => schema.nonnegative("Revenue cannot be negative"),
  costOfGoodsSold: (schema) => schema.nonnegative("Cost of goods sold cannot be negative"),
  grossProfit: (schema) => schema.nonnegative("Gross profit cannot be negative"),
  operatingProfit: (schema) => schema.nonnegative("Operating profit cannot be negative"),
  taxRate: (schema) => schema.min(0, "Tax rate cannot be negative").max(1, "Tax rate cannot exceed 100%"),
  netProfit: (schema) => schema.nonnegative("Net profit cannot be negative")
});

export type InsertIncomeStatement = z.infer<typeof insertIncomeStatementSchema>;
export type IncomeStatement = typeof incomeStatements.$inferSelect;

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  sales: many(sales)
}));

export const salesRelations = relations(sales, ({ one }) => ({
  salesperson: one(users, {
    fields: [sales.salesPerson],
    references: [users.fullName]
  })
}));
