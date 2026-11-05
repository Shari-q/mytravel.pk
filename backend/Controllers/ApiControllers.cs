using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyTravel.Backend.Data;
using MyTravel.Backend.DTOs;
using MyTravel.Backend.Integrations;
using MyTravel.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTravel.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MyTravelDbContext _db;

        public AuthController(MyTravelDbContext db)
        {
            _db = db;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest req)
        {
            if (await _db.Users.AnyAsync(u => u.Email.ToLower() == req.Email.ToLower()))
            {
                return BadRequest(new AuthResponse { Success = false, Message = "An account with this email already exists." });
            }

            var hash = BCrypt.Net.BCrypt.HashPassword(req.Password);
            var user = new User
            {
                FullName = req.FullName,
                Email = req.Email.ToLower(),
                PasswordHash = hash,
                PhoneNumber = req.PhoneNumber,
                Role = "Customer",
                CreatedAt = DateTime.UtcNow
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Profile creation
            var profile = new CustomerProfile { UserId = user.Id };
            _db.CustomerProfiles.Add(profile);
            await _db.SaveChangesAsync();

            return Ok(new AuthResponse
            {
                Success = true,
                Message = "Account registered successfully.",
                Token = "MT-JWT-" + Guid.NewGuid().ToString("N"),
                User = new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Role = user.Role
                }
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest req)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == req.Email.ToLower());
            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
            {
                return Unauthorized(new AuthResponse { Success = false, Message = "Invalid email address or password." });
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new AuthResponse
            {
                Success = true,
                Message = "Authentication successful.",
                Token = "MT-JWT-" + Guid.NewGuid().ToString("N"),
                User = new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Role = user.Role
                }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class FlightsController : ControllerBase
    {
        private readonly MyTravelDbContext _db;
        private readonly IFlightProviderAdapter _adapter;

        public FlightsController(MyTravelDbContext db, IFlightProviderAdapter adapter)
        {
            _db = db;
            _adapter = adapter;
        }

        [HttpGet("airports")]
        public async Task<ActionResult<List<Airport>>> GetAirports()
        {
            return await _db.Airports.ToListAsync();
        }

        [HttpPost("search")]
        public async Task<ActionResult> Search([FromBody] FlightSearchQuery query)
        {
            var results = await _adapter.SearchFlightsAsync(query);
            return Ok(new
            {
                isDemoMode = _adapter.IsDemoMode,
                provider = _adapter.ProviderName,
                totalFound = results.Count,
                results
            });
        }

        [HttpPost("book")]
        public async Task<ActionResult> CreateBooking([FromBody] CreateBookingRequest req)
        {
            var random = new Random();
            var refCode = "MT-" + random.Next(10000, 99999);
            var pinCode = random.Next(1000, 9999).ToString();

            var booking = new FlightBooking
            {
                BookingReference = refCode,
                PinCode = pinCode,
                ContactName = req.ContactName,
                ContactEmail = req.ContactEmail,
                ContactPhone = req.ContactPhone,
                OriginCode = req.OriginCode,
                DestinationCode = req.DestinationCode,
                FlightNumber = req.FlightNumber,
                AirlineName = req.AirlineName,
                DepartureDate = req.DepartureDate,
                ReturnDate = req.ReturnDate,
                CabinClass = req.CabinClass,
                SelectedSeat = req.SelectedSeat,
                TotalAmount = req.TotalAmount,
                BookingStatus = "Confirmed",
                PaymentStatus = "Paid",
                IsDemoMode = true,
                CreatedAt = DateTime.UtcNow
            };

            foreach (var p in req.Passengers)
            {
                booking.Passengers.Add(new BookingPassenger
                {
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    PassengerType = p.PassengerType,
                    PassportNumber = p.PassportNumber,
                    DateOfBirth = p.DateOfBirth,
                    Gender = p.Gender
                });
            }

            // Create verified payment record
            var txn = "TXN-" + random.Next(10000000, 99999999);
            var receipt = "MT-REC-" + random.Next(10000, 99999);
            var acc = "PKR-" + random.Next(100000, 999999);

            booking.Payments.Add(new Payment
            {
                TransactionReference = txn,
                ReceiptNumber = receipt,
                CustomerAccountNumber = acc,
                Amount = req.TotalAmount,
                Currency = "PKR",
                GatewayName = "Demo Payment Adapter",
                Status = "Verified",
                PaymentDate = DateTime.UtcNow
            });

            _db.FlightBookings.Add(booking);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                bookingReference = booking.BookingReference,
                pinCode = booking.PinCode,
                receiptNumber = receipt,
                customerAccount = acc,
                totalAmount = booking.TotalAmount,
                status = booking.BookingStatus,
                message = "Booking confirmed and payment simulated successfully."
            });
        }

        [HttpPost("track")]
        public async Task<ActionResult> TrackBooking([FromBody] TrackingRequest req)
        {
            var booking = await _db.FlightBookings
                .Include(b => b.Passengers)
                .Include(b => b.Payments)
                .FirstOrDefaultAsync(b => b.BookingReference.ToUpper() == req.BookingReference.Trim().ToUpper() && b.PinCode == req.PinCode.Trim());

            if (booking == null)
            {
                return NotFound(new { success = false, message = "No matching booking found for this Reference and PIN combination." });
            }

            return Ok(new
            {
                success = true,
                booking = new
                {
                    booking.BookingReference,
                    booking.ContactName,
                    booking.FlightNumber,
                    booking.AirlineName,
                    booking.OriginCode,
                    booking.DestinationCode,
                    booking.DepartureDate,
                    booking.ReturnDate,
                    booking.CabinClass,
                    booking.SelectedSeat,
                    booking.TotalAmount,
                    booking.Currency,
                    booking.BookingStatus,
                    booking.PaymentStatus,
                    booking.CreatedAt,
                    passengers = booking.Passengers.Select(p => new { p.FirstName, p.LastName, p.PassengerType })
                }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class VisasController : ControllerBase
    {
        private readonly MyTravelDbContext _db;

        public VisasController(MyTravelDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<List<VisaCountry>>> GetCountries()
        {
            return await _db.VisaCountries.Where(v => v.IsPublished).ToListAsync();
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<VisaCountry>> GetCountry(string slug)
        {
            var country = await _db.VisaCountries.FirstOrDefaultAsync(v => v.Slug == slug.ToLower());
            if (country == null) return NotFound(new { message = "Visa destination not found." });
            return country;
        }

        [HttpPost("apply")]
        public async Task<ActionResult> SubmitApplication([FromBody] VisaApplication app)
        {
            app.CreatedAt = DateTime.UtcNow;
            app.Status = "Application Received - Under Review";
            _db.VisaApplications.Add(app);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, applicationId = app.Id, message = "Visa application received. Our visa consultant will contact you via WhatsApp / Phone." });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class InsuranceController : ControllerBase
    {
        private readonly MyTravelDbContext _db;

        public InsuranceController(MyTravelDbContext db) => _db = db;

        [HttpGet("plans")]
        public async Task<ActionResult<List<InsurancePlan>>> GetPlans()
        {
            return await _db.InsurancePlans.Where(p => p.IsActive).ToListAsync();
        }

        [HttpPost("inquiry")]
        public async Task<ActionResult> SubmitInquiry([FromBody] InsuranceInquiry inq)
        {
            inq.CreatedAt = DateTime.UtcNow;
            inq.Status = "Policy Issued in Demo / Ready";
            _db.InsuranceInquiries.Add(inq);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, inquiryId = inq.Id, message = "Insurance inquiry received. Official Adamjee/UIC policy will be dispatched within 30 minutes." });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AirlineOfficesController : ControllerBase
    {
        private readonly MyTravelDbContext _db;

        public AirlineOfficesController(MyTravelDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<List<AirlineOffice>>> GetOffices()
        {
            return await _db.AirlineOffices.ToListAsync();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly MyTravelDbContext _db;

        public InquiriesController(MyTravelDbContext db) => _db = db;

        [HttpPost("contact")]
        public async Task<ActionResult> SubmitContact([FromBody] ContactFormRequest req)
        {
            var c = new ContactInquiry
            {
                FullName = req.FullName,
                Email = req.Email,
                Phone = req.Phone,
                Subject = req.Subject,
                Message = req.Message,
                SubmittedAt = DateTime.UtcNow
            };
            _db.ContactInquiries.Add(c);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Thank you! Your inquiry has been sent to MyTravel customer care team." });
        }

        [HttpPost("verify-receipt")]
        public async Task<ActionResult> VerifyReceipt([FromBody] ReceiptVerifyRequest req)
        {
            var p = await _db.Payments
                .Include(x => x.FlightBooking)
                .FirstOrDefaultAsync(x => x.ReceiptNumber.Trim().ToUpper() == req.ReceiptNumber.Trim().ToUpper()
                    && x.CustomerAccountNumber.Trim().ToUpper() == req.CustomerAccountNumber.Trim().ToUpper());

            if (p == null)
            {
                return NotFound(new { success = false, message = "No matching verified receipt found in MyTravel records." });
            }

            return Ok(new
            {
                success = true,
                payment = new
                {
                    p.ReceiptNumber,
                    p.CustomerAccountNumber,
                    p.TransactionReference,
                    p.Amount,
                    p.Currency,
                    p.Status,
                    p.PaymentDate,
                    bookingRef = p.FlightBooking?.BookingReference ?? "N/A"
                }
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly MyTravelDbContext _db;

        public AdminController(MyTravelDbContext db) => _db = db;

        [HttpGet("dashboard-metrics")]
        public async Task<ActionResult> GetMetrics()
        {
            var totalCustomers = await _db.Users.CountAsync(u => u.Role == "Customer");
            var totalBookings = await _db.FlightBookings.CountAsync();
            var confirmedBookings = await _db.FlightBookings.CountAsync(b => b.BookingStatus == "Confirmed");
            var pendingBookings = await _db.FlightBookings.CountAsync(b => b.BookingStatus == "Pending");
            var totalVisas = await _db.VisaApplications.CountAsync();
            var totalInsurance = await _db.InsuranceInquiries.CountAsync();
            var payments = await _db.Payments.Where(p => p.Status == "Verified").Select(p => p.Amount).ToListAsync();
            var verifiedRevenue = payments.Sum();

            return Ok(new
            {
                totalCustomers,
                totalBookings,
                confirmedBookings,
                pendingBookings,
                totalVisas,
                totalInsurance,
                verifiedRevenue
            });
        }

        [HttpGet("bookings")]
        public async Task<ActionResult<List<FlightBooking>>> GetAllBookings()
        {
            return await _db.FlightBookings.OrderByDescending(b => b.CreatedAt).Take(50).ToListAsync();
        }

        [HttpGet("visas")]
        public async Task<ActionResult<List<VisaApplication>>> GetAllVisas()
        {
            return await _db.VisaApplications.OrderByDescending(v => v.CreatedAt).Take(50).ToListAsync();
        }

        [HttpGet("insurance")]
        public async Task<ActionResult<List<InsuranceInquiry>>> GetAllInsurance()
        {
            return await _db.InsuranceInquiries.OrderByDescending(i => i.CreatedAt).Take(50).ToListAsync();
        }

        [HttpGet("inquiries")]
        public async Task<ActionResult<List<ContactInquiry>>> GetAllInquiries()
        {
            return await _db.ContactInquiries.OrderByDescending(c => c.SubmittedAt).Take(50).ToListAsync();
        }
    }
}
