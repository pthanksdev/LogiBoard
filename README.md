<div align="center">

<img src="https://raw.githubusercontent.com/pthanksdev/LogiBoard/main/.github/logo.png" alt="LogiBoard Logo" width="80" />

# LogiBoard

### Enterprise Logistics Operations Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-22c55e)](LICENSE)

**Real-time fleet management, intelligent shipment tracking, and multi-tenant analytics — all in one enterprise-grade platform.**

[Live Demo](#) · [API Docs](#api-documentation) · [Report Bug](#) · [Request Feature](#)

---

</div>

## 📸 Screenshots

> _The platform features a dark, glassmorphic design across all pages._

| Landing Page | Dashboard | Shipment Tracking |
|:---:|:---:|:---:|
| ![landing](https://placehold.co/400x240/020617/2563eb?text=Landing+Page) | ![dashboard](https://placehold.co/400x240/020617/4f46e5?text=Dashboard) | ![tracking](https://placehold.co/400x240/020617/7c3aed?text=Live+Tracking) |

| Fleet Management | 404 Page | Login |
|:---:|:---:|:---:|
| ![fleet](https://placehold.co/400x240/020617/2563eb?text=Fleet+Management) | ![404](https://placehold.co/400x240/020617/4f46e5?text=Three.js+404) | ![login](https://placehold.co/400x240/020617/7c3aed?text=Auth+Pages) |

---

## ✨ Key Features

| Category | Features |
|---|---|
| 🚢 **Shipments** | Full CRUD, live status tracking, PDF invoice generation, QR scanner |
| 🗺️ **Live Tracking** | Public `/track/[id]` portal, real-time Leaflet map, WebSocket telemetry |
| 🚛 **Fleet Management** | Driver & vehicle management, availability status, route assignment |
| 📊 **Analytics** | Monthly comparisons, revenue metrics, shipment volume charts (Recharts) |
| 🔐 **Auth** | Email/password + Google OAuth, company auto-provisioning, JWT sessions |
| 🖼️ **Profile** | Cloudinary-powered avatar uploads, profile settings modal |
| 🌐 **Public Pages** | Marketing landing, About, Features — Three.js animated 404 page |
| 🏢 **Multi-Tenancy** | Every entity is scoped to a `Company` with strict data isolation |
| 🔑 **RBAC** | `SUPER_ADMIN`, `COMPANY_ADMIN`, `DISPATCHER`, `DRIVER` roles |

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Public["🌐 Public Internet"]
        Customer((Customer))
        Dispatcher((Dispatcher))
    end

    subgraph Frontend["▲ Next.js 15 (Vercel)"]
        LP[Landing / Marketing]
        Auth[Auth Pages]
        Dashboard[Dashboard App]
        Track[Public Track Portal]
    end

    subgraph Backend["🪺 NestJS 11 (Railway)"]
        API[REST API]
        WS[WebSocket Gateway]
        PDF[PDF Engine]
        Cloudinary[Cloudinary Service]
    end

    subgraph Data["🗄️ Data Layer"]
        DB[(PostgreSQL — Neon)]
        CDN[(Cloudinary CDN)]
    end

    Customer --> LP & Track
    Dispatcher --> Dashboard & Auth
    Dashboard --> API
    Track --> API
    Auth --> API
    API --> DB
    API --> Cloudinary --> CDN
    WS --> Dashboard
    PDF --> API
    API --> WS
```

---

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as User / Browser
    participant FE as Next.js (NextAuth)
    participant BE as NestJS (Passport)
    participant DB as PostgreSQL

    Note over U,DB: Email / Password Flow
    U->>FE: POST credentials
    FE->>BE: POST /auth/login
    BE->>DB: Find user by email
    DB-->>BE: User record
    BE->>BE: bcrypt.compare()
    BE-->>FE: { access_token, user }
    FE->>FE: Store JWT in session
    U->>FE: Access /dashboard
    FE->>BE: GET /analytics (Bearer JWT)
    BE->>BE: JwtAuthGuard validates
    BE-->>FE: Analytics data

    Note over U,DB: Google OAuth Flow
    U->>FE: Click "Continue with Google"
    FE->>FE: NextAuth GoogleProvider
    FE->>BE: POST /auth/oauth-login
    BE->>DB: Upsert user by email
    DB-->>BE: User record
    BE-->>FE: { access_token }
    FE-->>U: Redirect to /dashboard
```

---

## 🗺️ WebSocket Tracking Loop

```mermaid
graph LR
    BE[NestJS Server]
    GW((WebSocket Gateway))
    MAP[Leaflet Map Component]
    PIN[Driver Pin]

    BE -- emits locationUpdate --> GW
    GW -- broadcasts delta --> MAP
    MAP -- updates state --> PIN
    PIN -- re-renders --> MAP

    style GW fill:#2563eb,color:#fff,stroke:none
    style MAP fill:#4f46e5,color:#fff,stroke:none
```

---

## 🗄️ Data Model (ERD)

```mermaid
erDiagram
    COMPANY {
        uuid id PK
        string name
        datetime createdAt
    }
    USER {
        uuid id PK
        uuid companyId FK
        string email
        string role
        string firstName
        string lastName
        string avatarUrl
        string provider
    }
    DRIVER {
        uuid id PK
        uuid companyId FK
        uuid userId FK
        string contact
        enum status
        uuid vehicleId FK
    }
    VEHICLE {
        uuid id PK
        uuid companyId FK
        string licensePlate
        string type
        float capacity
        enum status
    }
    SHIPMENT {
        uuid id PK
        uuid companyId FK
        string trackingId
        string origin
        float originLat
        float originLng
        string destination
        float destinationLat
        float destinationLng
        enum status
        datetime expectedDelivery
        float cost
        uuid driverId FK
    }
    NOTIFICATION {
        uuid id PK
        uuid userId FK
        string message
        boolean isRead
    }

    COMPANY ||--o{ USER : "has"
    COMPANY ||--o{ DRIVER : "manages"
    COMPANY ||--o{ VEHICLE : "owns"
    COMPANY ||--o{ SHIPMENT : "processes"
    USER ||--o| DRIVER : "is"
    DRIVER ||--o| VEHICLE : "assigned"
    DRIVER ||--o{ SHIPMENT : "delivers"
    USER ||--o{ NOTIFICATION : "receives"
```

---

## 📦 Project Structure

```
logiboard/
│
├── backend/                        # NestJS API
│   ├── prisma/
│   │   ├── schema.prisma           # Full DB schema
│   │   └── seed.ts                 # Database seeder
│   └── src/
│       ├── auth/                   # JWT + OAuth + Passport
│       │   ├── auth.controller.ts  # Login, register, upload-avatar
│       │   ├── auth.service.ts     # Business logic
│       │   └── jwt.strategy.ts     # Token validation
│       ├── shipments/              # Shipment CRUD module
│       ├── drivers/                # Driver & fleet module
│       ├── invoices/               # PDF invoice generation (PDFKit)
│       ├── notifications/          # WebSocket notifications gateway
│       ├── common/
│       │   └── cloudinary.service.ts  # Cloudinary upload service
│       ├── analytics.service.ts    # Real-time KPIs & chart data
│       ├── analytics.controller.ts # Protected analytics endpoint
│       ├── public-analytics.controller.ts  # Public stats endpoint
│       └── track/
│           └── track.controller.ts # Public shipment tracking
│
└── frontend/                       # Next.js 15 App Router
    └── src/
        ├── app/
        │   ├── page.tsx            # Landing page (Three.js bg + live stats)
        │   ├── not-found.tsx       # Three.js animated 404 page
        │   ├── login/              # Auth page (matching design)
        │   ├── register/           # Auth page (matching design)
        │   ├── dashboard/          # Operations dashboard
        │   ├── shipments/          # Shipment table + invoice download
        │   ├── fleet/              # Driver & vehicle table
        │   ├── track/[id]/         # Public tracking portal
        │   ├── about/              # Marketing page
        │   ├── features/           # Features marketing page
        │   └── api/auth/           # NextAuth handler
        └── components/
            ├── Header.tsx          # Dashboard header with avatar
            ├── ProfileSettings.tsx # Cloudinary upload modal
            ├── MapTracker.tsx      # React-Leaflet live map
            ├── DashboardLayout.tsx # Sidebar layout wrapper
            └── PublicLayout.tsx    # Marketing layout wrapper
```

---

## 🔒 Security Model

```mermaid
graph TD
    Request([Incoming Request])
    IsPublic{Public Route?}
    JWT[JwtAuthGuard]
    Role[RoleGuard]
    Filter[Company Filter Applied]
    Handler[Route Handler]
    Reject([401 Unauthorized])

    Request --> IsPublic
    IsPublic -- Yes --> Handler
    IsPublic -- No --> JWT
    JWT -- Invalid --> Reject
    JWT -- Valid --> Role
    Role -- Insufficient --> Reject
    Role -- Sufficient --> Filter
    Filter --> Handler

    style Reject fill:#dc2626,color:#fff,stroke:none
    style Handler fill:#16a34a,color:#fff,stroke:none
    style JWT fill:#2563eb,color:#fff,stroke:none
```

**Public routes** (no auth needed):
- `GET /public-analytics/global-stats`
- `GET /public-analytics/recent-events`
- `GET /track/:trackingId` _(filtered response — no internal IDs or costs exposed)_
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/oauth-login`

**Protected routes** (Bearer JWT required):
- All `/shipments`, `/drivers`, `/analytics`, `/invoices` endpoints
- `GET /auth/profile`
- `POST /auth/upload-avatar`

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | `>= 20.x` |
| npm | `>= 9.x` |
| PostgreSQL | Any (Neon recommended) |

---

### 1. Clone the Repo

```bash
git clone https://github.com/pthanksdev/LogiBoard.git
cd LogiBoard
```

---

### 2. Configure Environment Variables

**Backend** — copy and fill in `backend/.env`:

```env
# Database (Neon PostgreSQL recommended)
DATABASE_URL="postgresql://user:password@host/db?schema=public&sslmode=verify-full"

# Authentication
JWT_SECRET="generate-a-long-random-secret-here"
PORT=3001
NODE_ENV="development"

# Cloudinary (for profile picture uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Frontend** — copy and fill in `frontend/.env`:

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-long-random-secret-here"

# API
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="http://localhost:3001"

# Google OAuth (https://console.cloud.google.com)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

> [!IMPORTANT]
> Never commit your `.env` files. They are listed in `.gitignore`.

---

### 3. Set Up the Backend

```bash
cd backend
npm install

# Push schema to database
npx prisma db push

# Seed with sample data (optional)
npx prisma db seed

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3001`.
Swagger UI at `http://localhost:3001/api`.

---

### 4. Set Up the Frontend

```bash
cd frontend
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🧩 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Create account + company |
| `POST` | `/auth/login` | ❌ | Email/password login |
| `POST` | `/auth/oauth-login` | ❌ | Google OAuth upsert |
| `GET` | `/auth/profile` | ✅ | Get current user profile |
| `POST` | `/auth/upload-avatar` | ✅ | Upload profile picture |
| `GET` | `/shipments` | ✅ | List company shipments |
| `GET` | `/shipments/:id/invoice` | ✅ | Download PDF invoice |
| `GET` | `/drivers` | ✅ | List company drivers |
| `GET` | `/analytics` | ✅ | Dashboard KPIs & charts |
| `GET` | `/track/:trackingId` | ❌ | Public shipment tracking |
| `GET` | `/public-analytics/global-stats` | ❌ | Platform-wide stats |
| `GET` | `/public-analytics/recent-events` | ❌ | Recent shipment events |

> Full interactive documentation available at **`/api`** (Swagger UI) when the backend is running.

---

## 🎨 Tech Stack Deep Dive

```mermaid
mindmap
  root((LogiBoard))
    Frontend
      Next.js 15
        App Router
        Server Components
      TailwindCSS
        Glassmorphism
        Custom Tokens
      Framer Motion
        Micro-animations
        Page Transitions
      Three.js
        404 Animation
        Particle Systems
      React Leaflet
        Live Map
        WebSocket Updates
      Recharts
        Line Charts
        Analytics
      NextAuth.js
        Google OAuth
        JWT Sessions
    Backend
      NestJS 11
        Modular Architecture
        Dependency Injection
      Passport.js
        JWT Strategy
        Guard Protection
      Socket.io
        WebSocket Gateway
        Real-time Events
      PDFKit
        Invoice Generation
        PDF Streaming
      Multer
        File Upload
        Buffer Handling
      Cloudinary
        Image CDN
        Transformations
    Database
      PostgreSQL
        Neon Serverless
        Connection Pooling
      Prisma ORM
        Type-safe Queries
        Auto Migrations
        Multi-tenancy
```

---

## 🏆 Role-Based Access Control

```mermaid
graph LR
    SA[🔴 SUPER_ADMIN]
    CA[🟠 COMPANY_ADMIN]
    DI[🟡 DISPATCHER]
    DR[🟢 DRIVER]

    SA --> |Manages all companies| Platform[(All Data)]
    CA --> |Manages own company| Company[(Company Data)]
    DI --> |Views & updates| Shipments[(Shipments)]
    DR --> |Views assigned| Routes[(Assigned Routes)]
```

| Permission | SUPER_ADMIN | COMPANY_ADMIN | DISPATCHER | DRIVER |
|---|:---:|:---:|:---:|:---:|
| View all companies | ✅ | ❌ | ❌ | ❌ |
| Manage company users | ✅ | ✅ | ❌ | ❌ |
| CRUD shipments | ✅ | ✅ | ✅ | ❌ |
| View fleet | ✅ | ✅ | ✅ | ❌ |
| Download invoices | ✅ | ✅ | ✅ | ❌ |
| View own profile | ✅ | ✅ | ✅ | ✅ |

---

## 🌍 Multi-Tenancy Model

Every entity in LogiBoard is scoped to a `Company`. When a user registers, a company is automatically provisioned for them. All API queries are automatically filtered by `companyId` based on the JWT payload — ensuring complete data isolation between tenants.

```
User A (Company: Acme Logistics)
  └── Can only see Acme's shipments, drivers, vehicles

User B (Company: Swift Freight)  
  └── Can only see Swift's shipments, drivers, vehicles

SUPER_ADMIN
  └── Can see data across ALL companies
```

---

## 📊 Analytics Engine

The analytics service calculates real KPIs from live database data — no hardcoded values.

- **Total Shipments** — Count vs. previous month
- **Active Drivers** — Currently `ON_ROUTE` status
- **On-Time Rate** — `DELIVERED / TOTAL * 100`
- **Revenue** — Sum of `cost` field for delivered shipments this month
- **7-Day Volume Chart** — Day-by-day shipment creation counts

---

## 🧪 Testing

```bash
# Frontend E2E tests (Playwright)
cd frontend
npx playwright test

# Backend linting
cd backend
npm run lint

# Frontend linting
cd frontend
npm run lint
```

---

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

The `docker-compose.yml` orchestrates:
- **Frontend** container (Next.js)
- **Backend** container (NestJS)

> **Note:** The PostgreSQL database connects to Neon (serverless) by default. To run a local DB, update `DATABASE_URL` in the compose file.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Built with ❤️ by **[pthanksdev](https://github.com/pthanksdev)**

⭐ **Star this repo** if you find it useful!

</div>
