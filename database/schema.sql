-- =========================================================================
-- MYTRAVEL.PK - COMPLETE PRODUCTION SQL SERVER DATABASE SCHEMA & SEED DATA
-- Database Engine: Microsoft SQL Server 2019 / 2022 / Azure SQL
-- =========================================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MyTravelDb')
BEGIN
    CREATE DATABASE MyTravelDb;
END
GO

USE MyTravelDb;
GO

-- 1. Users Table
IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        PhoneNumber NVARCHAR(30) NULL,
        Role NVARCHAR(30) NOT NULL DEFAULT 'Customer',
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        LastLoginAt DATETIME2 NULL
    );
END
GO

-- 2. Customer Profiles
IF OBJECT_ID('dbo.CustomerProfiles', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CustomerProfiles (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        PassportNumber NVARCHAR(50) NULL,
        PassportExpiryDate NVARCHAR(50) NULL,
        Nationality NVARCHAR(50) DEFAULT 'Pakistani',
        DateOfBirth NVARCHAR(20) NULL,
        Address NVARCHAR(200) NULL,
        City NVARCHAR(50) NULL
    );
END
GO

-- 3. Airports Table
IF OBJECT_ID('dbo.Airports', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Airports (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        IataCode NVARCHAR(5) NOT NULL UNIQUE,
        AirportName NVARCHAR(100) NOT NULL,
        City NVARCHAR(100) NOT NULL,
        Country NVARCHAR(100) NOT NULL,
        Latitude FLOAT NOT NULL,
        Longitude FLOAT NOT NULL,
        IsHubInPakistan BIT NOT NULL DEFAULT 0
    );
END
GO

-- 4. Airlines Table
IF OBJECT_ID('dbo.Airlines', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Airlines (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        AirlineCode NVARCHAR(5) NOT NULL UNIQUE,
        AirlineName NVARCHAR(100) NOT NULL,
        CountryOfOrigin NVARCHAR(100) NULL,
        LogoUrl NVARCHAR(250) NULL,
        IsDomesticInPakistan BIT NOT NULL DEFAULT 0
    );
END
GO

-- 5. Flight Bookings Table
IF OBJECT_ID('dbo.FlightBookings', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.FlightBookings (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        BookingReference NVARCHAR(50) NOT NULL UNIQUE,
        PinCode NVARCHAR(10) NOT NULL,
        UserId INT NULL FOREIGN KEY REFERENCES dbo.Users(Id),
        ContactName NVARCHAR(100) NOT NULL,
        ContactEmail NVARCHAR(150) NOT NULL,
        ContactPhone NVARCHAR(50) NOT NULL,
        OriginCode NVARCHAR(10) NOT NULL,
        DestinationCode NVARCHAR(10) NOT NULL,
        FlightNumber NVARCHAR(50) NOT NULL,
        AirlineName NVARCHAR(100) NOT NULL,
        DepartureDate NVARCHAR(50) NOT NULL,
        ReturnDate NVARCHAR(50) NULL,
        CabinClass NVARCHAR(50) DEFAULT 'Economy',
        SelectedSeat NVARCHAR(50) NULL,
        TotalAmount DECIMAL(18,2) NOT NULL,
        Currency NVARCHAR(10) DEFAULT 'PKR',
        BookingStatus NVARCHAR(50) DEFAULT 'Pending',
        PaymentStatus NVARCHAR(50) DEFAULT 'Pending',
        IsDemoMode BIT DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 6. Booking Passengers
IF OBJECT_ID('dbo.BookingPassengers', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.BookingPassengers (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FlightBookingId INT NOT NULL FOREIGN KEY REFERENCES dbo.FlightBookings(Id) ON DELETE CASCADE,
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        PassengerType NVARCHAR(20) DEFAULT 'Adult',
        PassportNumber NVARCHAR(50) NULL,
        DateOfBirth NVARCHAR(50) NULL,
        Gender NVARCHAR(20) DEFAULT 'Male'
    );
END
GO

-- 7. Visa Countries Table
IF OBJECT_ID('dbo.VisaCountries', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.VisaCountries (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        CountryName NVARCHAR(100) NOT NULL,
        Slug NVARCHAR(100) NOT NULL UNIQUE,
        CountryCode NVARCHAR(10) NULL,
        FlagUrl NVARCHAR(250) NULL,
        VisaType NVARCHAR(100) DEFAULT 'Tourist e-Visa',
        Validity NVARCHAR(50) DEFAULT '30 Days',
        StayDuration NVARCHAR(50) DEFAULT '30 Days',
        ProcessingTime NVARCHAR(50) DEFAULT '3 to 5 Days',
        StartingPrice DECIMAL(18,2) NOT NULL,
        Currency NVARCHAR(10) DEFAULT 'PKR',
        RequirementsHtml NVARCHAR(MAX) NULL,
        Description NVARCHAR(MAX) NULL,
        IsPublished BIT DEFAULT 1,
        IsTrending BIT DEFAULT 0
    );
END
GO

-- 8. Visa Applications Table
IF OBJECT_ID('dbo.VisaApplications', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.VisaApplications (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NULL FOREIGN KEY REFERENCES dbo.Users(Id),
        CountryName NVARCHAR(100) NOT NULL,
        ApplicantName NVARCHAR(100) NOT NULL,
        ApplicantEmail NVARCHAR(150) NOT NULL,
        ApplicantPhone NVARCHAR(50) NOT NULL,
        PassportNumber NVARCHAR(50) NULL,
        TravelDate NVARCHAR(50) NULL,
        Status NVARCHAR(50) DEFAULT 'Under Review',
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 9. Insurance Plans Table
IF OBJECT_ID('dbo.InsurancePlans', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.InsurancePlans (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        ProviderName NVARCHAR(100) NOT NULL,
        PlanName NVARCHAR(150) NOT NULL,
        CoverageType NVARCHAR(100) DEFAULT 'Schengen Embassy Approved',
        Duration NVARCHAR(50) DEFAULT '15 Days',
        OriginalPrice DECIMAL(18,2) NOT NULL,
        DiscountedPrice DECIMAL(18,2) NOT NULL,
        DiscountPercentage INT DEFAULT 20,
        CoverageFeatures NVARCHAR(MAX) NULL,
        IsActive BIT DEFAULT 1
    );
END
GO

-- 10. Insurance Inquiries Table
IF OBJECT_ID('dbo.InsuranceInquiries', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.InsuranceInquiries (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NULL FOREIGN KEY REFERENCES dbo.Users(Id),
        CustomerName NVARCHAR(100) NOT NULL,
        CustomerEmail NVARCHAR(150) NOT NULL,
        CustomerPhone NVARCHAR(50) NOT NULL,
        DestinationCountry NVARCHAR(100) NULL,
        TravelDuration NVARCHAR(50) NULL,
        PolicyType NVARCHAR(50) DEFAULT 'Individual',
        Status NVARCHAR(50) DEFAULT 'New Inquiry',
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 11. Payments Table (Receipt Verification)
IF OBJECT_ID('dbo.Payments', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Payments (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FlightBookingId INT NULL FOREIGN KEY REFERENCES dbo.FlightBookings(Id),
        TransactionReference NVARCHAR(100) NOT NULL,
        ReceiptNumber NVARCHAR(50) NOT NULL UNIQUE,
        CustomerAccountNumber NVARCHAR(50) NOT NULL,
        Amount DECIMAL(18,2) NOT NULL,
        Currency NVARCHAR(10) DEFAULT 'PKR',
        GatewayName NVARCHAR(50) DEFAULT 'Demo Gateway',
        Status NVARCHAR(50) DEFAULT 'Verified',
        PaymentDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 12. Airline Offices Directory Table
IF OBJECT_ID('dbo.AirlineOffices', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.AirlineOffices (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        AirlineName NVARCHAR(100) NOT NULL,
        AirlineCode NVARCHAR(10) NOT NULL,
        BasedIn NVARCHAR(100) NULL,
        HubAirport NVARCHAR(100) NULL,
        OperatingAirports NVARCHAR(200) NULL,
        OfficeAddress NVARCHAR(250) NULL,
        Phone NVARCHAR(100) NULL,
        Website NVARCHAR(150) NULL,
        City NVARCHAR(50) DEFAULT 'Pakistan'
    );
END
GO

-- 13. Contact Inquiries Table
IF OBJECT_ID('dbo.ContactInquiries', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ContactInquiries (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL,
        Phone NVARCHAR(50) NULL,
        Subject NVARCHAR(150) NULL,
        Message NVARCHAR(MAX) NOT NULL,
        SubmittedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        IsResolved BIT DEFAULT 0
    );
END
GO

-- 14. Website Settings Table
IF OBJECT_ID('dbo.WebsiteSettings', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.WebsiteSettings (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        SettingKey NVARCHAR(100) NOT NULL UNIQUE,
        SettingValue NVARCHAR(MAX) NOT NULL,
        Description NVARCHAR(200) NULL
    );
END
GO

PRINT 'MyTravel.pk Database Schema created successfully.';
