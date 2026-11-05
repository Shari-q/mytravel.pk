const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./template_helper');

const custDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/pages/customer';
const adminDir = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/pages/admin';

// CUSTOMER LOGIN
const custLoginHtml = `${getHeader('Customer Login', '', 2)}
<section class="section-padding" style="background:var(--bg-page); min-height:80vh; display:flex; align-items:center;">
  <div class="container" style="max-width:480px;">
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:16px; padding:2.5rem; box-shadow:var(--shadow-card);">
      <div style="text-align:center; margin-bottom:2rem;">
        <span class="badge badge-blue">Customer Portal</span>
        <h1 style="font-family:var(--font-editorial); font-size:2rem; color:var(--navy-deep); margin-top:0.5rem;">Sign In to MyTravel</h1>
        <p style="font-size:0.875rem; color:var(--text-muted);">Manage your flights, e-visas and insurance policies.</p>
      </div>

      <div style="background:#EFF6FF; border:1px solid #BFDBFE; color:#1E40AF; padding:0.75rem; border-radius:8px; font-size:0.8125rem; margin-bottom:1.5rem;">
        <strong>Demo Login:</strong> customer@mytravel.pk / Customer@123
      </div>

      <form id="cust-login-form" onsubmit="handleCustomerLogin(event)">
        <div class="form-group" style="margin-bottom:1.25rem;">
          <label class="form-label">Email Address</label>
          <div class="input-icon-wrap">
            <i class="bi bi-envelope"></i>
            <input type="email" class="form-input" id="login-email" value="customer@mytravel.pk" required>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label class="form-label">Password</label>
            <a href="forgot-password.html" style="font-size:0.75rem; color:var(--primary-blue);">Forgot password?</a>
          </div>
          <div class="input-icon-wrap">
            <i class="bi bi-lock"></i>
            <input type="password" class="form-input" id="login-password" value="Customer@123" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width:100%; margin-bottom:1.5rem;">
          Sign In
        </button>
      </form>

      <div style="text-align:center; font-size:0.875rem; color:var(--text-muted);">
        Don't have an account? <a href="register.html" style="color:var(--primary-blue); font-weight:700;">Create Account</a>
      </div>
    </div>
  </div>
</section>
<script>
  function handleCustomerLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    fetch('http://localhost:5200/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.token) {
        MyTravelApp.auth.setSession(data.token, data.user);
        MyTravelApp.showToast('Welcome back, ' + data.user.fullName, 'success');
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
      } else {
        MyTravelApp.showToast(data.message || 'Invalid credentials.', 'error');
      }
    })
    .catch(() => {
      // Offline / client demo fallback
      MyTravelApp.auth.setSession('DEMO_TOKEN', { id: 2, fullName: 'Hamza Tariq', email: email, role: 'Customer' });
      MyTravelApp.showToast('Signed in in Demo Mode', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    });
  }
</script>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'login.html'), custLoginHtml);

// CUSTOMER REGISTER
const custRegisterHtml = `${getHeader('Customer Registration', '', 2)}
<section class="section-padding" style="background:var(--bg-page); min-height:80vh; display:flex; align-items:center;">
  <div class="container" style="max-width:520px;">
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:16px; padding:2.5rem; box-shadow:var(--shadow-card);">
      <div style="text-align:center; margin-bottom:2rem;">
        <span class="badge badge-blue">New Customer</span>
        <h1 style="font-family:var(--font-editorial); font-size:2rem; color:var(--navy-deep); margin-top:0.5rem;">Create MyTravel Account</h1>
        <p style="font-size:0.875rem; color:var(--text-muted);">Join thousands of Pakistani travelers booking smart.</p>
      </div>

      <form id="cust-register-form" onsubmit="handleCustomerRegister(event)">
        <div class="form-group" style="margin-bottom:1.25rem;">
          <label class="form-label">Full Name</label>
          <div class="input-icon-wrap">
            <i class="bi bi-person"></i>
            <input type="text" class="form-input" id="reg-name" placeholder="As on Passport/CNIC" required>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:1.25rem;">
          <label class="form-label">Email Address</label>
          <div class="input-icon-wrap">
            <i class="bi bi-envelope"></i>
            <input type="email" class="form-input" id="reg-email" required>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:1.25rem;">
          <label class="form-label">Mobile Number</label>
          <div class="input-icon-wrap">
            <i class="bi bi-telephone"></i>
            <input type="tel" class="form-input" id="reg-phone" placeholder="0300-1234567" required>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:1.5rem;">
          <label class="form-label">Password</label>
          <div class="input-icon-wrap">
            <i class="bi bi-lock"></i>
            <input type="password" class="form-input" id="reg-password" minlength="6" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width:100%; margin-bottom:1.5rem;">
          Create My Account
        </button>
      </form>
      <div style="text-align:center; font-size:0.875rem; color:var(--text-muted);">
        Already registered? <a href="login.html" style="color:var(--primary-blue); font-weight:700;">Sign In</a>
      </div>
    </div>
  </div>
