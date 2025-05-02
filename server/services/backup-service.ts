import { schedule } from 'node-cron';
import fs from 'fs';
import path from 'path';
import { db } from '@db';
import { storage } from '../storage';

export function setupBackupService() {
  // Create backup directory if it doesn't exist
  const backupDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Backup products and services daily at midnight
  schedule('0 0 * * *', async () => {
    try {
      console.log('Starting daily backup of products and services...');
      
      // Fetch data
      const products = await storage.getAllProducts();
      const services = await storage.getAllServices();
      
      // Create backup files
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Products backup
      const productsBackupPath = path.join(backupDir, `products_${timestamp}.json`);
      fs.writeFileSync(productsBackupPath, JSON.stringify(products, null, 2));
      
      // Services backup
      const servicesBackupPath = path.join(backupDir, `services_${timestamp}.json`);
      fs.writeFileSync(servicesBackupPath, JSON.stringify(services, null, 2));
      
      console.log('Daily backup completed successfully');
      
      // Clean up old backups (keep only last 7 days)
      cleanupOldBackups(backupDir, 7);
    } catch (error) {
      console.error('Error performing daily backup:', error);
    }
  });

  // Backup sales and financial data weekly on Sunday at 1 AM
  schedule('0 1 * * 0', async () => {
    try {
      console.log('Starting weekly backup of sales and financial data...');
      
      // Fetch data
      const sales = await storage.getAllSales();
      
      // Create backup files
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Sales backup
      const salesBackupPath = path.join(backupDir, `sales_${timestamp}.json`);
      fs.writeFileSync(salesBackupPath, JSON.stringify(sales, null, 2));
      
      console.log('Weekly backup completed successfully');
    } catch (error) {
      console.error('Error performing weekly backup:', error);
    }
  });

  // Backup client queries daily at 2 AM
  schedule('0 2 * * *', async () => {
    try {
      console.log('Starting daily backup of client queries...');
      
      // Fetch data
      const queries = await storage.getAllQueries();
      
      // Create backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const queriesBackupPath = path.join(backupDir, `queries_${timestamp}.json`);
      fs.writeFileSync(queriesBackupPath, JSON.stringify(queries, null, 2));
      
      console.log('Queries backup completed successfully');
      
      // Clean up old query backups (keep only last 14 days)
      cleanupOldBackups(backupDir, 14, 'queries_');
    } catch (error) {
      console.error('Error performing queries backup:', error);
    }
  });

  // Function to clean up old backup files
  const cleanupOldBackups = (directory: string, daysToKeep: number, prefix: string = '') => {
    try {
      const files = fs.readdirSync(directory)
        .filter(file => file.startsWith(prefix) && file.endsWith('.json'));
      
      // Sort files by creation time (oldest first)
      const sortedFiles = files.map(file => ({
        name: file,
        time: fs.statSync(path.join(directory, file)).birthtime.getTime()
      }))
      .sort((a, b) => a.time - b.time);
      
      // Delete files older than the retention period
      const filesToDelete = sortedFiles.slice(0, Math.max(0, sortedFiles.length - daysToKeep));
      
      filesToDelete.forEach(file => {
        fs.unlinkSync(path.join(directory, file.name));
        console.log(`Deleted old backup: ${file.name}`);
      });
    } catch (error) {
      console.error('Error cleaning up old backups:', error);
    }
  };

  // Perform an immediate backup on startup
  const performInitialBackup = async () => {
    try {
      console.log('Performing initial backup...');
      
      // Create backup directories
      const initialBackupDir = path.join(backupDir, 'initial');
      if (!fs.existsSync(initialBackupDir)) {
        fs.mkdirSync(initialBackupDir, { recursive: true });
      }
      
      // Get data
      const products = await storage.getAllProducts();
      const services = await storage.getAllServices();
      const sales = await storage.getAllSales();
      const queries = await storage.getAllQueries();
      
      // Create backup files
      fs.writeFileSync(path.join(initialBackupDir, 'products.json'), JSON.stringify(products, null, 2));
      fs.writeFileSync(path.join(initialBackupDir, 'services.json'), JSON.stringify(services, null, 2));
      fs.writeFileSync(path.join(initialBackupDir, 'sales.json'), JSON.stringify(sales, null, 2));
      fs.writeFileSync(path.join(initialBackupDir, 'queries.json'), JSON.stringify(queries, null, 2));
      
      console.log('Initial backup completed successfully');
    } catch (error) {
      console.error('Error performing initial backup:', error);
    }
  };

  // Run initial backup
  performInitialBackup();

  return {
    performManualBackup: async () => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const manualBackupDir = path.join(backupDir, `manual_${timestamp}`);
      
      if (!fs.existsSync(manualBackupDir)) {
        fs.mkdirSync(manualBackupDir, { recursive: true });
      }
      
      // Get data
      const products = await storage.getAllProducts();
      const services = await storage.getAllServices();
      const sales = await storage.getAllSales();
      const queries = await storage.getAllQueries();
      
      // Create backup files
      fs.writeFileSync(path.join(manualBackupDir, 'products.json'), JSON.stringify(products, null, 2));
      fs.writeFileSync(path.join(manualBackupDir, 'services.json'), JSON.stringify(services, null, 2));
      fs.writeFileSync(path.join(manualBackupDir, 'sales.json'), JSON.stringify(sales, null, 2));
      fs.writeFileSync(path.join(manualBackupDir, 'queries.json'), JSON.stringify(queries, null, 2));
      
      return manualBackupDir;
    }
  };
}
