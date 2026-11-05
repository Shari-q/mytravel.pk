# MYTRAVEL.PK - SETUP & DEPLOYMENT INSTRUCTIONS

## 1. System Overview
**MyTravel.pk** is an enterprise-grade 3D travel booking and inquiry platform developed for Pakistan's premier licensed travel agency. It provides:
- High-performance, modular HTML5/CSS3/Vanilla JS frontend with Three.js 3D Earth Globe and Boeing 777 interactive cabin seat selector.
- ASP.NET Core 8 Web API backend (`C#`).
- Entity Framework Core with dual database support (SQLite zero-dependency development default & Microsoft SQL Server 2019/2022 production schema).
- RESTful endpoints for flight search, e-visas, embassy-approved insurance, booking tracking, receipt verification, customer portal, and admin management.

---

## 2. Prerequisites
- **.NET 8 SDK** (Installed at `C:\Users\PC\.dotnet\dotnet.exe`).
- **Node.js** (v18+ or v24+ for helper scripts and automation).
- Any modern web browser supporting WebGL (Chrome, Edge, Safari, Firefox).
- Microsoft SQL Server (Optional, required for SQL Server production instances; SQLite runs automatically out of the box).

---

## 3. Quick Start (Local Run)

### Step 1: Open Terminal & Navigate to Project Root
```bash
cd "C:\Users\PC\.gemini\antigravity\scratch\MyTravel\backend"
```

### Step 2: Build and Run Backend
```bash
dotnet build
dotnet run --urls "http://localhost:5200"
```
The application will:
1. Initialize the database (`database/mytravel.db`) and seed verified airports, airlines, visa fees, insurance plans, admin and customer accounts.
2. Host the RESTful Web API and Swagger UI at `http://localhost:5200/swagger`.
3. Serve the entire frontend directly at `http://localhost:5200/index.html`.

### Step 3: Access the Platform
- **Public Homepage**: [http://localhost:5200/index.html](http://localhost:5200/index.html)
- **Flight Engine**: [http://localhost:5200/pages/flights.html](http://localhost:5200/pages/flights.html)
- **Track Booking**: [http://localhost:5200/pages/mybooking.html](http://localhost:5200/pages/mybooking.html)
- **Verify Receipt**: [http://localhost:5200/pages/receipt-verify.html](http://localhost:5200/pages/receipt-verify.html)
- **Customer Portal**: [http://localhost:5200/pages/customer/login.html](http://localhost:5200/pages/customer/login.html)
- **Admin Portal**: [http://localhost:5200/pages/admin/login.html](http://localhost:5200/pages/admin/login.html)

---

## 4. Default Credentials (Seeded)

| Account | Email | Password | Role |
|---|---|---|---|
| **Super Admin** | `admin@mytravel.pk` | `Admin@123` | Administrator |
| **Demo Customer** | `customer@mytravel.pk` | `Customer@123` | Customer |
| **Demo Booking** | Reference: `MT-78492` | PIN: `4892` | Verified Flight |
| **Demo Payment Receipt** | Receipt: `MT-REC-90214` | Account: `PKR-489211` | Cleared & Verified |

---

## 5. Production Microsoft SQL Server Setup
To use Microsoft SQL Server:
1. Open SQL Server Management Studio (SSMS) or Azure Data Studio.
2. Run `database/schema.sql`.
3. In `backend/appsettings.json`, set:
```json
{
  "DatabaseProvider": "SqlServer",
  "ConnectionStrings": {
    "SqlServerConnection": "Server=YOUR_SQL_SERVER;Database=MyTravelDb;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True"
  }
}
```

---

## 6. IIS & Cloudflare Deployment
1. Publish the backend using:
   ```bash
   dotnet publish -c Release -o C:\inetpub\wwwroot\mytravel
   ```
2. In IIS Manager, create a new site mapped to `C:\inetpub\wwwroot\mytravel`.
3. Ensure ASP.NET Core Hosting Bundle 8.0 is installed on Windows Server.
4. Set up Cloudflare SSL/TLS to "Full (Strict)" and point DNS A records to your server IP.