</section>
<script>
  function handleCustomerRegister(e) {
    e.preventDefault();
    fetch('http://localhost:5200/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        phoneNumber: document.getElementById('reg-phone').value,
        password: document.getElementById('reg-password').value
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        MyTravelApp.showToast('Account created successfully! Please sign in.', 'success');
        setTimeout(() => window.location.href = 'login.html', 1500);
      } else {
        MyTravelApp.showToast(data.message || 'Registration failed.', 'error');
      }
    })
    .catch(() => {
      MyTravelApp.showToast('Account created in Demo Mode!', 'success');
      setTimeout(() => window.location.href = 'login.html', 1200);
    });
  }
</script>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'register.html'), custRegisterHtml);

// CUSTOMER FORGOT PASSWORD
const custForgotHtml = `${getHeader('Forgot Password', '', 2)}
<section class="section-padding" style="background:var(--bg-page); min-height:80vh; display:flex; align-items:center;">
  <div class="container" style="max-width:480px;">
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:16px; padding:2.5rem; box-shadow:var(--shadow-card);">
      <h2 style="font-family:var(--font-editorial); font-size:1.85rem; color:var(--navy-deep); margin-bottom:0.5rem;">Reset Password</h2>
      <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem;">Enter your email to receive a secure password reset link.</p>
      <form onsubmit="event.preventDefault(); MyTravelApp.showToast('Password reset link sent to your email!', 'success');">
        <div class="form-group" style="margin-bottom:1.5rem;">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-bottom:1rem;">Send Reset Link</button>
        <div style="text-align:center;"><a href="login.html" style="font-size:0.875rem; color:var(--primary-blue);">Back to Login</a></div>
      </form>
    </div>
  </div>
</section>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'forgot-password.html'), custForgotHtml);

// CUSTOMER DASHBOARD
const custDashHtml = `${getHeader('Customer Dashboard', '', 2)}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <span class="badge badge-green">Authenticated Client</span>
        <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-top:0.25rem;">
          Welcome, <span id="dash-user-name">Hamza Tariq</span>
        </h1>
        <span style="font-size:0.875rem; color:var(--text-muted);">Manage your bookings, passport profile and e-visas.</span>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <a href="../../pages/flights.html" class="btn btn-sm btn-primary"><i class="bi bi-airplane"></i> New Flight Search</a>
        <a href="../../pages/visas.html" class="btn btn-sm btn-outline"><i class="bi bi-passport"></i> Apply Visa</a>
      </div>
    </div>

    <!-- Quick Stat Cards -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1.5rem; margin-bottom:2.5rem;">
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Flight Bookings</span>
        <div style="font-size:1.8rem; font-weight:800; color:var(--navy-deep); margin-top:0.25rem;">1 Confirmed</div>
        <a href="my-flights.html" style="font-size:0.8125rem; color:var(--primary-blue); font-weight:700;">View Tickets &rarr;</a>
      </div>
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Active Visas</span>
        <div style="font-size:1.8rem; font-weight:800; color:var(--emerald-success); margin-top:0.25rem;">1 In Progress</div>
        <a href="my-visas.html" style="font-size:0.8125rem; color:var(--primary-blue); font-weight:700;">Track Visas &rarr;</a>
      </div>
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Insurance Policies</span>
        <div style="font-size:1.8rem; font-weight:800; color:var(--primary-blue); margin-top:0.25rem;">1 Active</div>
        <a href="my-insurance.html" style="font-size:0.8125rem; color:var(--primary-blue); font-weight:700;">View Certificate &rarr;</a>
      </div>
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Customer Support</span>
        <div style="font-size:1.8rem; font-weight:800; color:var(--navy-deep); margin-top:0.25rem;">03111-101-365</div>
        <span style="font-size:0.8125rem; color:var(--text-muted);">24/7 Dedicated Care</span>
      </div>
    </div>

    <!-- Active Booking Spotlight -->
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:14px; padding:2rem; margin-bottom:2.5rem; box-shadow:var(--shadow-subtle);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; border-bottom:1px solid var(--border-light); padding-bottom:1rem;">
        <h3 style="font-size:1.25rem; color:var(--navy-deep);">Recent Journey: Karachi &rarr; Dubai</h3>
        <span class="badge badge-green">Confirmed E-Ticket</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1.5rem; margin-bottom:1.5rem; font-size:0.95rem;">
        <div><strong>Flight:</strong> Emirates (EK 601)</div>
        <div><strong>Booking Ref:</strong> <span style="font-weight:700; color:var(--primary-blue);">MT-78492</span></div>
        <div><strong>Seat:</strong> 14B (Confirmed)</div>
        <div><strong>Departure:</strong> Fri, 20 Nov 2026</div>
        <div><strong>Status:</strong> Paid & Ticketed</div>
        <div><strong>PIN Code:</strong> 4892</div>
      </div>
      <div style="display:flex; gap:1rem;">
        <a href="../flight-confirmation.html" class="btn btn-sm btn-outline"><i class="bi bi-printer"></i> View Voucher</a>
        <a href="../mybooking.html" class="btn btn-sm btn-primary"><i class="bi bi-search"></i> Live Tracking</a>
      </div>
    </div>
  </div>
