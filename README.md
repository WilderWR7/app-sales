# Mercatech — Point of Sale & Inventory System

A Point of Sale (POS) and inventory management web application built with Angular 16 (Standalone Architecture), Angular Signals, TypeScript, and Tailwind CSS.

**Live Demo:** [https://app-sales-git-wildermayta-wilderwr7s-projects.vercel.app/](https://app-sales-git-wildermayta-wilderwr7s-projects.vercel.app/)

---

## Technical Overview & Engineering Highlights

- **State Management with Angular Signals (`CartStore`)**: Centralized reactive store utilizing Angular 16 `signal` and `computed` primitives to handle shopping cart state, real-time totals, item counts, and stock limits.
- **Client-Side Stock Validation**: Prevents invalid API calls by checking product availability in the browser, highlighting quantity excesses in red and disabling checkout when inventory is exceeded.
- **Session Persistence Across Page Reloads**: Synchronous session bootstrap logic that restores authentication state from `localStorage` on page refresh (F5), eliminating unwanted redirects to `/login`.
- **Atomic Sales Cancellation & Stock Restoration**: Integrated transaction receipts with item images and support for cancelling sales (`DELETE /api/sales/{id}`), automatically returning item stock to the catalog.
- **Real-Time KPI Metrics Summary Header**: Dashboard header rendering 5 global performance metrics (Total Revenue, Daily Income, Average Ticket, Top Product, and Cancelled Sales) with smooth skeleton loading states.
- **DOM Focus Optimization**: Applied `trackBy` functions across dynamic Angular template loops to prevent DOM recreation and preserve keyboard focus during quantity edits.
- **Vercel SPA Routing & SEO**: Configured `vercel.json` rewrite rules for client-side routing, along with Open Graph, Twitter Cards, and JSON-LD schema metadata.

---

## Tech Stack

- **Frontend**: Angular 16.2 (Standalone Components)
- **State Management**: Angular Signals (`signal`, `computed`) & RxJS
- **Language**: TypeScript 5.1 (Strict Mode)
- **Styling**: Tailwind CSS 3.3 (Dark & Light Mode)
- **Authentication**: JWT Sanctum, Angular Router Guards (`authGuard`, `guestGuard`), HttpInterceptor
- **Deployment**: Vercel Serverless Platform

---

## Project Structure

```text
src/
├── app/
│   ├── auth/          # Login and Register pages
│   ├── components/    # Navbar, Pagination, Cart Drawer, Theme Toggle
│   ├── core/          # Guards, Interceptors, Services, and CartStore (Signals)
│   ├── layouts/       # Dashboard Layout
│   ├── products/      # Product Catalog Page & Cards
│   └── sales/         # Sales History Page, KPI Header, Receipt & Confirm Modals
└── assets/            # Static assets & logos
```

---

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WilderWR7/app-sales.git
   cd app-sales
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm start
   ```
   Open `http://localhost:4200` in your browser.

4. **Build for production:**
   ```bash
   pnpm run build
   ```
