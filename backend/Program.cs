using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MyTravel.Backend.Data;
using MyTravel.Backend.Integrations;
using System;
using System.IO;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var jwtSecret = jwtSettings["Secret"];
if (string.IsNullOrWhiteSpace(jwtSecret) || Encoding.UTF8.GetByteCount(jwtSecret) < 32)
{
    throw new InvalidOperationException("JwtSettings:Secret must be configured with at least 32 bytes.");
}

if (builder.Environment.IsProduction())
{
    var adminEmail = builder.Configuration["Admin:Email"];
    var adminPassword = builder.Configuration["Admin:Password"];
    if (string.IsNullOrWhiteSpace(adminEmail) || string.IsNullOrWhiteSpace(adminPassword) || adminPassword.Length < 12)
    {
        throw new InvalidOperationException("Production requires Admin:Email and an Admin:Password of at least 12 characters.");
    }
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidateAudience = true,
            ValidAudience = jwtSettings["Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1),
            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.Name
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "MyTravel.pk Web API",
        Version = "v1",
        Description = "Official RESTful Backend for MyTravel.pk Travel & Flight Booking Platform."
    });
});

// Configure Database (Dual support: SQLite default for instant zero-dependency execution + SQL Server)
var dbType = builder.Configuration.GetValue<string>("DatabaseProvider") ?? "Sqlite";
var sqlServerConn = builder.Configuration.GetConnectionString("SqlServerConnection");
var dbDir = Path.Combine(builder.Environment.ContentRootPath, "..", "database");
var sqlitePath = builder.Configuration["MYTRAVEL_DB_PATH"] ?? Path.Combine(dbDir, "mytravel.db");
Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(sqlitePath))!);

if (dbType.Equals("SqlServer", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(sqlServerConn))
{
    builder.Services.AddDbContext<MyTravelDbContext>(options =>
        options.UseSqlServer(sqlServerConn));
}
else
{
    builder.Services.AddDbContext<MyTravelDbContext>(options =>
        options.UseSqlite($"Data Source={sqlitePath}"));
}

// Register Adapter Integrations
builder.Services.AddScoped<IFlightProviderAdapter, DemoFlightProviderAdapter>();
builder.Services.AddScoped<IPaymentGatewayAdapter, DemoPaymentGatewayAdapter>();

// Configure CORS for Frontend
builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
    options.AddPolicy("Frontend", p =>
    {
        p.WithOrigins(allowedOrigins)
         .AllowAnyMethod()
         .AllowAnyHeader();
    });
});

var app = builder.Build();

// Auto-migrate & seed database
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<MyTravelDbContext>();
        db.Database.EnsureCreated();
        var adminEmail = builder.Configuration["Admin:Email"]?.Trim();
        var adminPassword = builder.Configuration["Admin:Password"];
        if (!string.IsNullOrWhiteSpace(adminEmail) && !string.IsNullOrWhiteSpace(adminPassword))
        {
            if (adminPassword.Length < 12)
            {
                throw new InvalidOperationException("Admin:Password must contain at least 12 characters.");
            }

            var admin = await db.Users.FirstOrDefaultAsync(user => user.Email == adminEmail.ToLowerInvariant());
            if (admin == null)
            {
                db.Users.Add(new MyTravel.Backend.Models.User
                {
                    FullName = "MyTravel Administrator",
                    Email = adminEmail.ToLowerInvariant(),
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                    Role = "Admin",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                });
                await db.SaveChangesAsync();
            }
            else if (!string.Equals(admin.Role, "Admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Configured administrator email belongs to a non-admin account.");
            }
        }

        logger.LogInformation("Database initialized and verified successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Database initialization failed.");
        throw;
    }
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyTravel.pk API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// Serve frontend static files
var frontendPath = Path.GetFullPath(Path.Combine(builder.Environment.ContentRootPath, "..", "frontend"));
if (Directory.Exists(frontendPath))
{
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(frontendPath),
        RequestPath = ""
    });
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(frontendPath),
        RequestPath = ""
    });
}

app.MapControllers();

app.Run();
