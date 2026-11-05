using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyTravel.Backend.DTOs
{
    public class RegisterRequest
    {
        [Required]
        public string FullName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, MinLength(6)]
        public string Password { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public UserDto? User { get; set; }
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }

    public class FlightSearchQuery
    {
        public string TripType { get; set; } = "roundtrip"; // oneway, roundtrip, multicity
        public string Origin { get; set; } = "KHI";
        public string Destination { get; set; } = "DXB";
        public string DepartDate { get; set; } = string.Empty;
        public string ReturnDate { get; set; } = string.Empty;
        public int Passengers { get; set; } = 1;
        public string CabinClass { get; set; } = "Economy";
    }

    public class CreateBookingRequest
    {
        public string OriginCode { get; set; } = string.Empty;
        public string DestinationCode { get; set; } = string.Empty;
        public string FlightNumber { get; set; } = string.Empty;
        public string AirlineName { get; set; } = string.Empty;
        public string DepartureDate { get; set; } = string.Empty;
        public string ReturnDate { get; set; } = string.Empty;
        public string CabinClass { get; set; } = "Economy";
        public string SelectedSeat { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        
        public string ContactName { get; set; } = string.Empty;
        public string ContactEmail { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;

        public List<PassengerDto> Passengers { get; set; } = new List<PassengerDto>();
    }

    public class PassengerDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PassengerType { get; set; } = "Adult";
        public string PassportNumber { get; set; } = string.Empty;
        public string DateOfBirth { get; set; } = string.Empty;
        public string Gender { get; set; } = "Male";
    }

    public class TrackingRequest
    {
        [Required]
        public string BookingReference { get; set; } = string.Empty;
        [Required]
        public string PinCode { get; set; } = string.Empty;
    }

    public class ReceiptVerifyRequest
    {
        [Required]
        public string ReceiptNumber { get; set; } = string.Empty;
        [Required]
        public string CustomerAccountNumber { get; set; } = string.Empty;
    }

    public class ContactFormRequest
    {
        [Required]
        public string FullName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        [Required]
        public string Message { get; set; } = string.Empty;
    }
}
