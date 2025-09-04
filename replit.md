# Palaniappa Jewellers - Full-Stack E-commerce Application

## Overview

This is a sophisticated jewelry e-commerce application built with a modern full-stack TypeScript architecture. The application serves as an online store for Palaniappa Jewellers, featuring comprehensive product management, shopping cart functionality, order processing, and admin capabilities.

## Purpose and Goals

- **Primary Goal**: Provide a premium online jewelry shopping experience
- **Features**: Product catalog, shopping cart, order management, admin dashboard, barcode generation, metal rate tracking
- **Target Audience**: Jewelry customers and store administrators
- **Current State**: Fully functional with database integration, payment processing setup, and shipping management

## Recent Changes

- **2025-09-04**: Successfully imported from GitHub and configured for Replit environment
- **Database**: PostgreSQL database created and initialized with all required tables
- **Environment**: Configured with proper JWT secrets and environment variables
- **Workflow**: Set up development server on port 5000 with webview output
- **Dependencies**: All npm packages verified and working correctly

## Project Architecture

### Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter (lightweight React router)
- **Forms**: React Hook Form + Zod validation
- **Authentication**: JWT tokens
- **File Upload**: Multer
- **PDF Generation**: PDFKit
- **Barcode Generation**: JSBarcode + QR codes
- **Payment Processing**: Stripe integration
- **SMS/WhatsApp**: Twilio integration

### Directory Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utility libraries
│   │   ├── hooks/         # Custom React hooks
│   │   └── assets/        # Static assets (images, etc.)
├── server/                # Express backend application
│   ├── services/          # Business logic services
│   ├── utils/             # Server utilities
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer
│   └── db.ts             # Database configuration
├── shared/                # Shared type definitions
│   ├── schema.ts          # Database schema + Zod validators
│   └── cart-schema.ts     # Shopping cart types
├── migrations/            # Database migration files
└── uploads/              # File upload storage
```

### Key Features

1. **Product Management**: Complete CRUD operations for jewelry products
2. **Shopping Cart**: Session-based cart for guests, persistent cart for users
3. **Order Processing**: Full order lifecycle management
4. **Admin Dashboard**: Comprehensive admin interface for store management
5. **Metal Rate Tracking**: Real-time gold/silver price management
6. **Barcode Generation**: Product barcode and QR code generation
7. **Shipping Management**: Integrated shipping zone and method management
8. **Payment Integration**: Stripe payment processing
9. **User Authentication**: JWT-based auth system
10. **File Upload**: Product image management with vintage effects

### Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts and authentication
- `products` - Jewelry product catalog
- `cart_items` - Shopping cart functionality
- `orders` - Order management
- `bills` - Administrative billing
- `metal_rates` - Gold/silver price tracking
- `shipping_zones` - Shipping configuration
- `shipping_methods` - Delivery options
- `shipments` - Order fulfillment tracking

## Development Setup

### Environment Variables

The application requires these environment variables:
- `DATABASE_URL` - PostgreSQL connection string (auto-configured in Replit)
- `JWT_SECRET` - Secret key for JWT token signing (configured as dev_jwt_secret_key_12345)
- `STRIPE_SECRET_KEY` - Stripe payment processing (optional for development)
- `TWILIO_ACCOUNT_SID` - Twilio SMS integration (optional)
- `TWILIO_AUTH_TOKEN` - Twilio authentication (optional)
- `ADMIN_EMAIL` - Admin user email (defaults to admin@palaniappajewellers.com)
- `ADMIN_PASSWORD` - Admin user password (defaults to zxcvbnm)

### Development Commands

- `npm run dev` - Start development server (frontend + backend on port 5000)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run db:push` - Sync database schema with Drizzle
- `npm run check` - TypeScript type checking

### Workflow Configuration

The application is configured to run on port 5000 with webview output type for optimal Replit integration. The workflow command includes the JWT_SECRET environment variable.

## User Preferences

- **Coding Style**: Modern TypeScript with strict typing
- **Component Library**: shadcn/ui for consistent design system
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Database**: Drizzle ORM for type-safe database operations

## Deployment

- **Target**: Autoscale deployment for stateless web application
- **Build Process**: Vite builds frontend, esbuild bundles backend
- **Production Command**: `npm run start`
- **Port**: Application serves on port 5000
- **Database**: Uses Replit's managed PostgreSQL database

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- SQL injection protection via Drizzle ORM
- CORS configuration
- Input validation with Zod schemas
- Secure file upload handling

## API Endpoints

The application provides a comprehensive REST API for:
- Product management (`/api/products`)
- User authentication (`/api/auth`)
- Shopping cart operations (`/api/cart`)
- Order processing (`/api/orders`)
- Admin operations (`/api/admin/*`)
- Metal rate tracking (`/api/metal-rates`)
- File uploads (`/api/upload`)

## Additional Notes

- The application includes sophisticated jewelry-specific features like metal purity tracking, gemstone management, and making charges calculation
- Barcode generation creates unique product codes and QR codes for inventory management
- The vintage effect image processing creates artistic product presentations
- Comprehensive shipping management supports multiple zones and carriers
- Admin dashboard provides real-time business analytics and inventory management

---

*Last updated: September 4, 2025*