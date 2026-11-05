using Microsoft.EntityFrameworkCore;
using MyTravel.Backend.Models;
using System;

namespace MyTravel.Backend.Data
{
    public class MyTravelDbContext : DbContext
    {
        public MyTravelDbContext(DbContextOptions<MyTravelDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<CustomerProfile> CustomerProfiles => Set<CustomerProfile>();
        public DbSet<Airport> Airports => Set<Airport>();
        public DbSet<Airline> Airlines => Set<Airline>();
        public DbSet<FlightBooking> FlightBookings => Set<FlightBooking>();
        public DbSet<BookingPassenger> BookingPassengers => Set<BookingPassenger>();
        public DbSet<VisaCountry> VisaCountries => Set<VisaCountry>();
        public DbSet<VisaApplication> VisaApplications => Set<VisaApplication>();
        public DbSet<InsurancePlan> InsurancePlans => Set<InsurancePlan>();
        public DbSet<InsuranceInquiry> InsuranceInquiries => Set<InsuranceInquiry>();
        public DbSet<Excursion> Excursions => Set<Excursion>();
        public DbSet<Destination> Destinations => Set<Destination>();
        public DbSet<TravelNews> TravelNews => Set<TravelNews>();
        public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
        public DbSet<AirlineOffice> AirlineOffices => Set<AirlineOffice>();
        public DbSet<ContactInquiry> ContactInquiries => Set<ContactInquiry>();
        public DbSet<Payment> Payments => Set<Payment>();
        public DbSet<WebsiteSetting> WebsiteSettings => Set<WebsiteSetting>();
        public DbSet<NewsletterSubscriber> NewsletterSubscribers => Set<NewsletterSubscriber>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User unique email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Booking unique reference
            modelBuilder.Entity<FlightBooking>()
                .HasIndex(b => b.BookingReference)
                .IsUnique();

            // Seed Demo Customer with a BCrypt hash
            string customerHash = BCrypt.Net.BCrypt.HashPassword("Customer@123");

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 2,
                    FullName = "Hamza Tariq",
                    Email = "customer@mytravel.pk",
                    PasswordHash = customerHash,
                    PhoneNumber = "0300-1234567",
                    Role = "Customer",
                    IsActive = true,
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // Seed Airports
            modelBuilder.Entity<Airport>().HasData(
                new Airport { Id = 1, IataCode = "KHI", AirportName = "Jinnah International Airport", City = "Karachi", Country = "Pakistan", Latitude = 24.9065, Longitude = 67.1608, IsHubInPakistan = true },
                new Airport { Id = 2, IataCode = "LHE", AirportName = "Allama Iqbal International Airport", City = "Lahore", Country = "Pakistan", Latitude = 31.5216, Longitude = 74.4036, IsHubInPakistan = true },
                new Airport { Id = 3, IataCode = "ISB", AirportName = "Islamabad International Airport", City = "Islamabad", Country = "Pakistan", Latitude = 33.5651, Longitude = 72.8517, IsHubInPakistan = true },
                new Airport { Id = 4, IataCode = "DXB", AirportName = "Dubai International Airport", City = "Dubai", Country = "United Arab Emirates", Latitude = 25.2532, Longitude = 55.3657, IsHubInPakistan = false },
                new Airport { Id = 5, IataCode = "DOH", AirportName = "Hamad International Airport", City = "Doha", Country = "Qatar", Latitude = 25.2731, Longitude = 51.6081, IsHubInPakistan = false },
                new Airport { Id = 6, IataCode = "LHR", AirportName = "Heathrow Airport", City = "London", Country = "United Kingdom", Latitude = 51.4700, Longitude = -0.4543, IsHubInPakistan = false },
                new Airport { Id = 7, IataCode = "GYD", AirportName = "Heydar Aliyev International", City = "Baku", Country = "Azerbaijan", Latitude = 40.4675, Longitude = 50.0469, IsHubInPakistan = false },
                new Airport { Id = 8, IataCode = "BKK", AirportName = "Suvarnabhumi Airport", City = "Bangkok", Country = "Thailand", Latitude = 13.6900, Longitude = 100.7501, IsHubInPakistan = false },
                new Airport { Id = 9, IataCode = "KUL", AirportName = "Kuala Lumpur International", City = "Kuala Lumpur", Country = "Malaysia", Latitude = 2.7456, Longitude = 101.7072, IsHubInPakistan = false }
            );

            // Seed Verified Visa Countries
            modelBuilder.Entity<VisaCountry>().HasData(
                new VisaCountry
                {
                    Id = 1,
                    CountryName = "Azerbaijan",
                    Slug = "azerbaijan",
                    CountryCode = "AZ",
                    VisaType = "e-Visa",
                    Validity = "30 Days",
                    StayDuration = "30 Days",
                    ProcessingTime = "3 to 4 Days",
                    StartingPrice = 12000,
                    IsPublished = true,
                    IsTrending = true,
                    Description = "A blend of European and Asian culture and architecture. The capital Baku is full of historic palaces and modern marvels.",
                    RequirementsHtml = "First page of passport (valid at least 6 months), CNIC front/back scan, Hotel address in Azerbaijan."
                },
                new VisaCountry
                {
                    Id = 2,
                    CountryName = "Thailand",
                    Slug = "thailand",
                    CountryCode = "TH",
                    VisaType = "e-Visa",
                    Validity = "3 Months",
                    StayDuration = "30 Days",
                    ProcessingTime = "5 to 7 Days",
                    StartingPrice = 17500,
                    IsPublished = true,
                    IsTrending = true,
                    Description = "Top choice for Pakistani travelers, offering vibrant cities, tropical beaches, and rich cultural experiences.",
                    RequirementsHtml = "Passport scan (6 months validity), CNIC front/back, fresh 3-month bank statement with account maintenance letter, white-background photo."
                },
                new VisaCountry
                {
                    Id = 3,
                    CountryName = "Malaysia",
                    Slug = "malaysia",
                    CountryCode = "MY",
                    VisaType = "e-Visa",
                    Validity = "30 Days",
                    StayDuration = "30 Days",
                    ProcessingTime = "3 to 5 Days",
                    StartingPrice = 12000,
                    IsPublished = true,
                    IsTrending = true,
                    Description = "Ideal destination for family holidays. Enjoy tropical weather and world-class attractions.",
                    RequirementsHtml = "Passport scan (7 months validity), CNIC front/back, bank statement last 6 months (min PKR 500k), photo with dark shirt."
                },
                new VisaCountry
                {
                    Id = 4,
                    CountryName = "Singapore",
                    Slug = "singapore",
                    CountryCode = "SG",
                    VisaType = "e-Visa",
                    Validity = "30 Days",
                    StayDuration = "30 Days",
                    ProcessingTime = "4 to 6 Days",
                    StartingPrice = 18500,
                    IsPublished = true,
                    IsTrending = false,
                    Description = "Futuristic city-state with iconic skyline, Marina Bay Sands, Sentosa Island and botanic gardens.",
                    RequirementsHtml = "Passport scan (6 months validity), CNIC scan, bank statement last 6 months, return ticket & hotel voucher."
                }
            );

            // Seed Insurance Plans
            modelBuilder.Entity<InsurancePlan>().HasData(
                new InsurancePlan
                {
                    Id = 1,
                    ProviderName = "Adamjee Insurance",
                    PlanName = "Schengen Embassy Approved Standard",
                    CoverageType = "Schengen & Europe",
                    Duration = "15 Days",
                    OriginalPrice = 6000,
                    DiscountedPrice = 4800,
                    DiscountPercentage = 20,
                    CoverageFeatures = "€30,000 Medical Coverage, Repatriation, Baggage Loss, Embassy Accepted Guaranteed",
                    IsActive = true
                },
                new InsurancePlan
                {
                    Id = 2,
                    ProviderName = "Adamjee Insurance",
                    PlanName = "Worldwide Gold Protection",
                    CoverageType = "Worldwide (USA/Canada)",
                    Duration = "30 Days",
                    OriginalPrice = 10625,
                    DiscountedPrice = 8500,
                    DiscountPercentage = 20,
                    CoverageFeatures = "$50,000 Medical Coverage, Flight Delay, Trip Cancellation, 24/7 Global Assistance",
                    IsActive = true
                },
                new InsurancePlan
                {
                    Id = 3,
                    ProviderName = "United Insurance Company (UIC)",
                    PlanName = "UIC Schengen Smart Saver",
                    CoverageType = "Schengen & Europe",
                    Duration = "15 Days",
                    OriginalPrice = 5250,
                    DiscountedPrice = 4200,
                    DiscountPercentage = 20,
                    CoverageFeatures = "€30,000 Medical Coverage, Instant PDF delivery, Embassy Accepted",
                    IsActive = true
                }
            );

            // Seed Excursions
            modelBuilder.Entity<Excursion>().HasData(
                new Excursion
                {
                    Id = 1,
                    Title = "Lahore Airport Premium Lounge Access - International",
                    Slug = "lahore-airport-lounge",
                    City = "Lahore",
                    Country = "Pakistan",
                    Price = 6200,
                    Currency = "PKR",
                    Description = "Enjoy luxury executive lounge access before boarding at Allama Iqbal International Airport.",
                    IncludedFeatures = "Buffet Snacks, Unlimited Hot/Cold Beverages, High-Speed Wi-Fi, Shower Facilities",
                    IsFeatured = true
                },
                new Excursion
                {
                    Id = 2,
                    Title = "Islamabad Airport Premium Lounge Access - International",
                    Slug = "islamabad-airport-lounge",
                    City = "Islamabad",
                    Country = "Pakistan",
                    Price = 7400,
                    Currency = "PKR",
                    Description = "Relax before your departure with premier dining and comfortable seating at Islamabad International.",
                    IncludedFeatures = "Gourmet Buffet, Refreshments, Quiet Workstation Pods, Fast Wi-Fi",
                    IsFeatured = true
                }
            );

            // Seed Airline Offices (from mytravel.pk audit)
            modelBuilder.Entity<AirlineOffice>().HasData(
                new AirlineOffice
                {
                    Id = 1,
                    AirlineName = "Pakistan International Airlines (PIA)",
                    AirlineCode = "PK",
                    BasedIn = "Pakistan",
                    HubAirport = "Karachi (KHI) / Islamabad (ISB)",
                    OperatingAirports = "KHI, LHE, ISB, PEW, MUX, SKT, UET",
                    OfficeAddress = "PIA Booking Office, Egerton Road, Lahore / Head Office Karachi Airport",
                    Phone = "111-786-786",
                    Website = "https://piac.com.pk",
                    City = "Lahore & Karachi"
                },
                new AirlineOffice
                {
                    Id = 2,
                    AirlineName = "Emirates",
                    AirlineCode = "EK",
                    BasedIn = "United Arab Emirates",
                    HubAirport = "Dubai (DXB)",
                    OperatingAirports = "KHI, LHE, ISB, PEW, MUX, SKT",
                    OfficeAddress = "Emirates Town Office, Gulberg III, Lahore",
                    Phone = "+92 42 3578 9800",
                    Website = "https://emirates.com",
                    City = "Lahore"
                },
                new AirlineOffice
                {
                    Id = 3,
                    AirlineName = "AirSial",
                    AirlineCode = "PF",
                    BasedIn = "Pakistan",
                    HubAirport = "Sialkot (SKT) / Karachi (KHI)",
                    OperatingAirports = "KHI, LHE, ISB, PEW, MUX, SKT",
                    OfficeAddress = "AirSial Head Office, Kashmir Road, Sialkot",
                    Phone = "021-111-247-742",
                    Website = "https://airsial.com",
                    City = "Sialkot & Karachi"
                }
            );

            // Seed Travel News
            modelBuilder.Entity<TravelNews>().HasData(
                new TravelNews
                {
                    Id = 1,
                    Title = "Foreign Currency Export Regulations for Travelers from Pakistan",
                    Slug = "currency-export-rules-pakistan",
                    Category = "Travel Advisory",
                    Content = "State Bank of Pakistan regulations allow Pakistani passengers traveling abroad up to specific foreign currency limits per calendar year. Ensure compliance at customs.",
                    PublishedAt = new DateTime(2026, 2, 10, 0, 0, 0, DateTimeKind.Utc)
                },
                new TravelNews
                {
                    Id = 2,
                    Title = "Riyadh Air Announces Direct Flights to Pakistan",
                    Slug = "riyadh-air-pakistan-flights",
                    Category = "Airline Update",
                    Content = "Saudi Arabia's newest carrier Riyadh Air plans to launch direct routes connecting Riyadh with major Pakistani cities including Islamabad and Karachi.",
                    PublishedAt = new DateTime(2026, 3, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // Seed Website Settings
            modelBuilder.Entity<WebsiteSetting>().HasData(
                new WebsiteSetting { Id = 1, SettingKey = "BrandName", SettingValue = "MyTravel.pk", Description = "Official portal brand name" },
                new WebsiteSetting { Id = 2, SettingKey = "SupportPhone", SettingValue = "03111-101-365", Description = "UAN Support hotline" },
                new WebsiteSetting { Id = 3, SettingKey = "WhatsAppNumber", SettingValue = "+923111101365", Description = "Official WhatsApp line" },
                new WebsiteSetting { Id = 4, SettingKey = "SupportEmail", SettingValue = "hello@mytravel.pk", Description = "Customer support email" },
                new WebsiteSetting { Id = 5, SettingKey = "HeadOffice", SettingValue = "Office No. 310, Al-Hafeez Business Center, 89-A Block B3, Firdous Market Road, Gulberg-III, Lahore, Pakistan", Description = "Verified registered head office" },
                new WebsiteSetting { Id = 6, SettingKey = "DtsLicense", SettingValue = "Licensed by Department of Tourist Services (DTS)", Description = "Government travel agency license" },
                new WebsiteSetting { Id = 7, SettingKey = "IataMembership", SettingValue = "IATA TIDS Member", Description = "IATA Travel Industry Designator Service" }
            );

            // Seed Verified Demo Booking & Payment for tracking
            modelBuilder.Entity<FlightBooking>().HasData(
                new FlightBooking
                {
                    Id = 1,
                    BookingReference = "MT-78492",
                    PinCode = "4892",
                    UserId = 2,
                    ContactName = "Hamza Tariq",
                    ContactEmail = "customer@mytravel.pk",
                    ContactPhone = "0300-1234567",
                    OriginCode = "KHI",
                    DestinationCode = "DXB",
                    FlightNumber = "EK 601",
                    AirlineName = "Emirates",
                    DepartureDate = "2026-11-20",
                    ReturnDate = "2026-11-28",
                    CabinClass = "Economy",
                    SelectedSeat = "14B",
                    TotalAmount = 82700,
                    Currency = "PKR",
                    BookingStatus = "Confirmed",
                    PaymentStatus = "Paid",
                    IsDemoMode = true,
                    CreatedAt = new DateTime(2026, 10, 15, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            modelBuilder.Entity<Payment>().HasData(
                new Payment
                {
                    Id = 1,
                    FlightBookingId = 1,
                    TransactionReference = "TXN-99482103",
                    ReceiptNumber = "MT-REC-90214",
                    CustomerAccountNumber = "PKR-489211",
                    Amount = 82700,
                    Currency = "PKR",
                    GatewayName = "Demo Verified Gateway",
                    Status = "Verified",
                    PaymentDate = new DateTime(2026, 10, 15, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}
