/**
 * MYTRAVEL.PK - FLIGHT BOOKING ENGINE & WORKFLOW STATE
 */

const MyTravelFlightEngine = {
  // Verified Air Hubs
  airports: [
    { code: 'KHI', city: 'Karachi', name: 'Jinnah International Airport', country: 'Pakistan' },
    { code: 'LHE', city: 'Lahore', name: 'Allama Iqbal International Airport', country: 'Pakistan' },
    { code: 'ISB', city: 'Islamabad', name: 'Islamabad International Airport', country: 'Pakistan' },
    { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'United Arab Emirates' },
    { code: 'DOH', city: 'Doha', name: 'Hamad International Airport', country: 'Qatar' },
    { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'United Kingdom' },
    { code: 'GYD', city: 'Baku', name: 'Heydar Aliyev International', country: 'Azerbaijan' },
    { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand' },
    { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International', country: 'Malaysia' },
    { code: 'JED', city: 'Jeddah', name: 'King Abdulaziz International', country: 'Saudi Arabia' },
    { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Turkey' }
  ],

  // Sample Flight Inventory for Demo Mode
  demoFlights: [
    {
      id: 'FL-001',
      airline: 'Emirates',
      flightNumber: 'EK 601',
      origin: 'KHI',
      originCity: 'Karachi',
      destination: 'DXB',
      destinationCity: 'Dubai',
      departTime: '06:15 AM',
      arriveTime: '07:45 AM',
      duration: '2h 30m',
      stops: 0,
      stopDetails: 'Non-stop Direct Flight',
      aircraft: 'Boeing 777-300ER',
      baggage: '30 Kg Checked + 7 Kg Cabin',
      fareType: 'Flex Economy',
      basePrice: 68500,
      tax: 14200,
      totalPrice: 82700,
      refundable: true,
      changeAllowed: true
    },
    {
      id: 'FL-002',
      airline: 'Fly Jinnah',
      flightNumber: '9P 740',
      origin: 'KHI',
      originCity: 'Karachi',
      destination: 'DXB',
      destinationCity: 'Dubai',
      departTime: '10:30 AM',
      arriveTime: '12:05 PM',
      duration: '2h 35m',
      stops: 0,
      stopDetails: 'Non-stop Direct Flight',
      aircraft: 'Airbus A320-200',
      baggage: '20 Kg Checked + 7 Kg Cabin',
      fareType: 'Value Saver',
      basePrice: 52000,
      tax: 11400,
      totalPrice: 63400,
      refundable: false,
      changeAllowed: true
    },
    {
      id: 'FL-003',
      airline: 'Qatar Airways',
      flightNumber: 'QR 611',
      origin: 'KHI',
      originCity: 'Karachi',
      destination: 'DXB',
      destinationCity: 'Dubai (via Doha)',
      departTime: '03:40 AM',
      arriveTime: '08:50 AM',
      duration: '6h 10m',
      stops: 1,
      stopDetails: '1 Stop in Doha (DOH) - 1h 45m layover',
      aircraft: 'Boeing 787-9 Dreamliner',
      baggage: '35 Kg Checked + 7 Kg Cabin',
      fareType: 'Economy Classic',
      basePrice: 61000,
      tax: 13500,
      totalPrice: 74500,
      refundable: true,
      changeAllowed: true
    },
    {
      id: 'FL-004',
      airline: 'Pakistan International Airlines',
      flightNumber: 'PK 787',
      origin: 'KHI',
      originCity: 'Karachi',
      destination: 'LHR',
      destinationCity: 'London Heathrow',
      departTime: '11:20 AM',
      arriveTime: '04:15 PM',
      duration: '8h 55m',
      stops: 0,
      stopDetails: 'Non-stop Direct Flight',
      aircraft: 'Boeing 777-200ER',
      baggage: '40 Kg Checked + 7 Kg Cabin',
      fareType: 'Economy Comfort',
      basePrice: 165000,
      tax: 38000,
      totalPrice: 203000,
      refundable: true,
      changeAllowed: true
    },
    {
      id: 'FL-005',
      airline: 'Azerbaijan Airlines',
      flightNumber: 'J2 072',
      origin: 'LHE',
      originCity: 'Lahore',
      destination: 'GYD',
      destinationCity: 'Baku',
      departTime: '01:30 PM',
      arriveTime: '04:45 PM',
      duration: '4h 15m',
      stops: 0,
      stopDetails: 'Non-stop Direct Flight',
      aircraft: 'Airbus A320neo',
      baggage: '23 Kg Checked + 8 Kg Cabin',
      fareType: 'Standard E-Visa Partner',
      basePrice: 88000,
      tax: 18500,
      totalPrice: 106500,
      refundable: true,
      changeAllowed: true
    }
  ],

  // Current Active Booking State (Stored in Session)
  getCurrentSearch() {
    const s = sessionStorage.getItem('mytravel_flight_search');
    return s ? JSON.parse(s) : {
      tripType: 'roundtrip',
      origin: 'KHI',
      destination: 'DXB',
      departDate: '2026-11-20',
      returnDate: '2026-11-28',
      passengers: 1,
      cabinClass: 'economy'
    };
  },

  setSearch(data) {
    sessionStorage.setItem('mytravel_flight_search', JSON.stringify(data));
  },

  getSelectedFlight() {
    const f = sessionStorage.getItem('mytravel_selected_flight');
    return f ? JSON.parse(f) : this.demoFlights[0];
  },

  setSelectedFlight(flight) {
    sessionStorage.setItem('mytravel_selected_flight', JSON.stringify(flight));
  },

  // Perform Flight Search
  searchFlights(params) {
    this.setSearch(params);
    let results = [...this.demoFlights];
    if (params.origin && params.destination) {
      results = results.filter(f => f.origin === params.origin && f.destination.includes(params.destination));
      if (results.length === 0) {
        // Fallback for demo experience
        results = this.demoFlights;
      }
    }
    return results;
  }
};

window.MyTravelFlightEngine = MyTravelFlightEngine;