</section>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const user = MyTravelApp.auth.getUser();
    if (user && user.fullName) {
      document.getElementById('dash-user-name').textContent = user.fullName;
    }
  });
</script>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'dashboard.html'), custDashHtml);

// CUSTOMER SUB-PAGES (profile, my-flights, my-visas, my-insurance, my-inquiries)
const custProfileHtml = `${getHeader('My Profile', '', 2)}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container" style="max-width:750px;">
    <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-bottom:1.5rem;">Traveler Profile & Passport</h1>
    <div style="background:var(--bg-page); border:1px solid var(--border-light); border-radius:14px; padding:2rem;">
      <form onsubmit="event.preventDefault(); MyTravelApp.showToast('Profile updated successfully!', 'success');">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
          <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" value="Hamza Tariq" required></div>
          <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" value="customer@mytravel.pk" readonly style="background:#E2E8F0;"></div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
          <div class="form-group"><label class="form-label">Passport Number</label><input type="text" class="form-input" value="PK892014" required></div>
          <div class="form-group"><label class="form-label">Nationality</label><input type="text" class="form-input" value="Pakistani" required></div>
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  </div>
</section>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'profile.html'), custProfileHtml);

const custFlightsHtml = `${getHeader('My Flight Bookings', '', 2)}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-bottom:1.5rem;">My Flight Bookings</h1>
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.95rem;">
        <thead style="background:var(--navy-deep); color:#FFFFFF;">
          <tr><th style="padding:1rem;">Booking Ref</th><th style="padding:1rem;">Airline</th><th style="padding:1rem;">Route</th><th style="padding:1rem;">Date</th><th style="padding:1rem;">Amount</th><th style="padding:1rem;">Status</th><th style="padding:1rem;">Action</th></tr>
        </thead>
        <tbody>
          <tr><td style="padding:1rem;"><strong>MT-78492</strong></td><td style="padding:1rem;">Emirates (EK 601)</td><td style="padding:1rem;">KHI &rarr; DXB</td><td style="padding:1rem;">20 Nov 2026</td><td style="padding:1rem; font-weight:700;">PKR 82,700</td><td style="padding:1rem;"><span class="badge badge-green">Confirmed</span></td><td style="padding:1rem;"><a href="../flight-confirmation.html" class="btn btn-sm btn-outline">E-Ticket</a></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'my-flights.html'), custFlightsHtml);

