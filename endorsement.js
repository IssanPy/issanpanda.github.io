(() => {
  const canvas = document.getElementById("bg");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 60;

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const light1 = new THREE.PointLight(0x00f0ff, 1, 300);
  light1.position.set(50, 50, 50);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xaa66ff, 0.8, 300);
  light2.position.set(-50, -30, 60);
  scene.add(light2);

  // Rotating Rings
  const rings = new THREE.Group();
  scene.add(rings);

  for (let i = 0; i < 3; i++) {
    const geo = new THREE.TorusGeometry(15 + i * 6, 0.3, 16, 100);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x111111,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    rings.add(ring);
  }

  // Particles
  const particles = new THREE.BufferGeometry();
  const count = 600;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i*3+0] = (Math.random() - 0.5) * 400;
    pos[i*3+1] = (Math.random() - 0.5) * 200;
    pos[i*3+2] = (Math.random() - 0.5) * 600;
  }
  particles.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
  const points = new THREE.Points(particles, particleMat);
  scene.add(points);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  document.addEventListener("mousemove", e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -2;
  });

  // Animate
  function animate() {
    requestAnimationFrame(animate);

    rings.rotation.x += 0.002;
    rings.rotation.y += 0.001;

    camera.position.x += (mouseX * 20 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
