using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyTravel.Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        [MaxLength(30)]
        public string PhoneNumber { get; set; } = string.Empty;
        [MaxLength(30)]
        public string Role { get; set; } = "Customer"; // "Customer" or "Admin"
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        
        public CustomerProfile? Profile { get; set; }
        public ICollection<FlightBooking> Bookings { get; set; } = new List<FlightBooking>();
        public ICollection<VisaApplication> VisaApplications { get; set; } = new List<VisaApplication>();
        public ICollection<InsuranceInquiry> InsuranceInquiries { get; set; } = new List<InsuranceInquiry>();
    }

    public class CustomerProfile
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        [MaxLength(50)]
        public string PassportNumber { get; set; } = string.Empty;
        [MaxLength(50)]
        public string PassportExpiryDate { get; set; } = string.Empty;
        [MaxLength(50)]
        public string Nationality { get; set; } = "Pakistani";
        [MaxLength(20)]
        public string DateOfBirth { get; set; } = string.Empty;
        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;
        [MaxLength(50)]
        public string City { get; set; } = string.Empty;
    }

    public class Airport
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(5)]
        public string IataCode { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string AirportName { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string City { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Country { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsHubInPakistan { get; set; }
    }

    public class Airline
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(5)]
        public string AirlineCode { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string AirlineName { get; set; } = string.Empty;
        [MaxLength(100)]
        public string CountryOfOrigin { get; set; } = string.Empty;
        [MaxLength(250)]
        public string LogoUrl { get; set; } = string.Empty;
        public bool IsDomesticInPakistan { get; set; }
    }

    public class FlightBooking
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(50)]
        public string BookingReference { get; set; } = string.Empty; // e.g. "MT-78492"
        [Required, MaxLength(10)]
        public string PinCode { get; set; } = string.Empty; // 4-digit secure tracking PIN
        public int? UserId { get; set; }
        public User? User { get; set; }
        [Required, MaxLength(100)]
        public string ContactName { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string ContactEmail { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string ContactPhone { get; set; } = string.Empty;

        [Required, MaxLength(10)]
        public string OriginCode { get; set; } = string.Empty;
        [Required, MaxLength(10)]
        public string DestinationCode { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string FlightNumber { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string AirlineName { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string DepartureDate { get; set; } = string.Empty;
        [MaxLength(50)]
        public string ReturnDate { get; set; } = string.Empty;
        [MaxLength(50)]
        public string CabinClass { get; set; } = "Economy";
        [MaxLength(50)]
        public string SelectedSeat { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        [MaxLength(10)]
        public string Currency { get; set; } = "PKR";
        [MaxLength(50)]
        public string BookingStatus { get; set; } = "Pending"; // "Confirmed", "Pending", "Cancelled"
        [MaxLength(50)]
        public string PaymentStatus { get; set; } = "Pending"; // "Paid", "Pending", "Failed"
        public bool IsDemoMode { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<BookingPassenger> Passengers { get; set; } = new List<BookingPassenger>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }

    public class BookingPassenger
    {
        [Key]
        public int Id { get; set; }
        public int FlightBookingId { get; set; }
        public FlightBooking? FlightBooking { get; set; }
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        [MaxLength(20)]
        public string PassengerType { get; set; } = "Adult"; // "Adult", "Child", "Infant"
        [MaxLength(50)]
        public string PassportNumber { get; set; } = string.Empty;
        [MaxLength(50)]
        public string DateOfBirth { get; set; } = string.Empty;
        [MaxLength(20)]
        public string Gender { get; set; } = "Male";
    }

    public class VisaCountry
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string CountryName { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Slug { get; set; } = string.Empty;
        [MaxLength(10)]
        public string CountryCode { get; set; } = string.Empty;
        [MaxLength(250)]
        public string FlagUrl { get; set; } = string.Empty;
        [MaxLength(100)]
        public string VisaType { get; set; } = "Tourist e-Visa";
        [MaxLength(50)]
        public string Validity { get; set; } = "30 Days";
        [MaxLength(50)]
        public string StayDuration { get; set; } = "30 Days";
        [MaxLength(50)]
        public string ProcessingTime { get; set; } = "3 to 5 Working Days";
        [Column(TypeName = "decimal(18,2)")]
        public decimal StartingPrice { get; set; }
        [MaxLength(10)]
        public string Currency { get; set; } = "PKR";
        public string RequirementsHtml { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsPublished { get; set; } = true;
        public bool IsTrending { get; set; } = false;
    }

    public class VisaApplication
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        [Required, MaxLength(100)]
        public string CountryName { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string ApplicantName { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string ApplicantEmail { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string ApplicantPhone { get; set; } = string.Empty;
        [MaxLength(50)]
        public string PassportNumber { get; set; } = string.Empty;
        [MaxLength(50)]
        public string TravelDate { get; set; } = string.Empty;
        [MaxLength(50)]
        public string Status { get; set; } = "Under Review";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class InsurancePlan
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string ProviderName { get; set; } = "Adamjee Insurance"; // Adamjee or United Insurance
        [Required, MaxLength(150)]
        public string PlanName { get; set; } = string.Empty;
        [MaxLength(100)]
        public string CoverageType { get; set; } = "Schengen Embassy Approved";
        [MaxLength(50)]
        public string Duration { get; set; } = "15 Days";
        [Column(TypeName = "decimal(18,2)")]
        public decimal OriginalPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountedPrice { get; set; }
        public int DiscountPercentage { get; set; } = 20;
        public string CoverageFeatures { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

    public class InsuranceInquiry
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        [Required, MaxLength(100)]
        public string CustomerName { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string CustomerEmail { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string CustomerPhone { get; set; } = string.Empty;
        [MaxLength(100)]
        public string DestinationCountry { get; set; } = string.Empty;
        [MaxLength(50)]
        public string TravelDuration { get; set; } = string.Empty;
        [MaxLength(50)]
        public string PolicyType { get; set; } = "Individual";
        [MaxLength(50)]
        public string Status { get; set; } = "New Inquiry";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Excursion
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        [Required, MaxLength(200)]
        public string Slug { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string City { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Country { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        [MaxLength(10)]
        public string Currency { get; set; } = "PKR";
        public string Description { get; set; } = string.Empty;
        public string IncludedFeatures { get; set; } = string.Empty;
        [MaxLength(250)]
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsFeatured { get; set; } = false;
    }

    public class Destination
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string Slug { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Country { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string Attractions { get; set; } = string.Empty;
        [MaxLength(250)]
        public string HeroImageUrl { get; set; } = string.Empty;
        public bool IsPopular { get; set; } = true;
    }

    public class TravelNews
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; } = string.Empty;
        [Required, MaxLength(250)]
        public string Slug { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Category { get; set; } = "Travel Advisory";
        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
        public bool IsPublished { get; set; } = true;
    }

    public class BlogPost
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; } = string.Empty;
        [Required, MaxLength(250)]
        public string Slug { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Author { get; set; } = "MyTravel Editorial";
        [MaxLength(250)]
        public string FeaturedImageUrl { get; set; } = string.Empty;
        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
        public bool IsPublished { get; set; } = true;
    }

    public class AirlineOffice
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string AirlineName { get; set; } = string.Empty;
        [Required, MaxLength(10)]
        public string AirlineCode { get; set; } = string.Empty;
        [MaxLength(100)]
        public string BasedIn { get; set; } = string.Empty;
        [MaxLength(100)]
        public string HubAirport { get; set; } = string.Empty;
        [MaxLength(200)]
        public string OperatingAirports { get; set; } = string.Empty;
        [MaxLength(250)]
        public string OfficeAddress { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Phone { get; set; } = string.Empty;
        [MaxLength(150)]
        public string Website { get; set; } = string.Empty;
        [MaxLength(50)]
        public string City { get; set; } = "Pakistan";
    }

    public class ContactInquiry
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;
        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;
        [MaxLength(150)]
        public string Subject { get; set; } = string.Empty;
        [Required]
        public string Message { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public bool IsResolved { get; set; } = false;
    }

    public class Payment
    {
        [Key]
        public int Id { get; set; }
        public int? FlightBookingId { get; set; }
        public FlightBooking? FlightBooking { get; set; }
        [Required, MaxLength(100)]
        public string TransactionReference { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string ReceiptNumber { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string CustomerAccountNumber { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        [MaxLength(10)]
        public string Currency { get; set; } = "PKR";
        [MaxLength(50)]
        public string GatewayName { get; set; } = "Demo Secure Gateway";
        [MaxLength(50)]
        public string Status { get; set; } = "Verified"; // Verified, Pending, Failed
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    }

    public class WebsiteSetting
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string SettingKey { get; set; } = string.Empty;
        [Required]
        public string SettingValue { get; set; } = string.Empty;
        [MaxLength(200)]
        public string Description { get; set; } = string.Empty;
    }

    public class NewsletterSubscriber
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;
        public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
    }
}
