using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyTravel.Backend.DTOs;

namespace MyTravel.Backend.Integrations
{
    public interface IFlightProviderAdapter
    {
        string ProviderName { get; }
        bool IsDemoMode { get; }
        Task<List<FlightOfferResult>> SearchFlightsAsync(FlightSearchQuery query);
    }

    public class FlightOfferResult
    {
        public string OfferId { get; set; } = string.Empty;
        public string AirlineName { get; set; } = string.Empty;
        public string AirlineCode { get; set; } = string.Empty;
        public string FlightNumber { get; set; } = string.Empty;
        public string Origin { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public string DepartTime { get; set; } = string.Empty;
        public string ArriveTime { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public int Stops { get; set; }
        public string StopDetails { get; set; } = string.Empty;
        public string Aircraft { get; set; } = string.Empty;
        public string Baggage { get; set; } = string.Empty;
        public decimal BaseFare { get; set; }
        public decimal Taxes { get; set; }
        public decimal TotalFare { get; set; }
        public string Currency { get; set; } = "PKR";
        public bool Refundable { get; set; }
        public bool IsDemo { get; set; } = true;
    }

    public class DemoFlightProviderAdapter : IFlightProviderAdapter
    {
        public string ProviderName => "MyTravel Demo Flight Aggregator (Amadeus / Sabre Adapter Ready)";
        public bool IsDemoMode => true;

        public Task<List<FlightOfferResult>> SearchFlightsAsync(FlightSearchQuery query)
        {
            var offers = new List<FlightOfferResult>
            {
                new FlightOfferResult
                {
                    OfferId = "DEMO-EK-601",
                    AirlineName = "Emirates",
                    AirlineCode = "EK",
                    FlightNumber = "EK 601",
                    Origin = query.Origin,
                    Destination = query.Destination,
                    DepartTime = "06:15 AM",
                    ArriveTime = "07:45 AM",
                    Duration = "2h 30m",
                    Stops = 0,
                    StopDetails = "Non-stop Direct Flight",
                    Aircraft = "Boeing 777-300ER",
                    Baggage = "30 Kg Checked + 7 Kg Cabin",
                    BaseFare = 68500,
                    Taxes = 14200,
                    TotalFare = 82700,
                    Refundable = true,
                    IsDemo = true
                },
                new FlightOfferResult
                {
                    OfferId = "DEMO-9P-740",
                    AirlineName = "Fly Jinnah",
                    AirlineCode = "9P",
                    FlightNumber = "9P 740",
                    Origin = query.Origin,
                    Destination = query.Destination,
                    DepartTime = "10:30 AM",
                    ArriveTime = "12:05 PM",
                    Duration = "2h 35m",
                    Stops = 0,
                    StopDetails = "Non-stop Direct Flight",
                    Aircraft = "Airbus A320-200",
                    Baggage = "20 Kg Checked + 7 Kg Cabin",
                    BaseFare = 52000,
                    Taxes = 11400,
                    TotalFare = 63400,
                    Refundable = false,
                    IsDemo = true
                },
                new FlightOfferResult
                {
                    OfferId = "DEMO-QR-611",
                    AirlineName = "Qatar Airways",
                    AirlineCode = "QR",
                    FlightNumber = "QR 611",
                    Origin = query.Origin,
                    Destination = query.Destination,
                    DepartTime = "03:40 AM",
                    ArriveTime = "08:50 AM",
                    Duration = "6h 10m",
                    Stops = 1,
                    StopDetails = "1 Stop in Doha (DOH)",
                    Aircraft = "Boeing 787-9 Dreamliner",
                    Baggage = "35 Kg Checked + 7 Kg Cabin",
                    BaseFare = 61000,
                    Taxes = 13500,
                    TotalFare = 74500,
                    Refundable = true,
                    IsDemo = true
                }
            };
            return Task.FromResult(offers);
        }
    }

    public interface IPaymentGatewayAdapter
    {
        string GatewayName { get; }
        Task<PaymentVerificationResult> ProcessPaymentAsync(decimal amount, string currency, string reference);
    }

    public class PaymentVerificationResult
    {
        public bool Success { get; set; }
        public string TransactionReference { get; set; } = string.Empty;
        public string ReceiptNumber { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

    public class DemoPaymentGatewayAdapter : IPaymentGatewayAdapter
    {
        public string GatewayName => "MyTravel Demo Secure Gateway";

        public Task<PaymentVerificationResult> ProcessPaymentAsync(decimal amount, string currency, string reference)
        {
            var random = new Random();
            var txn = "TXN-" + random.Next(10000000, 99999999);
            var receipt = "MT-REC-" + random.Next(10000, 99999);

            return Task.FromResult(new PaymentVerificationResult
            {
                Success = true,
                TransactionReference = txn,
                ReceiptNumber = receipt,
                Message = "Payment processed and verified successfully in Demo Mode."
            });
        }
    }
}
