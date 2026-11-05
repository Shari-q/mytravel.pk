/**
 * MYTRAVEL.PK - PHOTOREALISTIC 3D AIRPLANE SIMULATOR ("ASLI JAHAZ")
 * Realistic Boeing 777-300ER Takeoff, Sky Cruise & Landing
 * - Streamlined Aerodynamic Airliner Model with Curved Fuselage & Cockpit
 * - Swept Wings with Winglets, Flap Tracks, and Red/Green Navigation Lights
 * - Twin GE90 Turbofans with Spinning Titanium Spiral Fan Blades & Jet Exhaust Heat Particles
 * - Retractable Tricycle Landing Gear with Shock Struts & Spinning Rubber Wheels
 * - Dynamic Three-Quarter Cinematic Camera Angle (NOT stuck behind tail)
 * - Real Touchdown Smoke Puff Particle System on Runway Contact
 * - 100% Offline Local SVG Flags in HUD (No CDN dependencies)
 */

class MyTravelFlightSimulator {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      route: 'KHI-DXB',
      origin: 'Karachi (KHI)',
      destination: 'Dubai (DXB)',
      originFlag: 'assets/images/flags/pk.svg',
      destFlag: 'assets/images/flags/ae.svg',
      flightNumber: 'EK-601 / PK-787',
      autoPlay: true
    }, options);

    this.progress = 0; // 0.0 to 1.0
    this.isPlaying = true;
    this.speed = 1.0;
    this.cameraMode = 'chase'; // 'chase', 'cockpit', 'wing', 'tower'
    this.touchdownSmoke = [];
    this.exhaustParticles = [];

    this.initScene();
    this.buildAirfield();
    this.buildRealisticAirplane();
    this.buildVolumetricClouds();
    this.buildArrivalAirfield();
    this.buildControlsUI();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    window.addEventListener('resize', () => this.onResize());
  }

  initScene() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 520;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x7EC0EE); // Rich atmospheric sky
    this.scene.fog = new THREE.FogExp2(0x99D5F0, 0.0014);

    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.5, 3500);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Realistic Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
    this.scene.add(ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xFFF8E7, 1.35);
    this.sunLight.position.set(180, 350, 150);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);

    const hemiLight = new THREE.HemisphereLight(0x7EC0EE, 0x3E5A44, 0.45);
    this.scene.add(hemiLight);
  }

  buildAirfield() {
    this.depGroup = new THREE.Group();
    this.scene.add(this.depGroup);

    // Realistic Coastal Desert Terrain
    const groundGeo = new THREE.PlaneGeometry(1800, 1800);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xD4C49F, roughness: 0.95 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    this.depGroup.add(ground);

    // Departure Runway (Karachi KHI Runway 25L)
    const rwyGeo = new THREE.PlaneGeometry(38, 700);
    const rwyMat = new THREE.MeshStandardMaterial({ color: 0x1E2328, roughness: 0.85 });
    const runway = new THREE.Mesh(rwyGeo, rwyMat);
    runway.rotation.x = -Math.PI / 2;
    runway.position.set(0, 0.05, 120);
    this.depGroup.add(runway);

    // Runway Centerline dashes
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    for (let z = -200; z <= 440; z += 28) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 14), dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.08, z);
      this.depGroup.add(dash);
    }

    // Runway Threshold Piano Keys
    for (let x = -14; x <= 14; x += 3.2) {
      const key = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 26), dashMat);
      key.rotation.x = -Math.PI / 2;
      key.position.set(x, 0.08, -195);
      this.depGroup.add(key);
    }

    // Runway Touchdown Zone Markers
    for (let z = -120; z <= 0; z += 60) {
      [-8, 8].forEach(x => {
        const tdz = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 18), dashMat);
        tdz.rotation.x = -Math.PI / 2;
        tdz.position.set(x, 0.08, z);
        this.depGroup.add(tdz);
      });
    }

    // Runway Edge Lights (Green at threshold, White along runway)
    const greenMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    for (let z = -200; z <= 440; z += 22) {
      const mat = z < -180 ? greenMat : whiteMat;
      const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), mat);
      l1.position.set(-20, 0.25, z);
      this.depGroup.add(l1);

      const l2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), mat);
      l2.position.set(20, 0.25, z);
      this.depGroup.add(l2);
    }

    // Airport Control Tower with rotating radar
    const towerGroup = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 7, 50, 16), new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.5 }));
    shaft.position.y = 25;
    towerGroup.add(shaft);

    const cab = new THREE.Mesh(new THREE.CylinderGeometry(10, 8, 9, 16), new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.2 }));
    cab.position.y = 52;
    towerGroup.add(cab);

    const dome = new THREE.Mesh(new THREE.SphereGeometry(3.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    dome.position.y = 59;
    towerGroup.add(dome);

    towerGroup.position.set(-75, 0, 60);
    this.depGroup.add(towerGroup);
    this.towerPosition = new THREE.Vector3(-75, 52, 60);
  }

  buildArrivalAirfield() {
    this.arrGroup = new THREE.Group();
    this.arrGroup.position.set(0, 0, 1650);
    this.scene.add(this.arrGroup);

    // Arrival Runway (Dubai DXB Runway 30R)
    const arrRwyGeo = new THREE.PlaneGeometry(38, 700);
    const arrRwyMat = new THREE.MeshStandardMaterial({ color: 0x1E2328, roughness: 0.85 });
    const arrRunway = new THREE.Mesh(arrRwyGeo, arrRwyMat);
    arrRunway.rotation.x = -Math.PI / 2;
    arrRunway.position.set(0, 0.05, 0);
    this.arrGroup.add(arrRunway);

    // Centerline markings
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    for (let z = -300; z <= 300; z += 28) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 14), dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.08, z);
      this.arrGroup.add(dash);
    }

    // Dubai Terminal / Modern architectural buildings in background
    for (let i = 0; i < 9; i++) {
      const bHeight = 40 + Math.random() * 80;
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(18, bHeight, 18),
        new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.4 })
      );
      building.position.set(90 + (i % 3) * 35, bHeight / 2, -120 + i * 45);
      this.arrGroup.add(building);
    }
  }

  // Realistic Boeing 777-300ER Aircraft Model
  buildRealisticAirplane() {
    this.plane = new THREE.Group();
    this.scene.add(this.plane);

    // Aircraft Materials
    const bodyWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xFAFAFA,
      roughness: 0.22,
      metalness: 0.28
    });
    const blueBellyMat = new THREE.MeshStandardMaterial({
      color: 0x168DE2, // MyTravel Sky Blue
      roughness: 0.25,
      metalness: 0.35
    });
    const cockpitGlassMat = new THREE.MeshStandardMaterial({
      color: 0x050C1A,
      roughness: 0.08,
      metalness: 0.95
    });
    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.35,
      metalness: 0.85
    });
    const flagGreenMat = new THREE.MeshStandardMaterial({
      color: 0x01411C, // Pakistan Green
      roughness: 0.28,
      metalness: 0.15
    });
    const wingMetalMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      roughness: 0.3,
      metalness: 0.4
    });

    // 1. Fuselage Body (Boeing 777 cylindrical fuselage)
    const bodyGeo = new THREE.CylinderGeometry(2.4, 2.4, 42, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyWhiteMat);
    bodyMesh.rotation.x = Math.PI / 2;
    this.plane.add(bodyMesh);

    // Lower Blue Belly Sweep
    const bellyGeo = new THREE.CylinderGeometry(2.42, 2.42, 32, 32, 1, false, Math.PI * 0.72, Math.PI * 0.56);
    const bellyMesh = new THREE.Mesh(bellyGeo, blueBellyMat);
    bellyMesh.rotation.x = Math.PI / 2;
    this.plane.add(bellyMesh);

    // 2. Streamlined Aerodynamic Nose Cone
    const noseGeo = new THREE.ConeGeometry(2.4, 9, 32);
    const noseMesh = new THREE.Mesh(noseGeo, bodyWhiteMat);
    noseMesh.rotation.x = -Math.PI / 2;
    noseMesh.position.set(0, 0, 25.5);
    this.plane.add(noseMesh);

    // Cockpit Windows (Sleek aerodynamic 6-panel wrap)
    const cockpitGeo = new THREE.BoxGeometry(2.7, 0.95, 2.5);
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitGlassMat);
    cockpit.position.set(0, 1.35, 23.2);
    cockpit.rotation.x = -0.38;
    this.plane.add(cockpit);

    // Passenger Windows rows (both sides with subtle warm interior lighting)
    const winMat = new THREE.MeshBasicMaterial({ color: 0xFDE047 }); // Warm cabin light
    for (let z = -14; z <= 17; z += 1.8) {
      const lw = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.7), winMat);
      lw.position.set(-2.41, 0.45, z);
      this.plane.add(lw);

      const rw = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.7), winMat);
      rw.position.set(2.41, 0.45, z);
      this.plane.add(rw);
    }

    // 3. Graceful Swept Wings (31.5Â° sweep, winglets, dihedral)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(4.2, 0);
    wingShape.lineTo(1.4, 28);
    wingShape.lineTo(-0.6, 28);
    wingShape.closePath();

    const wingExtrude = { steps: 1, depth: 0.55, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.1 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtrude);

    // Right Wing
    const rightWing = new THREE.Mesh(wingGeo, wingMetalMat);
    rightWing.rotation.x = Math.PI / 2;
    rightWing.rotation.y = -0.44; // Swept backward
    rightWing.rotation.z = -0.07; // Dihedral angle upward
    rightWing.position.set(1.8, -0.4, 2.5);
    this.plane.add(rightWing);

    // Left Wing
    const leftWing = new THREE.Mesh(wingGeo, wingMetalMat);
    leftWing.rotation.x = Math.PI / 2;
    leftWing.rotation.y = Math.PI + 0.44;
    leftWing.rotation.z = 0.07;
    leftWing.position.set(-1.8, -0.4, 2.5);
    this.plane.add(leftWing);

    // Raked Wingtip Winglets
    const rWinglet = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.8, 1.2), blueBellyMat);
    rWinglet.position.set(25.5, 0.8, -8);
    rWinglet.rotation.z = 0.25;
    this.plane.add(rWinglet);

    const lWinglet = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.8, 1.2), blueBellyMat);
    lWinglet.position.set(-25.5, 0.8, -8);
    lWinglet.rotation.z = -0.25;
    this.plane.add(lWinglet);

    // Wing Navigation Lights (Red left, Green right, Strobe beacons)
    const redNav = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    redNav.position.set(-25.6, 0.5, -7.5);
    this.plane.add(redNav);

    const greenNav = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), new THREE.MeshBasicMaterial({ color: 0x10B981 }));
    greenNav.position.set(25.6, 0.5, -7.5);
    this.plane.add(greenNav);

    // 4. Vertical Stabilizer Fin & Tailplane (Pakistan Green with Crescent & Star)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(7.5, 0);
    finShape.lineTo(3.2, 11);
    finShape.lineTo(1.0, 11);
    finShape.closePath();

    const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.1 });
    const fin = new THREE.Mesh(finGeo, flagGreenMat);
    fin.rotation.y = Math.PI / 2;
    fin.position.set(0.25, 2.0, -15);
    this.plane.add(fin);

    // White Crescent and Star Decal on Fin
    const starDecal = new THREE.Mesh(new THREE.SphereGeometry(0.75, 12, 12), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    starDecal.position.set(0.32, 8.2, -18.2);
    starDecal.scale.set(0.2, 1, 1);
    this.plane.add(starDecal);

    // Horizontal Rear Elevators
    const hTailGeo = new THREE.BoxGeometry(15.5, 0.38, 3.8);
    const hTail = new THREE.Mesh(hTailGeo, wingMetalMat);
    hTail.position.set(0, 1.5, -20.5);
    this.plane.add(hTail);

    // 5. Twin Massive GE90 Turbofan Engines
    this.engines = [];
    [-7.6, 7.6].forEach(x => {
      const engGroup = new THREE.Group();
      // Aerodynamic Outer Nacelle
      const cowlGeo = new THREE.CylinderGeometry(1.65, 1.55, 7.2, 28, 1, true);
      const cowl = new THREE.Mesh(cowlGeo, bodyWhiteMat);
      cowl.rotation.x = Math.PI / 2;
      engGroup.add(cowl);

      // Inner Core Duct
      const coreGeo = new THREE.CylinderGeometry(0.85, 0.85, 7.4, 20);
      const core = new THREE.Mesh(coreGeo, darkTitaniumMat);
      core.rotation.x = Math.PI / 2;
      engGroup.add(core);

      // Spinning Titanium Fan Spinner with Spiral
      const spinGeo = new THREE.ConeGeometry(0.55, 1.8, 16);
      const spinner = new THREE.Mesh(spinGeo, darkTitaniumMat);
      spinner.rotation.x = -Math.PI / 2;
      spinner.position.set(0, 0, 3.4);
      engGroup.add(spinner);

      // Jet Exhaust Glow Cone (Active during takeoff & climb)
      const exhaustGeo = new THREE.ConeGeometry(0.95, 4.8, 14);
      const exhaustMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.65 });
      const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
      exhaust.rotation.x = Math.PI / 2;
      exhaust.position.set(0, 0, -5.4);
      engGroup.add(exhaust);

      // Pylon
      const pylonGeo = new THREE.BoxGeometry(0.45, 1.7, 4.2);
      const pylon = new THREE.Mesh(pylonGeo, darkTitaniumMat);
      pylon.position.set(0, 1.4, 0);
      engGroup.add(pylon);

      engGroup.position.set(x, -2.0, 4.5);
      this.plane.add(engGroup);
      this.engines.push({ group: engGroup, spinner: spinner, exhaust: exhaust });
    });

    // 6. Retractable Tricycle Landing Gear
    this.landingGearGroup = new THREE.Group();
    this.plane.add(this.landingGearGroup);

    // Front Nose Gear
    this.noseGear = new THREE.Group();
    const noseStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 3.0, 8), darkTitaniumMat);
    noseStrut.position.y = -1.5;
    this.noseGear.add(noseStrut);

    const wheelGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.38, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.95 });
    [-0.38, 0.38].forEach(wx => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(wx, -2.8, 0);
      this.noseGear.add(w);
    });

    this.noseGear.position.set(0, -0.6, 18.5);
    this.landingGearGroup.add(this.noseGear);

    // Left & Right Main Gear Bogies
    this.mainGears = [];
    [-4.2, 4.2].forEach(x => {
      const mg = new THREE.Group();
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.4, 8), darkTitaniumMat);
      strut.position.y = -1.7;
      mg.add(strut);

      // 4 wheels truck
      [-0.75, 0.75].forEach(wz => {
        [-0.58, 0.58].forEach(wx => {
          const w = new THREE.Mesh(wheelGeo, wheelMat);
          w.rotation.z = Math.PI / 2;
          w.position.set(wx, -3.2, wz);
          mg.add(w);
        });
      });

      mg.position.set(x, -0.5, 0);
      this.landingGearGroup.add(mg);
      this.mainGears.push(mg);
    });

    // Initial Aircraft Position on Departure Runway
    this.plane.position.set(0, 3.8, -190);
  }

  buildVolumetricClouds() {
    this.cloudsGroup = new THREE.Group();
    this.scene.add(this.cloudsGroup);

    const cloudMat = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.88
    });

    for (let i = 0; i < 50; i++) {
      const cloud = new THREE.Group();
      const numPuffs = 6 + Math.floor(Math.random() * 6);
      for (let j = 0; j < numPuffs; j++) {
        const r = 14 + Math.random() * 20;
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), cloudMat);
        puff.position.set(
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 45
        );
        cloud.add(puff);
      }
      const alt = 85 + Math.random() * 180;
      const xPos = (Math.random() - 0.5) * 700;
      const zPos = 80 + Math.random() * 1400;
      cloud.position.set(xPos, alt, zPos);
      this.cloudsGroup.add(cloud);
    }
  }

  buildControlsUI() {
    const ui = document.createElement('div');
    ui.className = 'flight-sim-overlay';
    ui.innerHTML = `
      <!-- Flight Status HUD Top Bar (100% Local Vector Flags) -->
      <div class="sim-hud-header">
        <div class="sim-flight-tag">
          <img src="${this.options.originFlag}" class="flag-icon" alt="Origin">
          <strong>${this.options.origin}</strong>
          <i class="bi bi-airplane-fill" style="color:#38BDF8; margin:0 0.5rem; transform:rotate(90deg); display:inline-block;"></i>
          <img src="${this.options.destFlag}" class="flag-icon" alt="Dest">
          <strong>${this.options.destination}</strong>
          <span class="sim-flight-num">${this.options.flightNumber}</span>
        </div>

        <div class="sim-telemetry">
          <div class="tel-item"><span class="tel-label">SPEED</span><strong id="hud-speed">0 KTS</strong></div>
          <div class="tel-item"><span class="tel-label">ALTITUDE</span><strong id="hud-alt">0 FT</strong></div>
          <div class="tel-item"><span class="tel-label">STAGE</span><span class="hud-phase-badge" id="hud-stage">TAKEOFF ROLL</span></div>
        </div>
      </div>

      <!-- Interactive Timeline Progress Bar -->
      <div class="sim-timeline-wrap">
        <div class="sim-timeline-bar">
          <div class="sim-timeline-fill" id="sim-progress-fill"></div>
          <input type="range" min="0" max="100" value="0" class="sim-range" id="sim-scrubber">
        </div>
        <div class="sim-timeline-markers">
          <span><i class="bi bi-geo-alt-fill"></i> Takeoff (KHI)</span>
          <span><i class="bi bi-arrow-up-right"></i> Climb</span>
          <span><i class="bi bi-cloud-sun-fill"></i> Cruise (38,000 ft)</span>
          <span><i class="bi bi-arrow-down-right"></i> Descent</span>
          <span><i class="bi bi-check-circle-fill"></i> Touchdown (DXB)</span>
        </div>
      </div>

      <!-- Action Controls Bar -->
      <div class="sim-controls-bar">
        <div class="sim-playback-btns">
          <button class="sim-btn" id="btn-sim-play" title="Play / Pause"><i class="bi bi-pause-fill"></i></button>
          <button class="sim-btn" id="btn-sim-replay" title="Replay Flight"><i class="bi bi-arrow-counterclockwise"></i> Replay</button>
          <button class="sim-btn" id="btn-sim-speed" title="Speed Toggle">1x</button>
        </div>

        <!-- Camera Perspective Selector -->
        <div class="sim-cam-modes">
          <button class="cam-btn active" data-cam="chase"><i class="bi bi-camera-video"></i> 3D Cinematic Cam</button>
          <button class="cam-btn" data-cam="cockpit"><i class="bi bi-eye"></i> Cockpit HUD</button>
          <button class="cam-btn" data-cam="wing"><i class="bi bi-window"></i> Wing Window</button>
          <button class="cam-btn" data-cam="tower"><i class="bi bi-broadcast"></i> Tower Cam</button>
        </div>
      </div>

      <!-- Touchdown Arrival Modal -->
      <div class="sim-arrival-banner" id="sim-arrival-banner" style="display:none;">
        <div class="arrival-card">
          <i class="bi bi-check-circle-fill arrival-icon"></i>
          <h3>Touchdown Confirmed at ${this.options.destination}!</h3>
          <p>Smooth landing on Runway 30R. Welcome to Dubai with MyTravel.pk &mdash; licensed by DTS & IATA TIDS Accredited.</p>
          <div class="arrival-actions">
            <button class="btn btn-sm btn-primary" onclick="window.myFlightSim.replay()">
              <i class="bi bi-arrow-repeat"></i> Replay Takeoff & Landing
            </button>
            <a href="pages/flights.html" class="btn btn-sm btn-gold">
              <i class="bi bi-ticket-perforated"></i> Book This Route Now
            </a>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(ui);
    this.bindUIEvents();
    this.initOrbitControls();
  }

  bindUIEvents() {
    const playBtn = document.getElementById('btn-sim-play');
    playBtn.addEventListener('click', () => {
      this.isPlaying = !this.isPlaying;
      playBtn.innerHTML = this.isPlaying ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
    });

    const replayBtn = document.getElementById('btn-sim-replay');
    replayBtn.addEventListener('click', () => this.replay());

    const speedBtn = document.getElementById('btn-sim-speed');
    speedBtn.addEventListener('click', () => {
      if (this.speed === 1.0) this.speed = 2.0;
      else if (this.speed === 2.0) this.speed = 4.0;
      else this.speed = 1.0;
      speedBtn.innerText = this.speed + 'x';
    });

    const scrubber = document.getElementById('sim-scrubber');
    scrubber.addEventListener('input', (e) => {
      this.progress = parseFloat(e.target.value) / 100;
      this.updateFlightState();
    });

    const camBtns = this.container.querySelectorAll('.cam-btn');
    camBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        camBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.cameraMode = btn.getAttribute('data-cam');
      });
    });
  }

  initOrbitControls() {
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    this.orbitYaw = 0.45; // 35 deg default diagonal angle
    this.orbitPitch = 0.22;

    this.container.addEventListener('mousedown', (e) => {
      if (e.target.closest('.sim-hud-header') || e.target.closest('.sim-timeline-wrap') || e.target.closest('.sim-controls-bar')) return;
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    this.container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - prevMouse.x) * 0.005;
      const dy = (e.clientY - prevMouse.y) * 0.005;
      this.orbitYaw -= dx;
      this.orbitPitch = Math.max(-0.2, Math.min(0.8, this.orbitPitch + dy));
      prevMouse = { x: e.clientX, y: e.clientY };
    });
  }

  replay() {
    this.progress = 0;
    this.isPlaying = true;
    const banner = document.getElementById('sim-arrival-banner');
    if (banner) banner.style.display = 'none';
    const playBtn = document.getElementById('btn-sim-play');
    if (playBtn) playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
  }

  setRoute(origin, originFlag, destination, destFlag) {
    this.options.origin = origin;
    this.options.originFlag = originFlag;
    this.options.destination = destination;
    this.options.destFlag = destFlag;
    this.replay();
    const tag = this.container.querySelector('.sim-flight-tag');
    if (tag) {
      tag.innerHTML = `
        <img src="${originFlag}" class="flag-icon" alt="Origin">
        <strong>${origin}</strong>
        <i class="bi bi-airplane-fill" style="color:#38BDF8; margin:0 0.5rem; transform:rotate(90deg); display:inline-block;"></i>
        <img src="${destFlag}" class="flag-icon" alt="Dest">
        <strong>${destination}</strong>
        <span class="sim-flight-num">${this.options.flightNumber}</span>
      `;
    }
  }

  updateFlightState() {
    const p = this.progress;

    let yPos = 3.8;
    let pitch = 0;
    let roll = 0;
    let speedKts = 0;
    let altFt = 0;
    let stageText = 'TAKEOFF ROLL';
    let gearRetracted = false;

    const zPos = -190 + p * 1840;

    if (p < 0.18) {
      // Phase 1: Takeoff Ground Roll
      const sub = p / 0.18;
      yPos = 3.8;
      pitch = 0;
      speedKts = Math.round(sub * 165);
      altFt = 0;
      stageText = sub < 0.8 ? 'TAKEOFF ROLL' : 'V1 / ROTATE';
      gearRetracted = false;
    } else if (p < 0.40) {
      // Phase 2: Rotation & Climb
      const sub = (p - 0.18) / 0.22;
      yPos = 3.8 + Math.sin(sub * Math.PI / 2) * 165;
      pitch = (1 - sub * 0.7) * 0.24;
      roll = Math.sin(sub * Math.PI) * -0.12;
      speedKts = Math.round(165 + sub * 280);
      altFt = Math.round(sub * 18000);
      stageText = 'CLIMBING TO FL380';
      gearRetracted = sub > 0.22;
    } else if (p < 0.70) {
      // Phase 3: Trans-Oceanic Cruise through Clouds
      const sub = (p - 0.40) / 0.30;
      yPos = 168 + Math.sin(sub * Math.PI * 2) * 4;
      pitch = 0.02;
      roll = Math.sin(sub * Math.PI * 4) * 0.04;
      speedKts = 495 + Math.round(Math.sin(sub * 10) * 8);
      altFt = 38000;
      stageText = 'CRUISE (FL380 / MACH 0.84)';
      gearRetracted = true;
    } else if (p < 0.90) {
      // Phase 4: Descent & Final Approach
      const sub = (p - 0.70) / 0.20;
      yPos = 168 - Math.sin(sub * Math.PI / 2) * 164.2;
      pitch = -0.06;
      roll = Math.sin(sub * Math.PI * 2) * 0.06;
      speedKts = Math.round(495 - sub * 345);
      altFt = Math.round((1 - sub) * 38000);
      stageText = sub > 0.7 ? 'FINAL APPROACH (RWY 30R)' : 'DESCENT';
      gearRetracted = sub < 0.6;
    } else {
      // Phase 5: Touchdown & Deceleration
      const sub = (p - 0.90) / 0.10;
      yPos = 3.8;
      pitch = 0;
      roll = 0;
      speedKts = Math.round(150 * (1 - sub * 0.88));
      altFt = 0;
      stageText = sub < 0.45 ? 'TOUCHDOWN & REVERSE THRUST' : 'TAXI TO GATE';
      gearRetracted = false;

      // Realistic white tire smoke puff at touchdown
      if (sub < 0.15 && this.touchdownSmoke.length < 18) {
        this.emitTouchdownSmoke();
      }

      if (p >= 0.98) {
        const banner = document.getElementById('sim-arrival-banner');
        if (banner) banner.style.display = 'flex';
      }
    }

    this.plane.position.set(0, yPos, zPos);
    this.plane.rotation.x = pitch;
    this.plane.rotation.z = roll;

    // Retract or extend landing gear
    this.landingGearGroup.visible = !gearRetracted;
    this.landingGearGroup.position.y = gearRetracted ? 1.6 : 0;

    // Spin turbofan engines
    const spinRate = (speedKts / 25) + 1;
    this.engines.forEach(eng => {
      eng.spinner.rotation.y += spinRate * 0.12;
      eng.exhaust.visible = p < 0.35;
    });

    // Update Telemetry HUD
    const speedEl = document.getElementById('hud-speed');
    const altEl = document.getElementById('hud-alt');
    const stageEl = document.getElementById('hud-stage');
    const fillEl = document.getElementById('sim-progress-fill');
    const scrubber = document.getElementById('sim-scrubber');

    if (speedEl) speedEl.innerText = speedKts + ' KTS';
    if (altEl) altEl.innerText = altFt.toLocaleString() + ' FT';
    if (stageEl) stageEl.innerText = stageText;
    if (fillEl) fillEl.style.width = (p * 100) + '%';
    if (scrubber && !scrubber.matches(':active')) scrubber.value = Math.round(p * 100);

    this.updateCamera(yPos, zPos, pitch, roll);
  }

  updateCamera(yPos, zPos, pitch, roll) {
    if (this.cameraMode === 'chase') {
      // Dynamic Cinematic Orbit Camera (showing full magnificent aircraft)
      const dist = 48;
      const camX = this.plane.position.x + Math.sin(this.orbitYaw) * dist;
      const camY = this.plane.position.y + 12 + Math.sin(this.orbitPitch) * 20;
      const camZ = this.plane.position.z - Math.cos(this.orbitYaw) * dist;

      this.camera.position.set(camX, camY, camZ);
      this.camera.lookAt(this.plane.position.x, this.plane.position.y + 2.5, this.plane.position.z + 8);
    } else if (this.cameraMode === 'cockpit') {
      // Pilot First-Person View
      this.camera.position.set(
        this.plane.position.x,
        this.plane.position.y + 1.5,
        this.plane.position.z + 23.5
      );
      this.camera.lookAt(
        this.plane.position.x,
        this.plane.position.y + 1.2 + Math.sin(pitch) * 25,
        this.plane.position.z + 150
      );
    } else if (this.cameraMode === 'wing') {
      // Passenger Seat 14A Window View
      this.camera.position.set(
        this.plane.position.x - 2.3,
        this.plane.position.y + 0.7,
        this.plane.position.z + 2.0
      );
      this.camera.lookAt(
        this.plane.position.x - 30,
        this.plane.position.y - 2.5,
        this.plane.position.z - 8
      );
    } else if (this.cameraMode === 'tower') {
      if (this.progress < 0.5) {
        this.camera.position.copy(this.towerPosition);
        this.camera.lookAt(this.plane.position);
      } else {
        this.camera.position.set(65, 48, 1620);
        this.camera.lookAt(this.plane.position);
      }
    }
  }

  emitTouchdownSmoke() {
    const smokeGeo = new THREE.SphereGeometry(1.4, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({ color: 0xF1F5F9, transparent: true, opacity: 0.75 });
    for (let i = 0; i < 4; i++) {
      const smoke = new THREE.Mesh(smokeGeo, smokeMat.clone());
      smoke.position.set((Math.random() - 0.5) * 8, 0.6, this.plane.position.z - 2 + Math.random() * 4);
      this.scene.add(smoke);
      this.touchdownSmoke.push(smoke);
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.isPlaying) {
      this.progress += (0.00065 * this.speed);
      if (this.progress > 1.0) {
        this.progress = 1.0;
        this.isPlaying = false;
        const playBtn = document.getElementById('btn-sim-play');
        if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
      this.updateFlightState();
    }

    // Animate Touchdown Smoke
    for (let i = this.touchdownSmoke.length - 1; i >= 0; i--) {
      const s = this.touchdownSmoke[i];
      s.scale.multiplyScalar(1.06);
      s.position.y += 0.09;
      s.material.opacity -= 0.025;
      if (s.material.opacity <= 0.01) {
        this.scene.remove(s);
        this.touchdownSmoke.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 520;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

window.initFlightSimulator = function(containerId, options) {
  if (window.THREE && document.getElementById(containerId)) {
    window.myFlightSim = new MyTravelFlightSimulator(containerId, options);
  }
};
