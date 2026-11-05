/**
 * MYTRAVEL.PK - GLOBAL APPLICATION & CLIENT ENGINE
 */

const API_BASE = window.location.origin.includes('5000') || window.location.origin.includes('5001') || window.location.origin.includes('5200')
  ? `${window.location.origin}/api`
  : 'http://localhost:5200/api';

const MyTravelApp = {
  // Authentication State
  auth: {
    getToken() {
      return localStorage.getItem('mytravel_token');
    },
    getUser() {
      const u = localStorage.getItem('mytravel_user');
      return u ? JSON.parse(u) : null;
    },
    setSession(token, user) {
      localStorage.setItem('mytravel_token', token);
      localStorage.setItem('mytravel_user', JSON.stringify(user));
      this.updateNav();
    },
    logout() {
      localStorage.removeItem('mytravel_token');
      localStorage.removeItem('mytravel_user');
      window.location.href = '/pages/customer/login.html';
    },
    updateNav() {
      const user = this.getUser();
      const accountBtns = document.querySelectorAll('.auth-nav-container');
      accountBtns.forEach(container => {
        if (user) {
          container.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <a href="/pages/customer/dashboard.html" class="btn-header-account">
                <i class="bi bi-person-check-fill" style="color:var(--emerald-success)"></i>
                <span>${user.fullName ? user.fullName.split(' ')[0] : 'My Account'}</span>
              </a>
              <button onclick="MyTravelApp.auth.logout()" class="btn btn-sm btn-outline" style="padding:0.4rem 0.75rem;" title="Sign Out">
                <i class="bi bi-box-arrow-right"></i>
              </button>
            </div>
          `;
        } else {
          container.innerHTML = `
            <a href="/pages/customer/login.html" class="btn-header-account">
              <i class="bi bi-person-circle"></i>
              <span>Login / Account</span>
            </a>
          `;
        }
      });
    }
  },

  // Toast Notification System
  showToast(message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 380px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: #FFFFFF;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      box-shadow: 0 12px 35px rgba(8, 41, 87, 0.2);
      border-left: 5px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#168DE2'};
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      pointer-events: auto;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-size: 0.9rem;
      color: #1E293B;
    `;

    const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';
    const iconColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#168DE2';

    toast.innerHTML = `
      <i class="bi ${icon}" style="font-size:1.3rem; color:${iconColor}; line-height:1;"></i>
      <div style="flex-grow:1;">
        ${title ? `<h5 style="font-weight:700; margin-bottom:0.2rem; font-size:0.95rem;">${title}</h5>` : ''}
        <p style="margin:0; color:#475569;">${message}</p>
      </div>
      <button style="background:none; border:none; cursor:pointer; color:#94A3B8; font-size:1.1rem; line-height:1;" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  // Generic Modal Trigger
  openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
      m.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
      m.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  },

  // Initialize Global Features
  init() {
    this.auth.updateNav();

    // Mobile Menu Toggle
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => {
        const isVisible = navMenu.style.display === 'flex';
        navMenu.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
          navMenu.style.cssText = `
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: #FFFFFF;
            padding: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-bottom: 2px solid var(--primary-blue);
            z-index: 1000;
          `;
        }
      });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        this.showToast(`Thank you! ${email} has been subscribed to verified travel updates.`, 'success', 'Newsletter Subscribed');
        newsletterForm.reset();
      });
    }

    // Top Header Sticky Shadow Effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.main-header');
      if (header) {
        if (window.scrollY > 40) {
          header.style.boxShadow = '0 6px 25px rgba(8, 41, 87, 0.12)';
        } else {
          header.style.boxShadow = '0 4px 20px rgba(8, 41, 87, 0.04)';
        }
      }
    });
  }
};

function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;

  const isOpen = drawer.classList.toggle('active');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const toggleButton = document.getElementById('mobileMenuBtn');

  if (backdrop) backdrop.classList.toggle('active', isOpen);
  if (toggleButton) toggleButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('mobile-drawer-open', isOpen);
}

document.addEventListener('DOMContentLoaded', () => {
  MyTravelApp.init();
});

window.MyTravelApp = MyTravelApp;
window.toggleMobileMenu = toggleMobileMenu;