const custVisasHtml = `${getHeader('My Visa Applications', '', 2)}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-bottom:1.5rem;">My Visa Applications</h1>
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.95rem;">
        <thead style="background:var(--navy-deep); color:#FFFFFF;">
          <tr><th style="padding:1rem;">Application ID</th><th style="padding:1rem;">Country</th><th style="padding:1rem;">Applicant</th><th style="padding:1rem;">Passport</th><th style="padding:1rem;">Status</th><th style="padding:1rem;">Submitted</th></tr>
        </thead>
        <tbody>
          <tr><td style="padding:1rem;"><strong>VISA-89102</strong></td><td style="padding:1rem;">Azerbaijan (e-Visa)</td><td style="padding:1rem;">Hamza Tariq</td><td style="padding:1rem;">PK892014</td><td style="padding:1rem;"><span class="badge badge-gold">Under Review</span></td><td style="padding:1rem;">Active</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'my-visas.html'), custVisasHtml);

const custInsuranceHtml = `${getHeader('My Insurance Policies', '', 2)}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-bottom:1.5rem;">My Travel Insurance Policies</h1>
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.95rem;">
        <thead style="background:var(--navy-deep); color:#FFFFFF;">
          <tr><th style="padding:1rem;">Policy Number</th><th style="padding:1rem;">Underwriter</th><th style="padding:1rem;">Plan Type</th><th style="padding:1rem;">Coverage</th><th style="padding:1rem;">Status</th></tr>
        </thead>
        <tbody>
          <tr><td style="padding:1rem;"><strong>ADAM-90812</strong></td><td style="padding:1rem;">Adamjee Insurance</td><td style="padding:1rem;">Schengen Embassy Approved</td><td style="padding:1rem;">€30,000 Medical</td><td style="padding:1rem;"><span class="badge badge-green">Issued</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'my-insurance.html'), custInsuranceHtml);

const custInqHtml = `${getHeader('My Inquiries', '', 2)}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-bottom:1.5rem;">My Customer Inquiries</h1>
    <p style="color:var(--text-muted); margin-bottom:2rem;">Track responses from MyTravel.pk customer support desk.</p>
    <div style="background:var(--bg-page); border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
        <strong>Ticket #INQ-4821: Flight Rescheduling Query</strong>
        <span class="badge badge-blue">Resolved</span>
      </div>
      <p style="font-size:0.875rem; color:var(--text-muted);">Consultant Ahsan Bhatti assisted with date changes on Emirates EK 601.</p>
    </div>
  </div>
</section>
${getFooter(2)}`;
fs.writeFileSync(path.join(custDir, 'my-inquiries.html'), custInqHtml);

// =========================================================================
// ADMIN PORTAL PAGES
// =========================================================================

// ADMIN LOGIN
const adminLoginHtml = `${getHeader('Administration Portal Login', '', 2)}
<section class="section-padding" style="background:var(--navy-dark); min-height:85vh; display:flex; align-items:center;">
  <div class="container" style="max-width:440px;">
    <div style="background:#FFFFFF; border-radius:16px; padding:2.5rem; box-shadow:var(--shadow-elevated);">
      <div style="text-align:center; margin-bottom:2rem;">
        <span class="badge badge-red">Restricted Access</span>
        <h1 style="font-family:var(--font-editorial); font-size:1.85rem; color:var(--navy-deep); margin-top:0.5rem;">Admin Management</h1>
        <p style="font-size:0.8125rem; color:var(--text-muted);">Sign in to access bookings, revenue and site settings.</p>
      </div>

      <div style="background:#FEF2F2; border:1px solid #FECACA; color:#991B1B; padding:0.75rem; border-radius:8px; font-size:0.8125rem; margin-bottom:1.5rem;">
        <strong>Admin Credentials:</strong> admin@mytravel.pk / Admin@123
      </div>

      <form id="admin-login-form" onsubmit="handleAdminLogin(event)">
        <div class="form-group" style="margin-bottom:1.25rem;">
          <label class="form-label">Admin Email</label>
          <input type="email" class="form-input" id="adm-email" value="admin@mytravel.pk" required>
        </div>
        <div class="form-group" style="margin-bottom:1.5rem;">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="adm-password" value="Admin@123" required>
        </div>
        <button type="submit" class="btn btn-navy btn-lg" style="width:100%;">
          Authenticate Admin
        </button>
      </form>
    </div>
  </div>
</section>
<script>
  function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adm-email').value;
    const pass = document.getElementById('adm-password').value;

    fetch('http://localhost:5200/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('mytravel_admin_token', data.token);
        MyTravelApp.showToast('Admin authorized successfully!', 'success');
        setTimeout(() => window.location.href = 'dashboard.html', 800);
      } else {
        MyTravelApp.showToast(data.message || 'Invalid credentials.', 'error');
      }
    })
    .catch(() => {
      // Demo fallback
      localStorage.setItem('mytravel_admin_token', 'DEMO_ADMIN_TOKEN');
      MyTravelApp.showToast('Authorized in Demo Mode', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    });
  }
</script>
${getFooter(2)}`;
fs.writeFileSync(path.join(adminDir, 'login.html'), adminLoginHtml);

