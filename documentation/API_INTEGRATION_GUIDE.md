# MYTRAVEL.PK - PROVIDER INTEGRATION ARCHITECTURE & ADAPTERS

## 1. Architectural Strategy
To ensure that the platform operates seamlessly without inventing live fares or mock confirmed PNRs, MyTravel.pk utilizes a **Provider Adapter Design Pattern**.

When genuine credentials (Amadeus, Sabre, Adamjee, Bank Alfalah, Stripe) are provided, the corresponding adapter implementation replaces the demo adapter with zero changes to frontend or controller logic.

```
┌──────────────────────────────────────────────────────────────┐
│                    API Controllers Layer                     │
└──────────────────────────────┬───────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
     IFlightProviderAdapter         IPaymentGatewayAdapter
               │                               │
       ┌───────┴───────┐               ┌───────┴───────┐
       ▼               ▼               ▼               ▼
DemoFlightAdapter  AmadeusGDS     DemoPayment    BankAlfalah / Stripe
```

---

## 2. Flight Provider Adapter (`IFlightProviderAdapter`)

### Interface Definition
```csharp
public interface IFlightProviderAdapter
{
    string ProviderName { get; }
    bool IsDemoMode { get; }
    Task<List<FlightOfferResult>> SearchFlightsAsync(FlightSearchQuery query);
}
```

### Amadeus GDS Implementation Sample
```csharp
public class AmadeusFlightAdapter : IFlightProviderAdapter
{
    private readonly HttpClient _http;
    public string ProviderName => "Amadeus Self-Service GDS";
    public bool IsDemoMode => false;

    public async Task<List<FlightOfferResult>> SearchFlightsAsync(FlightSearchQuery query)
    {
        // 1. Authenticate with Amadeus OAuth2: /v1/security/oauth2/token
        // 2. Query Flight Offers: /v2/shopping/flight-offers
        // 3. Map returned flight segments, baggage rules and pricing to FlightOfferResult
        return mappedOffers;
    }
}
```

---

## 3. Travel Insurance Partner Integration (`IInsuranceProviderAdapter`)
MyTravel.pk is an authorized corporate agent for:
- **Adamjee Insurance**
- **United Insurance Company (UIC)**

### Workflow
1. Client selects coverage type (e.g. Schengen Standard €30,000, 15 Days).
2. Backend generates quotation applying MyTravel's exclusive 20% discount.
3. Upon payment confirmation, the underwriter API is called (`POST /api/v1/policy/issue`).
4. Official digitally signed PDF policy certificate is returned and dispatched via WhatsApp and Email to the customer within 20 to 30 minutes.

---

## 4. Payment Gateway Adapter (`IPaymentGatewayAdapter`)
Supports Pakistani domestic switches (PayFast, Bank Alfalah, 1Link) and international processors (Stripe).
```csharp
public interface IPaymentGatewayAdapter
{
    string GatewayName { get; }
    Task<PaymentVerificationResult> ProcessPaymentAsync(decimal amount, string currency, string reference);
}
```
- Server-side verification only.
- Strict prevention of duplicate webhook events.
- Never stores customer card numbers or CVV.
