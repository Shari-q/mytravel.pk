const fs = require('fs');

const originalCss = fs.readFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/original_main.css', 'utf8');

// Additional comprehensive styles
const additionalStyles = `
/* ==========================================================================
   ENHANCED COUNTRY FLAGS & AIRLINE BADGES
   ========================================================================== */
.flag-icon, .country-flag {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

.flag-icon-lg {
  width: 36px;
  height: 24px;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.flag-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #082957;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

/* ==========================================================================
   STRICT BRAND LOGO & BUTTON REFINEMENTS
   ========================================================================== */
.brand-logo-wrap {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-logo {
  height: 48px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
}

/* Permanently eliminate any duplicate text block next to logo */
.brand-text-block {
  display: none !important;
}

/* Polished Header Action Buttons */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-actions .btn-outline {
  border: 1.5px solid #E2E8F0;
  background: #FFFFFF;
  color: #082957;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.25s ease;
}

.header-actions .btn-outline:hover {
  background: #F0F7FF;
  border-color: #168DE2;
  color: #168DE2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(22, 141, 226, 0.15);
}

.header-actions .btn-primary {
  background: linear-gradient(135deg, #168DE2 0%, #0C61B2 100%);
  color: #FFFFFF;
  padding: 0.6rem 1.35rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 4px 14px rgba(22, 141, 226, 0.35);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.header-actions .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(22, 141, 226, 0.48);
  filter: brightness(1.05);
}

/* Gold Accent Button */
.btn-gold {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #FFFFFF !important;
  font-weight: 700;
  border: none;
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.25s ease;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
  filter: brightness(1.08);
}

/* ==========================================================================
   OFFICIAL ACCREDITATION & TRUST STRIP (USER SPECIFIED REFERENCE)
   ========================================================================== */
.accreditation-trust-strip {
  background: #FFFFFF !important;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
  padding: 1.25rem 0;
  width: 100%;
}

.accreditation-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.acc-brand {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.acc-logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.acc-tagline {
  font-size: 0.8125rem;
  color: #64748B;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.acc-seals {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.acc-seal-item {
  display: flex;
  align-items: center;
  transition: transform 0.25s ease;
}

.acc-seal-item:hover {
  transform: translateY(-2px);
}

.acc-seal-img {
  height: 48px;
  width: 48px;
  object-fit: contain;
}

.acc-payments {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.acc-accept-text {
  font-size: 0.8125rem;
  color: #64748B;
  font-weight: 600;
}

.acc-pay-logos {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.acc-pay-img {
  height: 24px;
  width: auto;
  object-fit: contain;
}

/* ==========================================================================
   3D FLIGHT TAKEOFF, SKY CRUISE & LANDING SIMULATOR
   ========================================================================== */
.flight-simulator-section {
  padding: 4.5rem 0;
  background: linear-gradient(180deg, #061124 0%, #0B1E3B 100%);
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
}

.sim-section-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 2.5rem;
}

.sim-section-header .badge {
  background: rgba(56, 189, 248, 0.15);
  color: #38BDF8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.85rem;
}

.sim-section-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
}

.sim-section-header p {
  color: #94A3B8;
  font-size: 1rem;
  line-height: 1.6;
}

.sim-route-selector-pills {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.route-pill-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #E2E8F0;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
}

.route-pill-btn:hover, .route-pill-btn.active {
  background: #168DE2;
  border-color: #38BDF8;
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(22, 141, 226, 0.4);
  transform: translateY(-2px);
}

.sim-viewport-container {
  position: relative;
  width: 100%;
  height: 520px;
  background: #000000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

#flight-sim-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.flight-sim-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  box-sizing: border-box;
  z-index: 10;
}

.sim-hud-header {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(6, 17, 36, 0.75);
  backdrop-filter: blur(12px);
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-wrap: wrap;
  gap: 1rem;
}

.sim-flight-tag {
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #FFFFFF;
}

.sim-flight-num {
  margin-left: 0.85rem;
  background: rgba(22, 141, 226, 0.25);
  color: #38BDF8;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.sim-telemetry {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.tel-item {
  display: flex;
  flex-direction: column;
}

.tel-label {
  font-size: 0.6875rem;
  color: #94A3B8;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.tel-item strong {
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  color: #38BDF8;
  font-weight: 700;
}

.hud-phase-badge {
  background: #10B981;
  color: #FFFFFF;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.sim-timeline-wrap {
  pointer-events: auto;
  background: rgba(6, 17, 36, 0.75);
  backdrop-filter: blur(12px);
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 0.5rem;
}

.sim-timeline-bar {
  position: relative;
  height: 8px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.sim-timeline-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #168DE2, #38BDF8);
  border-radius: 4px;
  width: 0%;
  transition: width 0.1s linear;
}

.sim-range {
  position: absolute;
  top: -4px;
  left: 0;
  width: 100%;
  height: 16px;
  opacity: 0;
  cursor: pointer;
  margin: 0;
}

.sim-timeline-markers {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 600;
}

.sim-controls-bar {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(6, 17, 36, 0.75);
  backdrop-filter: blur(12px);
  padding: 0.75rem 1.25rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.sim-playback-btns {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sim-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.sim-btn:hover {
  background: #168DE2;
  border-color: #38BDF8;
}

.sim-cam-modes {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cam-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #CBD5E1;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.cam-btn.active, .cam-btn:hover {
  background: #38BDF8;
  color: #061124;
  border-color: #38BDF8;
  font-weight: 700;
}

/* Arrival Celebration Banner */
.sim-arrival-banner {
  pointer-events: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(6, 17, 36, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 20;
}

.arrival-card {
  background: #0F172A;
  border: 2px solid #10B981;
  border-radius: 16px;
  padding: 2.25rem 2rem;
  text-align: center;
  max-width: 480px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

.arrival-icon {
  font-size: 3rem;
  color: #10B981;
  margin-bottom: 1rem;
  display: inline-block;
}

.arrival-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.arrival-card p {
  color: #94A3B8;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.arrival-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

/* ==========================================================================
   AUTHENTIC 3D CABIN & 2D AIRCRAFT BLUEPRINT ("ASLI JAHAZ")
   ========================================================================== */
.cabin-experience-section {
  padding: 5rem 0;
  background: #081B38;
  color: #FFFFFF;
}

.cabin-experience-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 3rem;
  align-items: center;
}

.cabin-stage-wrap {
  background: #061124;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1.25rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.cabin-controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cabin-view-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 3px;
  gap: 3px;
}

.cabin-view-toggle .toggle-btn {
  background: transparent;
  border: none;
  color: #94A3B8;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cabin-view-toggle .toggle-btn.active {
  background: #168DE2;
  color: #FFFFFF;
}

#cabin3d-viewport {
  width: 100%;
  height: 450px;
  border-radius: 10px;
  overflow: hidden;
  background: #061124;
  position: relative;
}

.cabin-pov-bar {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  background: rgba(6, 17, 36, 0.8);
  backdrop-filter: blur(8px);
  padding: 4px 6px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 10;
}

.pov-btn {
  background: transparent;
  border: none;
  color: #CBD5E1;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
}

.pov-btn.active, .pov-btn:hover {
  background: #38BDF8;
  color: #061124;
  font-weight: 700;
}

/* 2D Aircraft Blueprint Layout */
.aircraft-blueprint {
  background: #0A192F;
  border: 1.5px dashed #1E3A8A;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  position: relative;
  max-height: 450px;
  overflow-y: auto;
}

.aircraft-cockpit {
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
}

.cockpit-radome {
  width: 50px;
  height: 25px;
  background: #1E293B;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  margin: 0 auto 0.5rem;
  border: 1px solid #38BDF8;
}

.cockpit-windows {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 0.5rem;
}

.cockpit-window-pane {
  width: 14px;
  height: 10px;
  background: #38BDF8;
  border-radius: 2px;
}

.cockpit-label {
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.aircraft-facility-bar {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 1rem;
}

.blueprint-wing-indicator {
  position: absolute;
  top: 45%;
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 700;
}

.blueprint-wing-indicator.left-wing {
  left: 8px;
}

.blueprint-wing-indicator.right-wing {
  right: 8px;
}

.aircraft-exit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(245, 158, 11, 0.12);
  border: 1px dashed #F59E0B;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  margin: 0.75rem 0;
}

.exit-marker {
  color: #10B981;
  font-weight: 800;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.fuselage-grid {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 0 1rem;
}

.seat-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
}

.row-label {
  width: 22px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
}

.aisle-gap {
  width: 24px;
  text-align: center;
}

.seat-node {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.seat-node.available {
  background: #168DE2;
  color: #FFFFFF;
}

.seat-node.available:hover {
  transform: scale(1.15);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
}

.seat-node.occupied {
  background: #334155;
  color: #64748B;
  cursor: not-allowed;
  opacity: 0.6;
}

.seat-node.selected {
  background: #F59E0B;
  color: #FFFFFF;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.9);
  transform: scale(1.18);
  border: 2px solid #FFFFFF;
}

.seat-node.premium {
  background: #7C3AED;
  color: #FFFFFF;
}

/* ==========================================================================
   RESPONSIVE OPTIMIZATIONS
   ========================================================================== */
@media (max-width: 1024px) {
  .cabin-experience-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    height: 70px;
  }
  .brand-logo {
    height: 40px;
  }
  .sim-viewport-container {
    height: 420px;
  }
  .sim-telemetry {
    gap: 0.85rem;
  }
  .sim-cam-modes {
    display: none;
  }
  .accreditation-flex {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  .acc-seals {
    justify-content: center;
  }
  .acc-payments {
    justify-content: center;
  }
}
`;

const combinedCss = originalCss + '\n' + additionalStyles;

// Save to both locations
fs.writeFileSync('C:/Users/PC/Desktop/MyTravel/frontend/css/main.css', combinedCss, 'utf8');
fs.writeFileSync('C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/css/main.css', combinedCss, 'utf8');

console.log('Compiled master main.css with Flight Simulator, 3D Cabin, Accreditation Strip, and Buttons successfully!');
console.log('Total CSS size:', combinedCss.length, 'bytes');
