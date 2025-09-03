# Palaniappa Jewellers E-commerce Platform

## Overview
A full-stack jewelry e-commerce platform built with React, TypeScript, Express.js, and PostgreSQL. Features include product management, cart functionality, metal rate tracking, barcode generation, and comprehensive admin tools.

## Architecture
- **Frontend**: React 18 + Vite + Tailwind CSS + shadcn/ui components
- **Backend**: Express.js with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: File upload handling for product images
- **Payment**: Stripe integration (requires API key)
- **Notifications**: Twilio for SMS (optional)

## Current Setup Status
✅ **Development Environment Ready**
- Express server running on port 5000 with proxy support
- Vite dev server with `allowedHosts: true` for Replit
- PostgreSQL database provisioned and schema applied
- Static file serving for images and assets configured
- Environment variables set (JWT_SECRET for development)

✅ **Features Working**
- Product catalog with categories and filtering
- Metal rates service (gold/silver pricing)
- Shopping cart functionality
- Barcode/QR code generation
- Admin dashboard for inventory management
- Responsive mobile-friendly design

## Environment Variables
- `JWT_SECRET`: Set for development (required)
- `STRIPE_SECRET_KEY`: Optional - payment features disabled without it
- `TWILIO_*`: Optional - SMS features disabled without credentials
- `DATABASE_URL`: Auto-configured by Replit PostgreSQL

## Project Structure
```
├── client/          # React frontend
├── server/          # Express backend + API routes
├── shared/          # Shared types and schemas
├── uploads/         # User uploaded images
├── attached_assets/ # Static jewelry images
└── migrations/      # Database migrations
```

## Key Features
- **Product Management**: Full CRUD with image uploads and barcode generation
- **Shopping Cart**: Session-based cart with user authentication
- **Metal Rates**: Real-time gold/silver pricing integration
- **Billing System**: Invoice generation with PDF export
- **Inventory Tracking**: Stock management with barcode scanning
- **Multi-currency**: Support for INR and BHD pricing
- **Responsive Design**: Mobile-optimized jewelry showcase

## Recent Changes
- Database successfully connected and schema applied
- Fixed tsx runtime error for development workflow
- Configured proper host settings for Replit environment
- Deployment configuration set for production readiness

## Development
- Run `npm run dev` to start both frontend and backend
- Run `npm run db:push` to sync database schema changes
- Access at port 5000 (configured for Replit proxy)

## Production Deployment
- Build: `npm run build` (compiles both frontend and backend)
- Start: `npm run start` (production Express server)
- Target: Autoscale deployment (stateless web application)