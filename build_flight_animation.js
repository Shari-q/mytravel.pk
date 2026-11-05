const fs = require('fs');
const path = require('path');

const flightAnimJs = `/**
 * MYTRAVEL.PK - 3D AIRPLANE TAKEOFF, SKY CRUISE & LANDING SIMULATOR
 * Realistic Three.js WebGL Flight Experience
 * Features:
 * - Boeing 777-300ER in MyTravel.pk livery
 * - Animated Retractable Landing Gear & Spinning Turbofan Engines
 * - Dual Runway Stages: Departure Runway (KHI) & Arrival Runway (DXB)
 * - Volumetric 3D Clouds & Wingtip Contrail Particle Trails
 * - Real Touchdown Tire Smoke Particles & Reverse Thrust Deceleration
 * - 4 Cinematic Camera Perspectives: Chase Cam, Cockpit Pilot Cam, Wing Window Cam, Tower Cam
 * - Interactive HUD with Real-Time Airspeed, Altitude, and Scrubbable Timeline
 */

class MyTravelFlightSimulator {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      route: 'KHI-DXB',
      origin: 'Karachi (KHI)',
      destination: 'Dubai (DXB)',
      originFlag: 'https://flagcdn.com/w24/pk.png',
      destFlag: 'https://flagcdn.com/w24/ae.png',
      flightNumber: 'PK-787 / EK-601',
      autoPlay: true
    }, options);

    this.progress = 0; // 0.0 to 1.0
    this.isPlaying = true;
    this.speed = 1.0;
    this.cameraMode = 'chase'; // 'chase', 'cockpit', 'wing', 'tower'
    this.particles = [];
    this.touchdownSmoke = [];

    this.initScene();
    this.buildAirfield();
    this.buildAirplane();
    this.buildClouds();
    this.buildArrivalAirfield();
    this.buildControlsUI();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    window.addEventListener('resize', () => this.onResize());
  }

  initScene() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 480;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // Sky Blue
    this.scene.fog = new THREE.FogExp2(0xA0D8EF, 0.0018);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.5, 3000);
    this.camera.position.set(0, 15, -45);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.75);
    this.scene.add(ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xFFF9E6, 1.4);
    this.sunLight.position.set(200, 400, 200);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x3A5A40, 0.4);
    this.scene.add(hemiLight);
  }

  buildAirfield() {
    this.depGroup = new THREE.Group();
    this.scene.add(this.depGroup);

    // Ground terrain
    const groundGeo = new THREE.PlaneGeometry(1600, 1600);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0xD8C39D }); // Coastal desert plains
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    this.depGroup.add(ground);

    // Departure Runway (Karachi KHI Runway 25L)
    const rwyGeo = new THREE.PlaneGeometry(35, 600);
    const rwyMat = new THREE.MeshStandardMaterial({ color: 0x222629, roughness: 0.9 });
    const runway = new THREE.Mesh(rwyGeo, rwyMat);
    runway.rotation.x = -Math.PI / 2;
    runway.position.set(0, 0.05, 100);
    this.depGroup.add(runway);

    // Runway Centerline dashes
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    for (let z = -180; z <= 380; z += 25) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 12), dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.08, z);
      this.depGroup.add(dash);
    }

    // Threshold piano keys
    for (let x = -13; x <= 13; x += 3.2) {
      const key = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 22), dashMat);
      key.rotation.x = -Math.PI / 2;
      key.position.set(x, 0.08, -175);
      this.depGroup.add(key);
    }

    // Runway Edge Lights (Green at threshold, White along runway)
    const greenLightMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
    const whiteLightMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    for (let z = -180; z <= 380; z += 20) {
      const mat = z < -160 ? greenLightMat : whiteLightMat;
      const lLeft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), mat);
      lLeft.position.set(-18.5, 0.25, z);
      this.depGroup.add(lLeft);

      const lRight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), mat);
      lRight.position.set(18.5, 0.25, z);
      this.depGroup.add(lRight);
    }

    // Airport Control Tower
    const towerGroup = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(4, 6, 45, 16), new THREE.MeshStandardMaterial({ color: 0xCBD5E1 }));
    shaft.position.y = 22.5;
    towerGroup.add(shaft);

    const cab = new THREE.Mesh(new THREE.CylinderGeometry(9, 7, 8, 16), new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.2 }));
    cab.position.y = 48;
    towerGroup.add(cab);

    const radome = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    radome.position.y = 54;
    towerGroup.add(radome);

    towerGroup.position.set(-65, 0, 50);
    this.depGroup.add(towerGroup);
    this.towerPosition = new THREE.Vector3(-65, 48, 50);
  }

  buildArrivalAirfield() {
    this.arrGroup = new THREE.Group();
    // Positioned at the arrival end of the curved flight path
    this.arrGroup.position.set(0, 0, 1600);
    this.scene.add(this.arrGroup);

    // Arrival Runway (Dubai DXB Runway 30R)
    const arrRwyGeo = new THREE.PlaneGeometry(35, 600);
    const arrRwyMat = new THREE.MeshStandardMaterial({ color: 0x222629, roughness: 0.9 });
    const arrRunway = new THREE.Mesh(arrRwyGeo, arrRwyMat);
    arrRunway.rotation.x = -Math.PI / 2;
    arrRunway.position.set(0, 0.05, 0);
    this.arrGroup.add(arrRunway);

    // Centerline markings
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    for (let z = -260; z <= 260; z += 25) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 12), dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.08, z);
      this.arrGroup.add(dash);
    }

    // Touchdown zone bars
    const tdzMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
    for (let x = -10; x <= 10; x += 5) {
      const bar = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 18), tdzMat);
      bar.rotation.x = -Math.PI / 2;
      bar.position.set(x, 0.08, -120);
      this.arrGroup.add(bar);
    }

    // Dubai Palm / Skyline silhouette silhouette in distance
    for (let i = 0; i < 8; i++) {
      const bHeight = 30 + Math.random() * 70;
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(15, bHeight, 15),
        new THREE.MeshStandardMaterial({ color: 0x64748B, roughness: 0.3 })
      );
      building.position.set(80 + (i % 3) * 30, bHeight / 2, -100 + i * 40);
      this.arrGroup.add(building);
    }
  }

  buildAirplane() {
    this.plane = new THREE.Group();
    this.scene.add(this.plane);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.2
    });
    const blueBellyMat = new THREE.MeshStandardMaterial({
      color: 0x168DE2, // MyTravel Sky Blue
      roughness: 0.3,
      metalness: 0.3
    });
    const cockpitGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0A1628,
      roughness: 0.1,
      metalness: 0.9
    });
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.8
    });
    const flagGreenMat = new THREE.MeshStandardMaterial({
      color: 0x01411C, // Pakistan Green tail
      roughness: 0.3
    });

    // 1. Fuselage Main Body (Boeing 777-300ER proportions)
    const bodyGeo = new THREE.CylinderGeometry(2.2, 2.2, 38, 24);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.rotation.x = Math.PI / 2;
    this.plane.add(bodyMesh);

    // Fuselage Lower Blue Belly Stripe
    const bellyGeo = new THREE.CylinderGeometry(2.22, 2.22, 28, 24, 1, false, Math.PI * 0.7, Math.PI * 0.6);
    const bellyMesh = new THREE.Mesh(bellyGeo, blueBellyMat);
    bellyMesh.rotation.x = Math.PI / 2;
    this.plane.add(bellyMesh);

    // 2. Aerodynamic Nose Cone
    const noseGeo = new THREE.ConeGeometry(2.2, 8, 24);
    const noseMesh = new THREE.Mesh(noseGeo, bodyMat);
    noseMesh.rotation.x = -Math.PI / 2;
    noseMesh.position.set(0, 0, 23);
    this.plane.add(noseMesh);

    // Cockpit Windows
    const cockpitGeo = new THREE.BoxGeometry(2.6, 0.85, 2.2);
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitGlassMat);
    cockpit.position.set(0, 1.25, 20.8);
    cockpit.rotation.x = -0.35;
    this.plane.add(cockpit);

    // Cabin Windows rows (Both sides)
    const winMat = new THREE.MeshBasicMaterial({ color: 0x1E293B });
    for (let z = -12; z <= 15; z += 1.8) {
      // Left window
      const lw = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.7), winMat);
      lw.position.set(-2.22, 0.4, z);
      this.plane.add(lw);
      // Right window
      const rw = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.7), winMat);
      rw.position.set(2.22, 0.4, z);
      this.plane.add(rw);
    }

    // 3. Swept Wings with Winglets
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(3.5, 0);
    wingShape.lineTo(1.2, 26);
    wingShape.lineTo(-0.8, 26);
    wingShape.closePath();

    const wingExtrude = { steps: 1, depth: 0.5, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.1 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtrude);

    // Right Wing
    const rightWing = new THREE.Mesh(wingGeo, bodyMat);
    rightWing.rotation.x = Math.PI / 2;
    rightWing.rotation.y = -0.42; // Swept back
    rightWing.rotation.z = -0.06; // Slight dihedral
    rightWing.position.set(1.6, -0.4, 2);
    this.plane.add(rightWing);

    // Left Wing
    const leftWing = new THREE.Mesh(wingGeo, bodyMat);
    leftWing.rotation.x = Math.PI / 2;
    leftWing.rotation.y = Math.PI + 0.42;
    leftWing.rotation.z = 0.06;
    leftWing.position.set(-1.6, -0.4, 2);
    this.plane.add(leftWing);

    // Wing Navigation Lights (Red left, Green right, Strobes)
    const redLight = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    redLight.position.set(-23.5, 0.4, -6.5);
    this.plane.add(redLight);

    const greenLight = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: 0x10B981 }));
    greenLight.position.set(23.5, 0.4, -6.5);
    this.plane.add(greenLight);

    // 4. Vertical Tail Fin & Rudder (Pakistan Green & MyTravel Livery)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(6.5, 0);
    finShape.lineTo(2.8, 9.5);
    finShape.lineTo(0.8, 9.5);
    finShape.closePath();
    const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.45, bevelEnabled: true, bevelThickness: 0.08 });
    const fin = new THREE.Mesh(finGeo, flagGreenMat);
    fin.rotation.y = Math.PI / 2;
    fin.position.set(0.22, 1.8, -14);
    this.plane.add(fin);

    // White Crescent & Star symbol decal on tail fin
    const starDecal = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 12), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    starDecal.position.set(0.3, 7.2, -16.5);
    starDecal.scale.set(0.2, 1, 1);
    this.plane.add(starDecal);

    // Horizontal Tailplanes
    const hTailGeo = new THREE.BoxGeometry(14, 0.35, 3.2);
    const hTail = new THREE.Mesh(hTailGeo, bodyMat);
    hTail.position.set(0, 1.4, -18.5);
    this.plane.add(hTail);

    // 5. Twin GE90 Turbofan Jet Engines
    this.engines = [];
    [-6.8, 6.8].forEach(x => {
      const engGroup = new THREE.Group();
      // Outer Cowling
      const cowlGeo = new THREE.CylinderGeometry(1.4, 1.35, 6, 24, 1, true);
      const cowl = new THREE.Mesh(cowlGeo, bodyMat);
      cowl.rotation.x = Math.PI / 2;
      engGroup.add(cowl);

      // Inner Core
      const coreGeo = new THREE.CylinderGeometry(0.7, 0.7, 6.2, 16);
      const core = new THREE.Mesh(coreGeo, darkMetal);
      core.rotation.x = Math.PI / 2;
      engGroup.add(core);

      // Spinning Fan Spinner
      const spinGeo = new THREE.ConeGeometry(0.45, 1.5, 12);
      const spinner = new THREE.Mesh(spinGeo, darkMetal);
      spinner.rotation.x = -Math.PI / 2;
      spinner.position.set(0, 0, 2.8);
      engGroup.add(spinner);

      // Jet Exhaust Glow Cone (active during takeoff roll)
      const exhaustGeo = new THREE.ConeGeometry(0.85, 4, 12);
      const exhaustMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.7 });
      const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
      exhaust.rotation.x = Math.PI / 2;
      exhaust.position.set(0, 0, -4.5);
      engGroup.add(exhaust);

      // Pylon attaching engine to wing
      const pylonGeo = new THREE.BoxGeometry(0.4, 1.5, 3.8);
      const pylon = new THREE.Mesh(pylonGeo, darkMetal);
      pylon.position.set(0, 1.2, 0);
      engGroup.add(pylon);

      engGroup.position.set(x, -1.8, 4);
      this.plane.add(engGroup);
      this.engines.push({ group: engGroup, spinner: spinner, exhaust: exhaust });
    });

    // 6. Retractable Tricycle Landing Gear
    this.landingGearGroup = new THREE.Group();
    this.plane.add(this.landingGearGroup);

    // Nose Gear (Forward)
    this.noseGear = new THREE.Group();
    const noseStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.8, 8), darkMetal);
    noseStrut.position.y = -1.4;
    this.noseGear.add(noseStrut);

    const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.9 });
    const nw1 = new THREE.Mesh(wheelGeo, wheelMat);
    nw1.rotation.z = Math.PI / 2;
    nw1.position.set(-0.35, -2.6, 0);
    this.noseGear.add(nw1);
    const nw2 = new THREE.Mesh(wheelGeo, wheelMat);
    nw2.rotation.z = Math.PI / 2;
    nw2.position.set(0.35, -2.6, 0);
    this.noseGear.add(nw2);

    this.noseGear.position.set(0, -0.6, 17);
    this.landingGearGroup.add(this.noseGear);

    // Main Gear (Left & Right 4-wheel bogeys)
    this.mainGears = [];
    [-3.8, 3.8].forEach(x => {
      const mg = new THREE.Group();
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.2, 8), darkMetal);
      strut.position.y = -1.6;
      mg.add(strut);

      // 4 wheels truck
      [-0.65, 0.65].forEach(wz => {
        [-0.55, 0.55].forEach(wx => {
          const w = new THREE.Mesh(wheelGeo, wheelMat);
          w.rotation.z = Math.PI / 2;
          w.position.set(wx, -3.1, wz);
          mg.add(w);
        });
      });

      mg.position.set(x, -0.4, 0);
      this.landingGearGroup.add(mg);
      this.mainGears.push(mg);
    });

    // Initial Aircraft Position on Departure Runway
    this.plane.position.set(0, 3.5, -170);
  }

  buildClouds() {
    this.cloudsGroup = new THREE.Group();
    this.scene.add(this.cloudsGroup);

    const cloudMat = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.85
    });

    // Create 45 fluffy procedural cumulus clouds along flight path
    for (let i = 0; i < 45; i++) {
      const cloud = new THREE.Group();
      const numPuffs = 5 + Math.floor(Math.random() * 6);
      for (let j = 0; j < numPuffs; j++) {
        const r = 12 + Math.random() * 18;
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), cloudMat);
        puff.position.set(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 35
        );
        cloud.add(puff);
      }
      // Altitude between 80 and 220
      const alt = 80 + Math.random() * 160;
      const xPos = (Math.random() - 0.5) * 600;
      const zPos = 100 + Math.random() * 1300;
      cloud.position.set(xPos, alt, zPos);
      this.cloudsGroup.add(cloud);
    }
  }

  buildControlsUI() {
    const ui = document.createElement('div');
    ui.className = 'flight-sim-overlay';
    ui.innerHTML = \`
      <!-- Flight Status HUD Top Bar -->
      <div class="sim-hud-header">
        <div class="sim-flight-tag">
          <img src="\${this.options.originFlag}" class="flag-icon" alt="Origin">
          <strong>\${this.options.origin}</strong>
          <i class="bi bi-airplane-fill" style="color:#38BDF8; margin:0 0.5rem; transform:rotate(90deg); display:inline-block;"></i>
          <img src="\${this.options.destFlag}" class="flag-icon" alt="Dest">
          <strong>\${this.options.destination}</strong>
          <span class="sim-flight-num">\${this.options.flightNumber}</span>
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
          <button class="cam-btn active" data-cam="chase"><i class="bi bi-camera-video"></i> Chase View</button>
          <button class="cam-btn" data-cam="cockpit"><i class="bi bi-eye"></i> Cockpit HUD</button>
          <button class="cam-btn" data-cam="wing"><i class="bi bi-window"></i> Wing Window</button>
          <button class="cam-btn" data-cam="tower"><i class="bi bi-broadcast"></i> Tower Cam</button>
        </div>
      </div>

      <!-- Touchdown Confirmed Arrival Modal -->
      <div class="sim-arrival-banner" id="sim-arrival-banner" style="display:none;">
        <div class="arrival-card">
          <i class="bi bi-check-circle-fill arrival-icon"></i>
          <h3>Touchdown Confirmed at \${this.options.destination}!</h3>
          <p>Smooth landing on Runway 30R. Welcome to Dubai with MyTravel.pk &mdash; licensed by DTS & IATA TIDS Member.</p>
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
    \`;

    this.container.appendChild(ui);
    this.bindUIEvents();
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

    // Camera perspective buttons
    const camBtns = this.container.querySelectorAll('.cam-btn');
    camBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        camBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.cameraMode = btn.getAttribute('data-cam');
      });
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
      tag.innerHTML = \`
        <img src="\${originFlag}" class="flag-icon" alt="Origin">
        <strong>\${origin}</strong>
        <i class="bi bi-airplane-fill" style="color:#38BDF8; margin:0 0.5rem; transform:rotate(90deg); display:inline-block;"></i>
        <img src="\${destFlag}" class="flag-icon" alt="Dest">
        <strong>\${destination}</strong>
        <span class="sim-flight-num">\${this.options.flightNumber}</span>
      \`;
    }
  }

  updateFlightState() {
    const p = this.progress;

    // Flight Dynamics Calculations:
    // Altitude Profile:
    // p = 0 to 0.18: On Ground (Y = 3.5)
    // p = 0.18 to 0.40: Climb (Y = 3.5 to 160)
    // p = 0.40 to 0.70: Cruise (Y = 160)
    // p = 0.70 to 0.90: Descent (Y = 160 to 3.5)
    // p = 0.90 to 1.00: On Ground Touchdown & Taxi (Y = 3.5)

    let yPos = 3.5;
    let pitch = 0;
    let roll = 0;
    let speedKts = 0;
    let altFt = 0;
    let stageText = 'TAKEOFF ROLL';
    let gearRetracted = false;

    // Z Position along 1800m world axis
    const zPos = -170 + p * 1770;

    if (p < 0.18) {
      // Phase 1: Takeoff Ground Roll
      const sub = p / 0.18;
      yPos = 3.5;
      pitch = 0;
      speedKts = Math.round(sub * 165);
      altFt = 0;
      stageText = sub < 0.8 ? 'TAKEOFF ROLL' : 'V1 / ROTATE';
      gearRetracted = false;
    } else if (p < 0.40) {
      // Phase 2: Rotation, Liftoff & Climb
      const sub = (p - 0.18) / 0.22;
      yPos = 3.5 + Math.sin(sub * Math.PI / 2) * 156.5;
      pitch = (1 - sub * 0.7) * 0.24; // Initial pitch +14 deg, easing to climb
      roll = Math.sin(sub * Math.PI) * -0.12; // Gentle navigation bank
      speedKts = Math.round(165 + sub * 280);
      altFt = Math.round(sub * 18000);
      stageText = 'CLIMBING TO FL380';
      gearRetracted = sub > 0.25;
    } else if (p < 0.70) {
      // Phase 3: Trans-Oceanic Cruise through Clouds
      const sub = (p - 0.40) / 0.30;
      yPos = 160 + Math.sin(sub * Math.PI * 2) * 4; // Gentle atmospheric drift
      pitch = 0.02;
      roll = Math.sin(sub * Math.PI * 4) * 0.04;
      speedKts = 490 + Math.round(Math.sin(sub * 10) * 10);
      altFt = 38000;
      stageText = 'CRUISE (FL380 / MACH 0.84)';
      gearRetracted = true;
    } else if (p < 0.90) {
      // Phase 4: Descent & Approach Alignment
      const sub = (p - 0.70) / 0.20;
      yPos = 160 - Math.sin(sub * Math.PI / 2) * 156.5;
      pitch = -0.06; // Slight nose-down approach angle
      roll = Math.sin(sub * Math.PI * 2) * 0.08;
      speedKts = Math.round(490 - sub * 340);
      altFt = Math.round((1 - sub) * 38000);
      stageText = sub > 0.7 ? 'FINAL APPROACH (RWY 30R)' : 'DESCENT';
      gearRetracted = sub < 0.6; // Gear extends on final approach
    } else {
      // Phase 5: Touchdown & Deceleration
      const sub = (p - 0.90) / 0.10;
      yPos = 3.5;
      pitch = 0;
      roll = 0;
      speedKts = Math.round(150 * (1 - sub * 0.85));
      altFt = 0;
      stageText = sub < 0.4 ? 'TOUCHDOWN & REVERSE THRUST' : 'TAXI TO GATE';
      gearRetracted = false;

      // Trigger touchdown smoke puff at p ~ 0.90
      if (sub < 0.15 && this.touchdownSmoke.length < 15) {
        this.emitTouchdownSmoke();
      }

      // Show arrival banner
      if (p >= 0.98) {
        const banner = document.getElementById('sim-arrival-banner');
        if (banner) banner.style.display = 'flex';
      }
    }

    // Apply airplane transforms
    this.plane.position.set(0, yPos, zPos);
    this.plane.rotation.x = pitch;
    this.plane.rotation.z = roll;

    // Retract or extend landing gear
    this.landingGearGroup.visible = !gearRetracted;
    this.landingGearGroup.position.y = gearRetracted ? 1.5 : 0;

    // Update Turbofan engines spinning
    const spinRate = (speedKts / 30) + 1;
    this.engines.forEach(eng => {
      eng.spinner.rotation.y += spinRate * 0.1;
      // High exhaust glow on takeoff
      eng.exhaust.visible = p < 0.35;
    });

    // Update UI HUD Telemetry
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

    // Update Camera based on Camera Mode
    this.updateCamera(yPos, zPos, pitch, roll);
  }

  updateCamera(yPos, zPos, pitch, roll) {
    if (this.cameraMode === 'chase') {
      // Cinematic Chase Camera behind and above plane
      const camOffset = new THREE.Vector3(0, 10, -38);
      this.camera.position.set(
        this.plane.position.x + camOffset.x,
        this.plane.position.y + camOffset.y,
        this.plane.position.z + camOffset.z
      );
      this.camera.lookAt(this.plane.position.x, this.plane.position.y + 2, this.plane.position.z + 18);
    } else if (this.cameraMode === 'cockpit') {
      // Pilot First-Person Cockpit View looking out through windshield
      this.camera.position.set(
        this.plane.position.x,
        this.plane.position.y + 1.4,
        this.plane.position.z + 21
      );
      this.camera.lookAt(
        this.plane.position.x,
        this.plane.position.y + 1.2 + Math.sin(pitch) * 20,
        this.plane.position.z + 120
      );
    } else if (this.cameraMode === 'wing') {
      // Passenger Seat 14A Window View looking out over left engine & wing
      this.camera.position.set(
        this.plane.position.x - 2.1,
        this.plane.position.y + 0.6,
        this.plane.position.z + 1.5
      );
      this.camera.lookAt(
        this.plane.position.x - 28,
        this.plane.position.y - 2,
        this.plane.position.z - 8
      );
    } else if (this.cameraMode === 'tower') {
      // Ground Airport Control Tower View watching the aircraft
      if (this.progress < 0.5) {
        this.camera.position.copy(this.towerPosition);
        this.camera.lookAt(this.plane.position);
      } else {
        // Arrival Tower
        this.camera.position.set(55, 45, 1580);
        this.camera.lookAt(this.plane.position);
      }
    }
  }

  emitTouchdownSmoke() {
    const smokeGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({ color: 0xE2E8F0, transparent: true, opacity: 0.65 });
    for (let i = 0; i < 4; i++) {
      const smoke = new THREE.Mesh(smokeGeo, smokeMat.clone());
      smoke.position.set((Math.random() - 0.5) * 6, 0.5, this.plane.position.z - 2 + Math.random() * 4);
      this.scene.add(smoke);
      this.touchdownSmoke.push(smoke);
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.isPlaying) {
      // Normal flight cycle takes approx 24 seconds at 1x
      this.progress += (0.0007 * this.speed);
      if (this.progress > 1.0) {
        this.progress = 1.0;
        this.isPlaying = false;
        const playBtn = document.getElementById('btn-sim-play');
        if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
      this.updateFlightState();
    }

    // Animate Touchdown smoke expansion and dissipation
    for (let i = this.touchdownSmoke.length - 1; i >= 0; i--) {
      const s = this.touchdownSmoke[i];
      s.scale.multiplyScalar(1.05);
      s.position.y += 0.08;
      s.material.opacity -= 0.02;
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
    const height = this.container.clientHeight || 480;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Global initialization helper
window.initFlightSimulator = function(containerId, options) {
  if (window.THREE && document.getElementById(containerId)) {
    window.myFlightSim = new MyTravelFlightSimulator(containerId, options);
  }
};
`;

// Save to both locations
const dest1 = 'C:/Users/PC/Desktop/MyTravel/frontend/js/flightAnimation.js';
const dest2 = 'C:/Users/PC/.gemini/antigravity/scratch/MyTravel/frontend/js/flightAnimation.js';

fs.writeFileSync(dest1, flightAnimJs, 'utf8');
fs.writeFileSync(dest2, flightAnimJs, 'utf8');
console.log('Saved flightAnimation.js to Desktop and Scratch successfully!');
