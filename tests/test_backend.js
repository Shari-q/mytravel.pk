const http = require('http');

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const req = http.request({
      hostname: 'localhost',
      port: 5200,
      path,
      method,
      headers
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('Testing ASP.NET Core Backend API on port 5200...');
  
  // Wait up to 15s for server startup
  let connected = false;
  for (let i = 0; i < 15; i++) {
    try {
      const res = await request('GET', '/swagger/v1/swagger.json');
      if (res.status === 200) {
        connected = true;
        console.log('Swagger API schema responded successfully (HTTP 200).');
        break;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  if (!connected) {
    console.error('Could not connect to backend server on port 5200.');
    process.exitCode = 1;
    return;
  }

  // 1. Airports
  const airports = await request('GET', '/api/flights/airports');
  console.log('1. Airports count:', JSON.parse(airports.body).length);

  // 2. Flight Search
  const search = await request('POST', '/api/flights/search', { origin: 'KHI', destination: 'DXB' });
  console.log('2. Flight Search results:', JSON.parse(search.body).results.length, 'flights found.');

  // 3. Track Booking
  const track = await request('POST', '/api/flights/track', { bookingReference: 'MT-78492', pinCode: '4892' });
  console.log('3. Track Booking result:', JSON.parse(track.body).success, JSON.parse(track.body).booking.airlineName);

  // 4. Verify Receipt
  const receipt = await request('POST', '/api/inquiries/verify-receipt', { receiptNumber: 'MT-REC-90214', customerAccountNumber: 'PKR-489211' });
  console.log('4. Verify Receipt result:', JSON.parse(receipt.body).success, 'Amount:', JSON.parse(receipt.body).payment.amount);

  // 5. Visas
  const visas = await request('GET', '/api/visas');
  console.log('5. Visas count:', JSON.parse(visas.body).length);

  // 6. Insurance Plans
  const plans = await request('GET', '/api/insurance/plans');
  console.log('6. Insurance plans count:', JSON.parse(plans.body).length);

  // 7. Customer Login
  const login = await request('POST', '/api/auth/login', { email: 'customer@mytravel.pk', password: 'Customer@123' });
  const customerAuth = JSON.parse(login.body);
  if (login.status !== 200 || !customerAuth.token) throw new Error('Customer authentication failed.');
  console.log('7. Customer Authentication:', customerAuth.success, customerAuth.user.fullName);

  // 8. Admin-only dashboard access
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD to test admin-only endpoints.');
  }
  const adminLogin = await request('POST', '/api/auth/login', { email: adminEmail, password: adminPassword });
  const adminAuth = JSON.parse(adminLogin.body);
  if (adminLogin.status !== 200 || !adminAuth.token || adminAuth.user.role !== 'Admin') {
    throw new Error('Administrator authentication failed.');
  }

  const anonymousMetrics = await request('GET', '/api/admin/dashboard-metrics');
  if (anonymousMetrics.status !== 401) throw new Error('Admin dashboard must reject anonymous requests.');

  const customerMetrics = await request('GET', '/api/admin/dashboard-metrics', null, customerAuth.token);
  if (customerMetrics.status !== 403) throw new Error('Admin dashboard must reject customer accounts.');

  const metrics = await request('GET', '/api/admin/dashboard-metrics', null, adminAuth.token);
  if (metrics.status !== 200) throw new Error('Administrator dashboard access failed.');
  console.log('8. Admin Dashboard Metrics:', JSON.parse(metrics.body));

  console.log('ALL API TESTS PASSED SUCCESSFULLY!');
}

runTests();
