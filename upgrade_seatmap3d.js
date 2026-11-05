const fs = require('fs');

const seatmapJs = `/**
 * MYTRAVEL.PK - AUTHENTIC 3D AIRCRAFT CABIN & 2D SEAT MAP ENGINE ("ASLI JAHAZ")
 * Boeing 777-300ER Wide-Body Passenger Experience
 * Features:
 * - Real Cylindrical Fuselage with Curved Wall Panels
 * - Double-Pane Oval Aircraft Windows with Blue Sky, Clouds & Sunlight Outside
 * - Overhead Luggage Bins with Latch Handles & Boeing Sky Interior LED Mood Lighting
 * - Carpeted Aisle with Illuminated Emergency Floor Path Escape Strips
 * - Sculpted Ergonomic Seats with Antimacassar Linen Headrests, IFE Screens & Folding Tray Tables
 * - POV Camera Modes: First Person Window View, Aisle Walkthrough, Full Overhead
 * - Authentic 2D Architectural Airplane Blueprint with Cockpit, Galleys, Exits & Wings
 */

class MyTravelSeatMap {
  constructor(viewportId, fallbackId, options = {}) {
    this.viewport = document.getElementById(viewportId);
    this.fallback = document.getElementById(fallbackId);
    this.options = Object.assign({
      basePrice: 65000,
      currency: 'PKR',
      onSeatSelected: null
    }, options);

    this.selectedSeats = new Set(['14B']);
    this.rows = [
      // First Class (Luxury Private Suites)
      { row: 1, class: 'First Class Private Suite', type: 'first', seats: [{ id: '1A', status: 'occupied', price: 45000 }, { id: '1K', status: 'available', price: 45000 }] },
      { row: 2, class: 'First Class Private Suite', type: 'first', seats: [{ id: '2A', status: 'available', price: 45000 }, { id: '2K', status: 'occupied', price: 45000 }] },
      // Business Class (Lie-Flat Pods)
      { row: 5, class: 'Business Lie-Flat Suite', type: 'business', seats: [{ id: '5A', status: 'available', price: 25000 }, { id: '5D', status: 'occupied', price: 25000 }, { id: '5G', status: 'available', price: 25000 }, { id: '5K', status: 'available', price: 25000 }] },
      { row: 6, class: 'Business Lie-Flat Suite', type: 'business', seats: [{ id: '6A', status: 'available', price: 25000 }, { id: '6D', status: 'available', price: 25000 }, { id: '6G', status: 'occupied', price: 25000 }, { id: '6K', status: 'available', price: 25000 }] },
      // Economy Extra Legroom (Emergency Exit Row)
      { row: 12, class: 'Economy Extra Legroom (38\\" Pitch)', type: 'premium', seats: [{ id: '12A', status: 'available', price: 8000 }, { id: '12B', status: 'available', price: 8000 }, { id: '12C', status: 'occupied', price: 8000 }, { id: '12H', status: 'available', price: 8000 }, { id: '12J', status: 'available', price: 8000 }, { id: '12K', status: 'available', price: 8000 }] },
      // Standard Economy (Rows 14-18)
      { row: 14, class: 'Economy Standard', type: 'standard', seats: [{ id: '14A', status: 'available', price: 0 }, { id: '14B', status: 'selected', price: 0 }, { id: '14C', status: 'occupied', price: 0 }, { id: '14H', status: 'available', price: 0 }, { id: '14J', status: 'available', price: 0 }, { id: '14K', status: 'available', price: 0 }] },
      { row: 15, class: 'Economy Standard', type: 'standard', seats: [{ id: '15A', status: 'available', price: 0 }, { id: '15B', status: 'available', price: 0 }, { id: '15C', status: 'available', price: 0 }, { id: '15H', status: 'occupied', price: 0 }, { id: '15J', status: 'available', price: 0 }, { id: '15K', status: 'available', price: 0 }] },
      { row: 16, class: 'Economy Standard', type: 'standard', seats: [{ id: '16A', status: 'occupied', price: 0 }, { id: '16B', status: 'occupied', price: 0 }, { id: '16C', status: 'available', price: 0 }, { id: '16H', status: 'available', price: 0 }, { id: '16J', status: 'available', price: 0 }, { id: '16K', status: 'available', price: 0 }] },
      { row: 17, class: 'Economy Standard', type: 'standard', seats: [{ id: '17A', status: 'available', price: 0 }, { id: '17B', status: 'available', price: 0 }, { id: '17C', status: 'available', price: 0 }, { id: '17H', status: 'available', price: 0 }, { id: '17J', status: 'available', price: 0 }, { id: '17K', status: 'available', price: 0 }] },
      { row: 18, class: 'Economy Standard', type: 'standard', seats: [{ id: '18A', status: 'available', price: 0 }, { id: '18B', status: 'available', price: 0 }, { id: '18C', status: 'occupied', price: 0 }, { id: '18H', status: 'available', price: 0 }, { id: '18J', status: 'available', price: 0 }, { id: '18K', status: 'available', price: 0 }] }
    ];

    this.currentMode = '3d';
    this.povMode = 'aisle'; // 'aisle', 'seatPOV', 'overview'
    this.init2DMap();

    if (window.THREE && this.viewport) {
      this.init3DViewer();
    } else {
      this.toggleView('2d');
    }
  }

  // Authentic 2D Aircraft Blueprint Layout ("Asli Jahaz")
  init2DMap() {
    if (!this.fallback) return;
    let html = \`
      <div class="aircraft-blueprint">
        <!-- Airplane Nose Cone & Cockpit Schematic -->
        <div class="aircraft-cockpit">
          <div class="cockpit-radome"></div>
          <div class="cockpit-windows">
            <div class="cockpit-window-pane"></div>
            <div class="cockpit-window-pane" style="transform: skewY(6deg);"></div>
            <div class="cockpit-window-pane" style="transform: skewY(-6deg);"></div>
            <div class="cockpit-window-pane"></div>
          </div>
          <div class="cockpit-label">
            <i class="bi bi-airplane-engines"></i> BOEING 777-300ER &bull; FLIGHT DECK / COCKPIT
          </div>
        </div>

        <!-- Forward Galley & Emergency Exit Doors 1L/1R -->
        <div class="aircraft-facility-bar">
          <span><i class="bi bi-door-open" style="color:#10B981;"></i> Door 1L (Slide)</span>
          <span><i class="bi bi-cup-hot-fill"></i> Forward Galley</span>
          <span><i class="bi bi-door-closed" style="color:#10B981;"></i> Door 1R (Slide)</span>
        </div>

        <!-- Aircraft Wings Representation extending outwards -->
        <div class="blueprint-wing-indicator left-wing">
          <i class="bi bi-arrow-left"></i> Port Wing &bull; GE90 Turbofan
        </div>
        <div class="blueprint-wing-indicator right-wing">
          Starboard Wing &bull; GE90 Turbofan <i class="bi bi-arrow-right"></i>
        </div>

        <div class="fuselage-grid">
    \`;

    this.rows.forEach((r) => {
      // Overwing Emergency Exit Row indicator
      if (r.row === 12) {
        html += \`
          <div class="aircraft-exit-row">
            <span class="exit-marker"><i class="bi bi-arrow-left"></i> EXIT DOOR 2L</span>
            <span style="font-size:0.75rem; color:#FCD34D; font-weight:700; letter-spacing:0.05em;">
              <i class="bi bi-exclamation-triangle-fill"></i> OVERWING EMERGENCY EXIT &bull; EXTRA LEGROOM (38\\" PITCH)
            </span>
            <span class="exit-marker">EXIT DOOR 2R <i class="bi bi-arrow-right"></i></span>
          </div>
        \`;
      }

      html += \`<div class="seat-row" data-row="\${r.row}">\`;
      html += \`<span class="row-label">\${r.row}</span>\`;

      const half = Math.ceil(r.seats.length / 2);
      r.seats.forEach((seat, sIdx) => {
        if (sIdx === half) {
          html += \`<div class="aisle-gap"><i class="bi bi-arrow-down-up" style="font-size:0.7rem; color:#64748B;"></i></div>\`;
        }
        const isSel = this.selectedSeats.has(seat.id);
        const statusClass = isSel ? 'selected' : seat.status;
        const seatLetter = seat.id.replace(/[0-9]/g, '');
        const tooltip = \`\${seat.id} - \${r.class} (\${seat.price === 0 ? 'Free Standard' : 'PKR ' + seat.price.toLocaleString()})\`;
        html += \`
          <div class="seat-node \${statusClass}" 
               data-seat-id="\${seat.id}" 
               data-price="\${seat.price}" 
               data-class="\${r.class}"
               title="\${tooltip}">
            \${seatLetter}
          </div>
        \`;
      });

      html += \`<span class="row-label">\${r.row}</span>\`;
      html += \`</div>\`;
    });

    html += \`
        </div>

        <!-- Rear Galley & Lavatories -->
        <div class="aircraft-facility-bar" style="margin-top:1.5rem;">
          <span><i class="bi bi-door-open" style="color:#10B981;"></i> Aft Door L4</span>
          <span><i class="bi bi-cup-hot-fill"></i> Aft Galley & Lavatories</span>
          <span><i class="bi bi-door-closed" style="color:#10B981;"></i> Aft Door R4</span>
        </div>
      </div>
    \`;

    this.fallback.innerHTML = html;

    // Attach click events to 2D nodes
    this.fallback.querySelectorAll('.seat-node').forEach(node => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-seat-id');
        const price = parseInt(node.getAttribute('data-price') || '0', 10);
        const sClass = node.getAttribute('data-class');
        this.selectSeat(id, price, sClass);
      });
    });
  }

  // Authentic 3D Aircraft Cabin ("Asli Jahaz")
  init3DViewer() {
    const width = this.viewport.clientWidth || 700;
    const height = this.viewport.clientHeight || 450;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x061124);

    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    // Camera positioned right in the aisle at passenger eye-level (1.65m)
    this.camera.position.set(0, 1.65, 4.2);
    this.camera.lookAt(0, 1.25, -3.5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.viewport.appendChild(this.renderer.domElement);

    // Group holding the entire cabin interior
    this.planeGroup = new THREE.Group();
    this.scene.add(this.planeGroup);

    // 1. CARPETED CABIN FLOOR
    const floorGeo = new THREE.PlaneGeometry(4.2, 22);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111E33,
      roughness: 0.9,
      metalness: 0.05
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    this.planeGroup.add(floor);

    // Aisle carpet runner
    const aisleGeo = new THREE.PlaneGeometry(0.72, 22);
    const aisleMat = new THREE.MeshStandardMaterial({ color: 0x091424, roughness: 0.95 });
    const aisle = new THREE.Mesh(aisleGeo, aisleMat);
    aisle.rotation.x = -Math.PI / 2;
    aisle.position.set(0, 0.01, 0);
    this.planeGroup.add(aisle);

    // Glowing Photoluminescent Emergency Floor Pathway Strips
    const stripGeo = new THREE.PlaneGeometry(0.035, 22);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
    const leftStrip = new THREE.Mesh(stripGeo, stripMat);
    leftStrip.rotation.x = -Math.PI / 2;
    leftStrip.position.set(-0.36, 0.02, 0);
    this.planeGroup.add(leftStrip);

    const rightStrip = new THREE.Mesh(stripGeo, stripMat);
    rightStrip.rotation.x = -Math.PI / 2;
    rightStrip.position.set(0.36, 0.02, 0);
    this.planeGroup.add(rightStrip);

    // 2. CURVED AIRCRAFT FUSELAGE HULL
    const wallGeo = new THREE.CylinderGeometry(2.05, 2.05, 22, 36, 1, true, -Math.PI / 2, Math.PI);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xE8EEF5,
      side: THREE.BackSide,
      roughness: 0.5,
      metalness: 0.1
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.rotation.z = Math.PI / 2;
    wall.position.set(0, 1.5, 0);
    this.planeGroup.add(wall);

    // 3. PASSENGER WINDOWS WITH SKY & CLOUDS OUTSIDE
    this.addAirplaneWindows();

    // 4. OVERHEAD LUGGAGE BINS & BOEING SKY INTERIOR COVE LIGHTING
    this.addOverheadBinsAndCeiling();

    // 5. CABIN LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
    this.scene.add(ambientLight);

    // Boeing Sky Interior cyan mood light wash
    this.coveLight = new THREE.DirectionalLight(0x38BDF8, 1.1);
    this.coveLight.position.set(0, 3.2, 0);
    this.scene.add(this.coveLight);

    const warmAisleLight = new THREE.PointLight(0xFFF7ED, 1.3, 14);
    warmAisleLight.position.set(0, 2.4, 2);
    this.scene.add(warmAisleLight);

    // 6. BUILD HIGH-DETAIL REALISTIC SEATS WITH ANTIMACASSAR, TRAY TABLES & IFE
    this.seatMeshes = {};
    this.seatCoordinates = {};
    this.buildCabinSeats();

    // 7. RAYCASTING & CLICK SELECTION
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.viewport.addEventListener('click', (e) => this.on3DClick(e));
    this.initOrbitControls();

    // Add HUD View Switcher Overlay on top of 3D Canvas
    this.addCabinViewControls();

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  // Windows showing realistic blue sky and clouds outside
  addAirplaneWindows() {
    const windowMat = new THREE.MeshBasicMaterial({ color: 0x60A5FA }); // Sky blue window glow
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.85 });

    for (let z = -9; z <= 9; z += 1.35) {
      // Left oval window
      const leftWin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.48, 0.32), windowMat);
      leftWin.position.set(-2.02, 1.45, z);
      this.planeGroup.add(leftWin);

      // Cloud puff visible outside left window
      const leftCloud = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), cloudMat);
      leftCloud.position.set(-2.4, 1.35, z + (Math.sin(z) * 0.3));
      this.planeGroup.add(leftCloud);

      // Right oval window
      const rightWin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.48, 0.32), windowMat);
      rightWin.position.set(2.02, 1.45, z);
      this.planeGroup.add(rightWin);

      // Cloud puff visible outside right window
      const rightCloud = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), cloudMat);
      rightCloud.position.set(2.4, 1.35, z - (Math.sin(z) * 0.3));
      this.planeGroup.add(rightCloud);
    }
  }

  // Overhead luggage compartments & Boeing Sky Interior ceiling
  addOverheadBinsAndCeiling() {
    const binGeo = new THREE.BoxGeometry(0.72, 0.4, 20);
    const binMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.4, metalness: 0.1 });

    // Left overhead bin
    const leftBin = new THREE.Mesh(binGeo, binMat);
    leftBin.position.set(-1.32, 2.4, 0);
    leftBin.rotation.z = -0.18;
    this.planeGroup.add(leftBin);

    // Right overhead bin
    const rightBin = new THREE.Mesh(binGeo, binMat);
    rightBin.position.set(1.32, 2.4, 0);
    rightBin.rotation.z = 0.18;
    this.planeGroup.add(rightBin);

    // Ceiling center LED strip (Boeing Sky Interior mood tube)
    const ledGeo = new THREE.BoxGeometry(0.18, 0.04, 20);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(0, 2.85, 0);
    this.planeGroup.add(led);
  }

  // Build realistic airplane seats
  buildCabinSeats() {
    this.rows.forEach((r, rowIdx) => {
      const zPos = (rowIdx - this.rows.length / 2) * 1.4;
      const totalSeats = r.seats.length;
      const half = totalSeats / 2;

      r.seats.forEach((seat, seatIdx) => {
        let xPos = (seatIdx - half + 0.5) * 0.48;
        if (seatIdx >= half) xPos += 0.48; // Aisle spacing

        const seatGroup = this.createRealisticAirplaneSeat(seat, r.type);
        seatGroup.position.set(xPos, 0, zPos);
        seatGroup.userData = { seatId: seat.id, price: seat.price, className: r.class };
        this.planeGroup.add(seatGroup);
        this.seatMeshes[seat.id] = seatGroup;
        this.seatCoordinates[seat.id] = new THREE.Vector3(xPos, 1.1, zPos);
      });
    });
  }

  createRealisticAirplaneSeat(seat, rowType) {
    const group = new THREE.Group();

    // Signature brand cushion color
    let seatColor = 0x168DE2; // MyTravel Sky Blue
    if (seat.status === 'occupied') seatColor = 0x334155; // Slate gray
    if (this.selectedSeats.has(seat.id)) seatColor = 0xE5A93C; // Gold selected
    if (rowType === 'first') seatColor = 0x7C3AED; // Luxury purple

    const cushionMat = new THREE.MeshStandardMaterial({
      color: seatColor,
      roughness: 0.65,
      metalness: 0.15
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      metalness: 0.7
    });

    // 1. Seat Base Cushion
    const baseGeo = new THREE.BoxGeometry(0.44, 0.12, 0.46);
    const base = new THREE.Mesh(baseGeo, cushionMat);
    base.position.set(0, 0.46, 0);
    group.add(base);

    // 2. Contoured Backrest (ergonomic tilt)
    const backGeo = new THREE.BoxGeometry(0.43, 0.62, 0.12);
    const back = new THREE.Mesh(backGeo, cushionMat);
    back.position.set(0, 0.76, -0.19);
    back.rotation.x = -0.14; // Recline angle
    group.add(back);

    // 3. Antimacassar Linen Headrest Napkin (White embroidered headrest)
    const napkinGeo = new THREE.BoxGeometry(0.26, 0.18, 0.03);
    const napkinMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const napkin = new THREE.Mesh(napkinGeo, napkinMat);
    napkin.position.set(0, 1.0, -0.22);
    napkin.rotation.x = -0.14;
    group.add(napkin);

    // 4. In-Flight Entertainment Screen (IFE) on Seat Back
    const ifeFrameGeo = new THREE.BoxGeometry(0.32, 0.22, 0.02);
    const ifeFrameMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.2 });
    const ifeFrame = new THREE.Mesh(ifeFrameGeo, ifeFrameMat);
    ifeFrame.position.set(0, 0.85, -0.26);
    group.add(ifeFrame);

    // IFE Screen Display (Moving Map Blue Glow)
    const ifeScreenGeo = new THREE.PlaneGeometry(0.28, 0.18);
    const ifeScreenMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
    const ifeScreen = new THREE.Mesh(ifeScreenGeo, ifeScreenMat);
    ifeScreen.rotation.y = Math.PI;
    ifeScreen.position.set(0, 0.85, -0.275);
    group.add(ifeScreen);

    // 5. Folding Seatback Tray Table
    const trayGeo = new THREE.BoxGeometry(0.36, 0.02, 0.24);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.5 });
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.position.set(0, 0.58, -0.25);
    group.add(tray);

    // 6. Seat Armrests
    const armGeo = new THREE.BoxGeometry(0.06, 0.06, 0.38);
    const armLeft = new THREE.Mesh(armGeo, frameMat);
    armLeft.position.set(-0.24, 0.58, 0.02);
    group.add(armLeft);

    const armRight = new THREE.Mesh(armGeo, frameMat);
    armRight.position.set(0.24, 0.58, 0.02);
    group.add(armRight);

    // 7. Seat Base Legs
    const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.44, 8);
    const legLeft = new THREE.Mesh(legGeo, frameMat);
    legLeft.position.set(-0.18, 0.22, 0);
    group.add(legLeft);

    const legRight = new THREE.Mesh(legGeo, frameMat);
    legRight.position.set(0.18, 0.22, 0);
    group.add(legRight);

    // Store references for status updates
    group.cushionMesh = base;
    group.backMesh = back;

    return group;
  }

  addCabinViewControls() {
    const ctrlWrap = document.createElement('div');
    ctrlWrap.className = 'cabin-pov-bar';
    ctrlWrap.innerHTML = \`
      <button class="pov-btn active" data-pov="aisle"><i class="bi bi-person-walking"></i> Aisle View</button>
      <button class="pov-btn" data-pov="seatPOV"><i class="bi bi-window"></i> Window View (14B)</button>
      <button class="pov-btn" data-pov="overview"><i class="bi bi-arrows-fullscreen"></i> Full Cabin</button>
    \`;

    this.viewport.style.position = 'relative';
    this.viewport.appendChild(ctrlWrap);

    ctrlWrap.querySelectorAll('.pov-btn').forEach(b => {
      b.addEventListener('click', () => {
        ctrlWrap.querySelectorAll('.pov-btn').forEach(btn => btn.classList.remove('active'));
        b.classList.add('active');
        this.switchPOV(b.getAttribute('data-pov'));
      });
    });
  }

  switchPOV(mode) {
    this.povMode = mode;
    if (mode === 'aisle') {
      this.camera.position.set(0, 1.65, 4.2);
      this.camera.lookAt(0, 1.25, -3.5);
    } else if (mode === 'seatPOV') {
      // Sit in Seat 14B and look towards window
      this.camera.position.set(-0.7, 1.15, 0.5);
      this.camera.lookAt(-2.2, 1.35, 0.5);
    } else if (mode === 'overview') {
      this.camera.position.set(0, 3.4, 6.5);
      this.camera.lookAt(0, 0.8, -1.0);
    }
  }

  initOrbitControls() {
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    this.viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    this.viewport.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - prevMouse.x) * 0.005;
      const dy = (e.clientY - prevMouse.y) * 0.005;

      this.camera.position.x += dx * 2;
      this.camera.position.y = Math.max(0.8, Math.min(3.2, this.camera.position.y - dy * 2));
      this.camera.lookAt(0, 1.25, -2.5);

      prevMouse = { x: e.clientX, y: e.clientY };
    });

    // Touch support for mobile / tablet
    let touchStart = { x: 0, y: 0 };
    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    this.viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const dx = (e.touches[0].clientX - touchStart.x) * 0.005;
        const dy = (e.touches[0].clientY - touchStart.y) * 0.005;
        this.camera.position.x += dx * 2;
        this.camera.position.y = Math.max(0.8, Math.min(3.2, this.camera.position.y - dy * 2));
        this.camera.lookAt(0, 1.25, -2.5);
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
  }

  on3DClick(event) {
    const rect = this.viewport.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.planeGroup.children, true);

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      while (obj && !obj.userData?.seatId && obj.parent) {
        obj = obj.parent;
      }
      if (obj && obj.userData && obj.userData.seatId) {
        this.selectSeat(obj.userData.seatId, obj.userData.price, obj.userData.className);
      }
    }
  }

  selectSeat(seatId, price, className) {
    // Check occupancy
    let isOccupied = false;
    for (const r of this.rows) {
      const s = r.seats.find(x => x.id === seatId);
      if (s && s.status === 'occupied') {
        isOccupied = true;
        break;
      }
    }
    if (isOccupied) {
      alert(\`Seat \${seatId} is already occupied. Please select an available seat.\`);
      return;
    }

    // Single seat selection for primary traveler
    this.selectedSeats.clear();
    this.selectedSeats.add(seatId);

    // Update 3D seat colors
    Object.keys(this.seatMeshes).forEach(id => {
      const g = this.seatMeshes[id];
      const isSel = this.selectedSeats.has(id);
      const col = isSel ? 0xE5A93C : 0x168DE2;
      if (g.cushionMesh) g.cushionMesh.material.color.setHex(col);
      if (g.backMesh) g.backMesh.material.color.setHex(col);
    });

    // Update 2D nodes
    if (this.fallback) {
      this.fallback.querySelectorAll('.seat-node').forEach(n => {
        const id = n.getAttribute('data-seat-id');
        n.classList.remove('selected');
        if (this.selectedSeats.has(id)) {
          n.classList.add('selected');
        }
      });
    }

    // Update Display DOM elements
    const seatDisplay = document.getElementById('selected-seat-display');
    const feeDisplay = document.getElementById('seat-fee-display');
    const inputDisplay = document.getElementById('selected-seat-input');

    if (seatDisplay) seatDisplay.innerText = \`\${seatId} (\${className || 'Economy'})\`;
    if (feeDisplay) feeDisplay.innerText = price === 0 ? 'PKR 0 (Included)' : \`PKR \${price.toLocaleString()}\`;
    if (inputDisplay) inputDisplay.value = \`\${seatId} (\${className || 'Economy'})\`;

    // Smoothly animate camera towards selected seat
    const seatPos = this.seatCoordinates[seatId];
    if (seatPos) {
      this.camera.position.set(seatPos.x * 0.6, 1.45, seatPos.z + 1.8);
      this.camera.lookAt(seatPos.x, seatPos.y, seatPos.z);
    }

    if (typeof this.options.onSeatSelected === 'function') {
      this.options.onSeatSelected(seatId, price, className);
    }
  }

  toggleView(mode) {
    this.currentMode = mode;
    const btn3d = document.getElementById('btn-view-3d');
    const btn2d = document.getElementById('btn-view-2d');

    if (mode === '3d') {
      if (this.viewport) this.viewport.style.display = 'block';
      if (this.fallback) this.fallback.style.display = 'none';
      if (btn3d) btn3d.classList.add('active');
      if (btn2d) btn2d.classList.remove('active');
    } else {
      if (this.viewport) this.viewport.style.display = 'none';
      if (this.fallback) this.fallback.style.display = 'block';
      if (btn3d) btn3d.classList.remove('active');
      if (btn2d) btn2d.classList.add('active');
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    // Subtle Boeing Sky Interior pulse
    if (this.coveLight) {
      this.coveLight.intensity = 1.0 + Math.sin(Date.now() * 0.002) * 0.15;
    }
    if (this.renderer && this.scene && this.camera && this.currentMode === '3d') {
      this.renderer.render(this.scene, this.camera);
    }
  }

  onResize() {
    if (!this.viewport || !this.renderer || !this.camera) return;
    const width = this.viewport.clientWidth;
    const height = this.viewport.clientHeight || 450;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Global initialization helpers
window.initSeatMap = function(viewportId, fallbackId, options) {
  window.mySeatMap = new MyTravelSeatMap(viewportId, fallbackId, options);
};

window.toggleCabinView = function(mode) {
  if (window.mySeatMap) {
    window.mySeatMap.toggleView(mode);
  }
};
`;

const dest1 = 'C:/Users/PC/Desktop/MyTravel/frontend/js/seatmap3d.js';
const dest2 = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/js/seatmap3d.js';

fs.writeFileSync(dest1, seatmapJs, 'utf8');
fs.writeFileSync(dest2, seatmapJs, 'utf8');
console.log('Saved upgraded seatmap3d.js to Desktop and Scratch successfully!');
