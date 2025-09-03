# Palaniappa Jewellers E-commerce Platform

## Overview
A full-stack jewelry e-commerce application built with modern web technologies for Palaniappa Jewellers. The platform features product catalog management, shopping cart, order processing, and admin dashboard functionality.

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Shadcn UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## Recent Changes (Sep 3, 2025)
- ✅ Successfully imported and configured for Replit environment
- ✅ Fixed missing JWT_SECRET environment variable 
- ✅ Configured Vite to allow all hosts for Replit proxy (`allowedHosts: true`)
- ✅ Set up workflow on port 5000 with webview output
- ✅ Verified database connectivity and schema
- ✅ Configured deployment settings for autoscale deployment

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/          # Utilities and configurations
│   │   └── assets/       # Static assets (images, etc.)
├── server/                # Express backend
│   ├── services/         # Business logic services  
│   ├── utils/           # Utility functions
│   └── routes.ts        # API routes
├── shared/               # Shared types and schemas
└── migrations/          # Database migrations
```

## Key Features
- **Product Management**: Comprehensive jewelry catalog with categories, materials, pricing
- **Shopping Cart**: Session-based cart for guest users, persistent for registered users
- **Order Processing**: Complete order workflow with payment integration
- **Admin Dashboard**: Product management, order tracking, billing
- **Metal Rates**: Live gold/silver rate integration
- **Barcode Generation**: Product barcode and QR code generation
- **Shipping Management**: Multi-zone shipping with tracking
- **WhatsApp Integration**: Order notifications and customer communication

## Environment Configuration
The application requires these environment variables:
- `JWT_SECRET`: Required for authentication (currently set in workflow)
- `DATABASE_URL`: PostgreSQL connection (available via Replit)
- `STRIPE_SECRET_KEY`: Optional, for payment processing  
- `TWILIO_*`: Optional, for SMS notifications

## Database Schema
The application uses a comprehensive schema including:
- Users, Products, Orders, Bills
- Shopping Cart management
- Metal rates tracking
- Shipping and logistics
- Categories and home sections

## Running the Application
- **Development**: `npm run dev` (configured in workflow)
- **Build**: `npm run build`
- **Production**: `npm run start`
- **Database**: `npm run db:push` to sync schema

## Deployment
Configured for Replit autoscale deployment:
- Build command: `npm run build`
- Start command: `npm run start` (with JWT_SECRET)
- Port: 5000 (webview enabled)

## Current Status
The application is fully functional and ready for use. All core features are working including:
- ✅ Frontend loading properly
- ✅ API endpoints responding
- ✅ Database connectivity
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Admin features