// ADMIN DASHBOARD
const adminDashHtml = `${getHeader('Admin Management Dashboard', '', 2)}
<section class="section-padding" style="background:var(--bg-page);">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <span class="badge badge-red"><i class="bi bi-shield-lock-fill"></i> Super Admin</span>
        <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-top:0.25rem;">
          MyTravel.pk Operations Dashboard
        </h1>
        <span style="font-size:0.875rem; color:var(--text-muted);">Real-time metrics, booking inquiries, visas and verified revenue.</span>
      </div>
      <div>
        <a href="../../index.html" class="btn btn-sm btn-outline"><i class="bi bi-eye"></i> View Live Site</a>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1.5rem; margin-bottom:2.5rem;">
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Total Customers</span>
        <div style="font-size:2rem; font-weight:800; color:var(--navy-deep);" id="m-cust">1,248</div>
      </div>
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Confirmed Bookings</span>
        <div style="font-size:2rem; font-weight:800; color:var(--emerald-success);" id="m-book">412</div>
      </div>
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Visa Applications</span>
        <div style="font-size:2rem; font-weight:800; color:var(--primary-blue);" id="m-visa">89</div>
      </div>
      <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; padding:1.5rem;">
        <span style="font-size:0.8125rem; color:var(--text-muted); text-transform:uppercase;">Verified Revenue (PKR)</span>
        <div style="font-size:2rem; font-weight:800; color:var(--gold-accent);" id="m-rev">PKR 34.2M</div>
      </div>
    </div>

    <!-- Quick Navigation Matrix to all 14 Admin Modules -->
    <h3 style="font-size:1.25rem; color:var(--navy-deep); margin-bottom:1rem;">Management Modules</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:1.25rem; margin-bottom:3rem;">
      <a href="customers.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-people" style="color:var(--primary-blue)"></i> Manage Customers</h4></a>
      <a href="flights.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-airplane" style="color:var(--primary-blue)"></i> Flight Bookings</h4></a>
      <a href="visas.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-passport" style="color:var(--primary-blue)"></i> Visa Applications</h4></a>
      <a href="insurance.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-shield-check" style="color:var(--primary-blue)"></i> Insurance Inquiries</h4></a>
      <a href="excursions.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-cup-hot" style="color:var(--primary-blue)"></i> Manage Excursions</h4></a>
      <a href="destinations.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-geo-alt" style="color:var(--primary-blue)"></i> Destinations</h4></a>
      <a href="news.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-newspaper" style="color:var(--primary-blue)"></i> Travel News</h4></a>
      <a href="blog.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-pencil-square" style="color:var(--primary-blue)"></i> Travel Blog</h4></a>
      <a href="testimonials.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-star" style="color:var(--primary-blue)"></i> Testimonials</h4></a>
      <a href="pages.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-file-earmark-text" style="color:var(--primary-blue)"></i> Website Pages</h4></a>
      <a href="inquiries.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-chat-dots" style="color:var(--primary-blue)"></i> Contact Inquiries</h4></a>
      <a href="payments.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-receipt" style="color:var(--primary-blue)"></i> Payment Records</h4></a>
      <a href="settings.html" class="service-card" style="padding:1.5rem;"><h4 style="font-size:1.1rem; color:var(--navy-deep);"><i class="bi bi-gear" style="color:var(--primary-blue)"></i> Site Settings</h4></a>
    </div>
  </div>
</section>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5200/api/admin/dashboard-metrics')
      .then(res => res.json())
      .then(m => {
        if (m.totalCustomers) document.getElementById('m-cust').textContent = m.totalCustomers;
        if (m.confirmedBookings) document.getElementById('m-book').textContent = m.confirmedBookings;
        if (m.totalVisas) document.getElementById('m-visa').textContent = m.totalVisas;
        if (m.verifiedRevenue) document.getElementById('m-rev').textContent = 'PKR ' + m.verifiedRevenue.toLocaleString();
      })
      .catch(() => {});
  });
</script>
${getFooter(2)}`;
fs.writeFileSync(path.join(adminDir, 'dashboard.html'), adminDashHtml);

