/**
 * MYTRAVEL.PK - 3D EARTH GLOBE & FLIGHT TRAJECTORY ENGINE
 * Built with Three.js (WebGL with Canvas/Static Fallback)
 */

class MyTravelGlobe {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      origin: { name: 'Karachi (KHI)', lat: 24.8607, lon: 67.0011 },
      destination: { name: 'Dubai (DXB)', lat: 25.2048, lon: 55.2708 },
      autoRotate: true,
      rotationSpeed: 0.0015
    }, options);

    this.airports = [
      { code: 'KHI', name: 'Karachi Jinnah Intl', lat: 24.9065, lon: 67.1608 },
      { code: 'LHE', name: 'Lahore Allama Iqbal Intl', lat: 31.5216, lon: 74.4036 },
      { code: 'ISB', name: 'Islamabad Intl Airport', lat: 33.5651, lon: 72.8517 },
      { code: 'DXB', name: 'Dubai International', lat: 25.2532, lon: 55.3657 },
      { code: 'DOH', name: 'Doha Hamad Intl', lat: 25.2731, lon: 51.6081 },
      { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lon: -0.4543 },
      { code: 'GYD', name: 'Baku Heydar Aliyev', lat: 40.4675, lon: 50.0469 },
      { code: 'BKK', name: 'Bangkok Suvarnabhumi', lat: 13.6900, lon: 100.7501 },
      { code: 'KUL', name: 'Kuala Lumpur Intl', lat: 2.7456, lon: 101.7072 },
      { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lon: 103.9915 },
      { code: 'JFK', name: 'New York JFK', lat: 40.6413, lon: -73.7781 }
    ];

    this.isWebGLAvailable = this.checkWebGL();
    if (this.isWebGLAvailable && window.THREE) {
      this.initThree();
    } else {
      this.initFallback();
    }
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  initThree() {
    const width = this.container.clientWidth || 480;
    const height = this.container.clientHeight || 480;

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 2.7;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Globe Group
    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);

    // Earth Sphere
    const radius = 1;
    const segments = 48;
    const geometry = new THREE.SphereGeometry(radius, segments, segments);

    // Procedural Earth Shader Canvas for High-Performance Realistic Rendering
    const earthCanvas = this.createEarthTexture();
    const texture = new THREE.CanvasTexture(earthCanvas);
    
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 15,
      specular: new THREE.Color(0x168DE2),
      bumpScale: 0.05
    });

    this.earthMesh = new THREE.Mesh(geometry, material);
    this.globeGroup.add(this.earthMesh);

    // Atmosphere Glow
    const glowGeo = new THREE.SphereGeometry(radius * 1.05, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x168DE2,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.28
    });
    this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.globeGroup.add(this.glowMesh);

    // Stars Background
    this.addStarField();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);

    // Plot Markers & Routes
    this.renderAirportMarkers();
    this.renderFlightArc(this.options.origin, this.options.destination);

    // Mouse / Touch Interaction
    this.initInteraction();

    // Resize Listener
    window.addEventListener('resize', () => this.onResize());

    // Animation Loop
    this.progress = 0;
    this.animate();
  }

  createEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Ocean Gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGrad.addColorStop(0, '#061C3D');
    oceanGrad.addColorStop(0.5, '#0B2956');
    oceanGrad.addColorStop(1, '#04152D');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Continents & Landmasses Outline (Stylized High-End Cartography)
    ctx.fillStyle = '#1A3C6B';
    
    // Draw stylized land shapes
    // Eurasia / Africa
    ctx.beginPath();
    ctx.ellipse(560, 210, 190, 110, 0, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.beginPath();
    ctx.ellipse(520, 310, 90, 110, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // North America
    ctx.beginPath();
    ctx.ellipse(230, 180, 120, 80, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // South America
    ctx.beginPath();
    ctx.ellipse(310, 340, 70, 110, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Australia
    ctx.beginPath();
    ctx.ellipse(830, 350, 70, 50, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Grid lines (Latitude / Longitude)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    return canvas;
  }

  latLonToVector3(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  renderAirportMarkers() {
    this.airportGroup = new THREE.Group();
    const dotGeo = new THREE.SphereGeometry(0.015, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });

    this.airports.forEach(apt => {
      const pos = this.latLonToVector3(apt.lat, apt.lon, 1.01);
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      this.airportGroup.add(dot);
    });

    this.globeGroup.add(this.airportGroup);
  }

  renderFlightArc(origin, dest) {
    if (this.currentArc) this.globeGroup.remove(this.currentArc);
    if (this.airplaneMesh) this.globeGroup.remove(this.airplaneMesh);

    const vOrigin = this.latLonToVector3(origin.lat, origin.lon, 1.01);
    const vDest = this.latLonToVector3(dest.lat, dest.lon, 1.01);

    // Calculate mid-point and elevate it for 3D curved trajectory
    const vMid = new THREE.Vector3().addVectors(vOrigin, vDest).multiplyScalar(0.5);
    const distance = vOrigin.distanceTo(vDest);
    vMid.setLength(1.0 + Math.max(0.15, distance * 0.35));

    this.curve = new THREE.QuadraticBezierCurve3(vOrigin, vMid, vDest);
    const points = this.curve.getPoints(50);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

    const arcMat = new THREE.LineBasicMaterial({
      color: 0xE5A93C,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });

    this.currentArc = new THREE.Line(arcGeo, arcMat);
    this.globeGroup.add(this.currentArc);

    // Airplane Sprite/Cone traversing along the route
    const coneGeo = new THREE.ConeGeometry(0.025, 0.07, 8);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    this.airplaneMesh = new THREE.Mesh(coneGeo, coneMat);
    this.globeGroup.add(this.airplaneMesh);

    // Highlight Origin and Dest Pins
    const pinGeo = new THREE.SphereGeometry(0.025, 16, 16);
    const originPin = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ color: 0x168DE2 }));
    originPin.position.copy(vOrigin);
    const destPin = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ color: 0xE5A93C }));
    destPin.position.copy(vDest);
    this.globeGroup.add(originPin);
    this.globeGroup.add(destPin);

    // Rotate globe toward origin
    this.targetRotationY = -(origin.lon * (Math.PI / 180));
    this.globeGroup.rotation.y = this.targetRotationY;
  }

  addStarField() {
    const starGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = -Math.random() * 8;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x94A3B8, size: 0.04 });
    const starField = new THREE.Points(starGeo, starMat);
    this.scene.add(starField);
  }

  initInteraction() {
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => isDragging = false);

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      this.globeGroup.rotation.y += deltaX * 0.005;
      this.globeGroup.rotation.x = Math.max(-0.5, Math.min(0.5, this.globeGroup.rotation.x + deltaY * 0.005));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.options.autoRotate) {
      this.globeGroup.rotation.y += this.options.rotationSpeed;
    }

    // Animate Airplane along Bezier Curve
    if (this.curve && this.airplaneMesh) {
      this.progress = (this.progress + 0.004) % 1;
      const point = this.curve.getPointAt(this.progress);
      this.airplaneMesh.position.copy(point);

      const tangent = this.curve.getTangentAt(this.progress).normalize();
      this.airplaneMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
    }

    this.renderer.render(this.scene, this.camera);
  }

  updateRoute(originCode, destCode) {
    const o = this.airports.find(a => a.code === originCode) || this.options.origin;
    const d = this.airports.find(a => a.code === destCode) || this.options.destination;
    this.renderFlightArc(o, d);
  }

  initFallback() {
    this.container.innerHTML = `
      <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background: radial-gradient(circle, #0F2D59 0%, #061833 100%); border-radius:18px; color:#E2E8F0; text-align:center; padding:1.5rem;">
        <i class="bi bi-globe-americas" style="font-size: 5rem; color: #168DE2; margin-bottom: 1rem;"></i>
        <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:0.25rem;">Interactive Flight Network</h4>
        <p style="font-size:0.875rem; color:#94A3B8;">Direct routes connecting Karachi, Lahore & Islamabad with Dubai, London, Baku and worldwide.</p>
      </div>
    `;
  }
}

window.MyTravelGlobe = MyTravelGlobe;
