# Palaniappa Jewellers E-commerce Application

## Overview
This is a full-stack jewelry e-commerce web application built with React, Express, and PostgreSQL. The application features product management, cart functionality, order processing, metal rates, barcode generation, and shipping management for a jewelry business.

## Recent Changes
- **September 03, 2025**: Successfully set up the application in Replit environment
  - Created PostgreSQL database and pushed schema using Drizzle ORM
  - Configured workflow with proper environment variables (JWT_SECRET)
  - Fixed database connection issues and Vite configuration
  - Application now running successfully on port 5000

## Project Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI + Tailwind CSS (shadcn/ui)
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom jewelry-focused theme

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication
- **File Uploads**: Multer for image handling
- **Payment Processing**: Stripe integration (optional)
- **SMS**: Twilio integration (optional)
- **PDF Generation**: PDFKit for invoices and estimates

### Database Schema
- **Users**: Customer and admin management with OTP functionality
- **Products**: Jewelry products with pricing, categories, materials, weights
- **Orders & Bills**: E-commerce orders and admin billing
- **Cart Items**: Shopping cart functionality
- **Metal Rates**: Live gold/silver pricing
- **Shipping**: Zones, methods, shipments, and delivery tracking
- **Categories**: Product categorization system

### Key Features
1. **Jewelry-Specific**:
   - Metal-based pricing (gold, silver)
   - Weight and purity tracking
   - Barcode and QR code generation
   - Making charges calculation
   - GST and VAT support

2. **E-commerce**:
   - Product catalog with categories
   - Shopping cart and checkout
   - Order management
   - Shipping calculation
   - Payment processing

3. **Admin Features**:
   - Product management
   - Order tracking
   - Billing system
   - Metal rates management
   - Shipping management

## Environment Configuration
- **Database**: PostgreSQL (provisioned in Replit)
- **Port**: 5000 (frontend and backend combined)
- **JWT_SECRET**: Set for authentication
- **Optional**: STRIPE_SECRET_KEY, Twilio credentials

## Current Status
✅ Database connected and schema deployed
✅ Frontend and backend running successfully
✅ API endpoints functioning
✅ Vite HMR working
⚠️ Some TypeScript errors in routes.ts (non-blocking)
⚠️ Payment features disabled (no Stripe key)
⚠️ SMS features disabled (no Twilio credentials)

## Next Steps for Production
1. Add Stripe API key for payment processing
2. Configure Twilio for SMS notifications
3. Fix TypeScript errors in routes.ts
4. Add proper error handling and logging
5. Set up production deployment configuration