// ADMIN SUB-MODULES
const adminSubPages = [
  { file: 'customers.html', title: 'Manage Customers', desc: 'Registered customers and profiles.' },
  { file: 'flights.html', title: 'Manage Flight Bookings', desc: 'Active bookings, PNRs and e-tickets.' },
  { file: 'visas.html', title: 'Manage Visa Applications', desc: 'Review passport scans and update application status.' },
  { file: 'insurance.html', title: 'Manage Insurance Inquiries', desc: 'Underwriter policy generation and logs.' },
  { file: 'excursions.html', title: 'Manage Excursions', desc: 'Airport lounge passes and sightseeing tours.' },
  { file: 'destinations.html', title: 'Manage Destinations', desc: 'Travel destinations and attraction catalogs.' },
  { file: 'news.html', title: 'Manage Travel News', desc: 'Regulatory notices and airline route updates.' },
  { file: 'blog.html', title: 'Manage Blog Articles', desc: 'Travel guides and packing advisories.' },
  { file: 'testimonials.html', title: 'Manage Testimonials', desc: 'Customer review moderation.' },
  { file: 'pages.html', title: 'Manage Website Pages', desc: 'Meta tags, titles and page content.' },
  { file: 'inquiries.html', title: 'Contact Inquiries', desc: 'Inbound customer messages and support tickets.' },
  { file: 'payments.html', title: 'Manage Payment Records', desc: 'Receipt numbers, transaction references and cleared funds.' },
  { file: 'settings.html', title: 'Manage Site Settings', desc: 'DTS License, IATA Membership, Phone and WhatsApp lines.' }
];

adminSubPages.forEach(p => {
  const pageHtml = `${getHeader(p.title, '', 2)}
<section class="section-padding" style="background:#FFFFFF;">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
      <div>
        <a href="dashboard.html" style="font-size:0.875rem; color:var(--primary-blue); font-weight:700;">&larr; Back to Dashboard</a>
        <h1 style="font-family:var(--font-editorial); font-size:2.2rem; color:var(--navy-deep); margin-top:0.5rem;">${p.title}</h1>
        <p style="color:var(--text-muted);">${p.desc}</p>
      </div>
      <div>
        <button onclick="MyTravelApp.showToast('Item saved successfully', 'success')" class="btn btn-sm btn-primary"><i class="bi bi-plus-circle"></i> Add New Record</button>
      </div>
    </div>

    <!-- Data Table Container -->
    <div style="background:#FFFFFF; border:1px solid var(--border-light); border-radius:12px; overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:0.9375rem; text-align:left;">
        <thead style="background:var(--navy-deep); color:#FFFFFF;">
          <tr>
            <th style="padding:1rem 1.25rem;">ID / Ref</th>
            <th style="padding:1rem 1.25rem;">Primary Field</th>
            <th style="padding:1rem 1.25rem;">Details</th>
            <th style="padding:1rem 1.25rem;">Status</th>
            <th style="padding:1rem 1.25rem;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:1rem 1.25rem;"><strong>#001</strong></td>
            <td style="padding:1rem 1.25rem;">Hamza Tariq (customer@mytravel.pk)</td>
            <td style="padding:1rem 1.25rem;">Karachi &rarr; Dubai (EK 601)</td>
            <td style="padding:1rem 1.25rem;"><span class="badge badge-green">Active</span></td>
            <td style="padding:1rem 1.25rem;">
              <button onclick="MyTravelApp.showToast('Record updated', 'info')" class="btn btn-sm btn-outline">Edit</button>
            </td>
          </tr>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:1rem 1.25rem;"><strong>#002</strong></td>
            <td style="padding:1rem 1.25rem;">Muhammad Bilal (bilal@example.com)</td>
            <td style="padding:1rem 1.25rem;">Azerbaijan e-Visa (3 Pax)</td>
            <td style="padding:1rem 1.25rem;"><span class="badge badge-blue">Processed</span></td>
            <td style="padding:1rem 1.25rem;">
              <button onclick="MyTravelApp.showToast('Record updated', 'info')" class="btn btn-sm btn-outline">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
${getFooter(2)}`;
  fs.writeFileSync(path.join(adminDir, p.file), pageHtml);
});

console.log('Customer and Admin pages generated successfully');
