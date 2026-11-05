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
cd backend
```

### Step 2: Build and Run Backend
```bash
dotnet build
```

Set a local administrator password (at least 12 characters), then start the API:
```powershell
$env:Admin__Email = "admin@mytravel.pk"
$env:Admin__Password = "choose-a-private-password"
dotnet run --urls "http://localhost:5200"
```
The application will:
1. Initialize the database (`database/mytravel.db`), seed demo content and create the configured administrator if it does not exist.
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

## 4. Demo Accounts

| Account | Email | Password | Role |
|---|---|---|---|
| **Demo Customer** | `customer@mytravel.pk` | `Customer@123` | Customer |
| **Demo Booking** | Reference: `MT-78492` | PIN: `4892` | Verified Flight |
| **Demo Payment Receipt** | Receipt: `MT-REC-90214` | Account: `PKR-489211` | Cleared & Verified |

There is no public default administrator password. The administrator is provisioned from `Admin:Email` and `Admin:Password` configuration on first startup.

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

## 6. GitHub Pages + Render Deployment

GitHub Pages hosts the static frontend only. The ASP.NET API and its SQLite database run separately on Render.

1. Push the repository to GitHub. In **Settings → Pages**, set the source to **GitHub Actions**. The workflow publishes only the root redirect and `frontend/` files.
2. In Render, create a **Blueprint** from this repository and apply `render.yaml`. The API blueprint uses a paid Starter service and a persistent disk so the SQLite database survives restarts.
3. When prompted for secret environment values, set:
   - `Admin__Password`: a unique password with at least 12 characters.
   - `JwtSettings__Secret`: a randomly generated secret with at least 32 bytes.
   Do not commit either secret to the repository.
4. The frontend is configured for `https://mytravel-pk-api.onrender.com`. If Render assigns a different service URL, update `window.MYTRAVEL_API_ORIGIN` in `frontend/js/config.js` and push the change.
5. Push to `main` to publish the website. The admin login URL is `https://shari-q.github.io/mytravel.pk/frontend/pages/admin/login.html`; use the administrator email and password configured in Render.

The admin API requires a signed JWT and an Admin role. If the Render service is stopped, still starting, or has not been configured with its secrets, login will report an API connection error rather than entering demo mode.

## 7. IIS & Cloudflare Deployment
1. Publish the backend using:
   ```bash
   dotnet publish -c Release -o C:\inetpub\wwwroot\mytravel
   ```
2. In IIS Manager, create a new site mapped to `C:\inetpub\wwwroot\mytravel`.
3. Ensure ASP.NET Core Hosting Bundle 8.0 is installed on Windows Server.
4. Configure `JwtSettings__Secret`, `Admin__Email`, and `Admin__Password` as server environment variables before starting the API.
5. Set up Cloudflare SSL/TLS to "Full (Strict)" and point DNS A records to your server IP. Add the website origin to `Cors:AllowedOrigins`.
