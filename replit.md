# Palaniappa Jewellers E-Commerce Platform

## Overview
A full-stack jewelry e-commerce application built with React, Express, TypeScript, and PostgreSQL. This platform allows customers to browse jewelry collections, view products, and place orders, while providing admin functionality for managing inventory, pricing, and orders.

## Recent Changes
- **Sept 3, 2025**: Successfully imported and configured the project for Replit environment
  - Fixed tsx command issue by using npx tsx
  - Set up PostgreSQL database with proper migrations
  - Configured JWT_SECRET environment variable for authentication
  - Enabled webview output with proper host configuration for Replit proxy
  - Application now running successfully on port 5000

## Project Architecture

### Frontend (React + TypeScript)
- **Location**: `client/`
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Key Features**:
  - Product catalog with filtering and search
  - Shopping cart functionality
  - Admin dashboard for product management
  - Metal rates ticker
  - WhatsApp integration
  - QR code scanning for products

### Backend (Express + TypeScript)
- **Location**: `server/`
- **Framework**: Express.js with TypeScript (tsx)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based auth system
- **Key Features**:
  - Product management APIs
  - Order processing
  - Metal rates management
  - Image upload with vintage effects
  - Barcode/QR code generation
  - Shipping management

### Database Schema
- **Location**: `shared/schema.ts`
- **ORM**: Drizzle with PostgreSQL
- **Key Tables**: products, categories, orders, users, metal_rates, shipping_zones

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (auto-configured in Replit)
- `JWT_SECRET`: Required for authentication (set to dev value)
- `STRIPE_SECRET_KEY`: Optional for payment processing
- `TWILIO_*`: Optional for SMS notifications
- `ADMIN_EMAIL`, `ADMIN_MOBILE`, `ADMIN_PASSWORD`: Admin credentials

## Development Setup
1. Database is automatically provisioned and migrated
2. Run `npm run dev` to start development server
3. Application serves frontend and backend on port 5000
4. Vite dev server configured with `allowedHosts: true` for Replit proxy

## User Preferences
- Uses shadcn/ui component library for consistent UI
- Follows modern React patterns with hooks
- TypeScript for type safety
- Tailwind for responsive design

## Deployment
- Configured for autoscale deployment
- Build command: `npm run build`
- Start command: Production environment with proper JWT secret
- Frontend assets served statically in production

## Current State
✅ Application successfully running and accessible
✅ Database connected and initialized
✅ Both frontend and backend operational
✅ Admin features available
✅ Product catalog functional