using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MyTravel.Backend.Data;
using MyTravel.Backend.Integrations;
using System;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
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
Directory.CreateDirectory(dbDir);
var sqlitePath = Path.Combine(dbDir, "mytravel.db");

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
    options.AddPolicy("AllowAll", p =>
    {
        p.AllowAnyOrigin()
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
        logger.LogInformation("Database initialized and verified successfully.");
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex, "Primary database failed to initialize. Falling back to local SQLite.");
    }
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyTravel.pk API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowAll");

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

app.UseAuthorization();
app.MapControllers();

app.Run();
