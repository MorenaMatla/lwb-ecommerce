import { db } from "./index";
import * as schema from "@shared/schema";
import { sql } from "drizzle-orm";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

const productImages = [
  "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // RAM
  "https://images.unsplash.com/photo-1601737487795-dab272f52420?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // SSD
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Motherboard
  "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // CPU
  "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // GPU
];

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data (if needed for development)
    // DO NOT enable this in production as it will delete user data
    // await db.execute(sql`TRUNCATE TABLE "users", "products", "services", "sales", "queries", "income_statements" CASCADE`);

    // Check if users exist before seeding
    const existingUsers = await db.select({ count: sql`count(*)` }).from(schema.users);
    if (parseInt(existingUsers[0].count.toString()) === 0) {
      console.log("Seeding users...");
      
      // Create users with different roles
      const users = [
        {
          username: "kenneth@iwb.com",
          password: await hashPassword("password123"),
          fullName: "Kenneth Smith",
          role: "sales"
        },
        {
          username: "shadrack@iwb.com",
          password: await hashPassword("password123"),
          fullName: "Shadrack Johnson",
          role: "finance"
        },
        {
          username: "dev1@iwb.com",
          password: await hashPassword("password123"),
          fullName: "David Lee",
          role: "developer"
        },
        {
          username: "investor@iwb.com",
          password: await hashPassword("password123"),
          fullName: "Maria Rodriguez",
          role: "investor"
        }
      ];
      
      await db.insert(schema.users).values(users);
    }

    // Check if products exist before seeding
    const existingProducts = await db.select({ count: sql`count(*)` }).from(schema.products);
    if (parseInt(existingProducts[0].count.toString()) === 0) {
      console.log("Seeding products...");
      
      const products = [
        {
          name: "DDR4 RAM Bundle",
          description: "Recycled 8GB modules, tested and verified.",
          price: 2800,
          stock: 24,
          image: productImages[0],
          status: "available",
          category: "RAM"
        },
        {
          name: "SSD 500GB Pack",
          description: "Refurbished SSDs with secure data wiping.",
          price: 4500,
          stock: 12,
          image: productImages[1],
          status: "available",
          category: "Hard Drive"
        },
        {
          name: "Motherboard Components",
          description: "Assorted capacitors, chips and connectors.",
          price: 850,
          stock: 150,
          image: productImages[2],
          status: "available",
          category: "Motherboard"
        },
        {
          name: "Recycled CPU Pack",
          description: "Tested and functional CPU chips from various manufacturers.",
          price: 3200,
          stock: 8,
          image: productImages[3],
          status: "low_stock",
          category: "CPU"
        },
        {
          name: "GPU Components",
          description: "Salvaged GPU parts for repair and recycling.",
          price: 1500,
          stock: 5,
          image: productImages[4],
          status: "low_stock",
          category: "GPU"
        }
      ];
      
      await db.insert(schema.products).values(products);
    }

    // Check if services exist before seeding
    const existingServices = await db.select({ count: sql`count(*)` }).from(schema.services);
    if (parseInt(existingServices[0].count.toString()) === 0) {
      console.log("Seeding services...");
      
      const services = [
        {
          name: "Data Wiping Service",
          description: "Secure data erasure for hard drives and SSDs with certification.",
          price: 500,
          duration: "2 hours",
          status: "active"
        },
        {
          name: "Component Recovery",
          description: "Extraction of valuable components from circuit boards.",
          price: 1200,
          duration: "1 day",
          status: "active"
        },
        {
          name: "E-Waste Collection",
          description: "Bulk collection of electronic waste from businesses.",
          price: 2000,
          duration: "3 hours",
          status: "active"
        },
        {
          name: "Hardware Testing",
          description: "Comprehensive testing of recycled computer hardware.",
          price: 800,
          duration: "4 hours",
          status: "active"
        },
        {
          name: "Custom Refurbishing",
          description: "Tailored refurbishing services for specific client needs.",
          price: 3500,
          duration: "3 days",
          status: "inactive"
        }
      ];
      
      await db.insert(schema.services).values(services);
    }

    // Check if sales exist before seeding
    const existingSales = await db.select({ count: sql`count(*)` }).from(schema.sales);
    if (parseInt(existingSales[0].count.toString()) === 0) {
      console.log("Seeding sales...");
      
      // Create sales with proper date handling
      const now = new Date();
      
      // Each date calculation needs to use a fresh Date object to avoid mutations
      const sales = [
        {
          productName: "RAM Module Bundle",
          productType: "Recycled Components",
          productDescription: "4x 8GB DDR4",
          productIcon: "memory",
          customer: "TechSolutions Ltd",
          amount: 3200,
          date: new Date(now.getTime() - 2 * (24 * 60 * 60 * 1000)),
          status: "completed",
          salesPerson: "Kenneth Smith"
        },
        {
          productName: "SSD Recycling Service",
          productType: "Service",
          productDescription: "Data wiping included",
          productIcon: "hdd",
          customer: "DataSecure Inc",
          amount: 5850,
          date: new Date(now.getTime() - 4 * (24 * 60 * 60 * 1000)),
          status: "in_progress",
          salesPerson: "Kenneth Smith"
        },
        {
          productName: "Motherboard Components",
          productType: "Recycled Parts",
          productDescription: "Capacitors and chips",
          productIcon: "microchip",
          customer: "EcoTech Manufacturing",
          amount: 12750,
          date: new Date(now.getTime() - 6 * (24 * 60 * 60 * 1000)),
          status: "completed",
          salesPerson: "Kenneth Smith"
        }
      ];
      
      await db.insert(schema.sales).values(sales);
    }

    // Check if queries exist before seeding
    const existingQueries = await db.select({ count: sql`count(*)` }).from(schema.queries);
    if (parseInt(existingQueries[0].count.toString()) === 0) {
      console.log("Seeding client queries...");
      
      const now = new Date();
      const queries = [
        {
          name: "John Smith",
          email: "john.smith@company.com",
          subject: "Data Erasure Services",
          message: "Do you offer data secure erasure for our company's old hard drives?",
          status: "pending",
          createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000) // 5 hours ago
        },
        {
          name: "Sarah Johnson",
          email: "sarah@gmail.com",
          subject: "Laptop Recycling",
          message: "What are your rates for recycling 50 old laptops?",
          status: "automated",
          response: "Our laptop recycling rates depend on the quantity and condition. For bulk orders (50+), we offer special discounts. Standard recycling starts at M50 per unit. Please contact our sales team for a detailed quote.",
          autoRepliedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago 
          createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000) // 10 hours ago
        }
      ];
      
      await db.insert(schema.queries).values(queries);
    }

    // Check if income statements exist before seeding
    const existingStatements = await db.select({ count: sql`count(*)` }).from(schema.incomeStatements);
    if (parseInt(existingStatements[0].count.toString()) === 0) {
      console.log("Seeding income statements...");
      
      const currentYear = new Date().getFullYear();
      const months = [
        "January", "February", "March", "April", "May", 
        "June", "July", "August", "September", "October",
        "November", "December"
      ];
      
      // Generate income statements for the current year
      const incomeStatements = months.map((month, index) => {
        // Base values with some randomization for realistic data
        const revenue = 200000 + Math.floor(Math.random() * 100000);
        const costOfGoodsSold = revenue * (0.3 + Math.random() * 0.1);
        const grossProfit = revenue - costOfGoodsSold;
        
        // Expenses with some randomization
        const salaries = 50000 + Math.floor(Math.random() * 5000);
        const transportation = 15000 + Math.floor(Math.random() * 3000);
        const advertising = 10000 + Math.floor(Math.random() * 2000);
        const rent = 8000;
        const utilities = 5000 + Math.floor(Math.random() * 1000);
        const other = 7000 + Math.floor(Math.random() * 2000);
        
        const expenses = {
          salaries,
          transportation,
          advertising,
          rent,
          utilities,
          other
        };
        
        const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
        const operatingProfit = grossProfit - totalExpenses;
        const taxRate = 0.15; // 15% tax rate
        const netProfit = operatingProfit * (1 - taxRate);
        
        return {
          month,
          year: currentYear,
          revenue,
          costOfGoodsSold,
          grossProfit,
          expenses,
          operatingProfit,
          taxRate,
          netProfit
        };
      });
      
      await db.insert(schema.incomeStatements).values(incomeStatements);
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
