// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 25);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
const spotLight = new THREE.SpotLight(0x00eaff, 2, 100, Math.PI / 6, 0.5);
spotLight.position.set(0, 15, 20);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Floating particles
const particles = [];
const geometry = new THREE.SphereGeometry(0.05, 12, 12);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < 250; i++) {
  const particle = new THREE.Mesh(geometry, material);
  particle.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 40);
  scene.add(particle);
  particles.push(particle);
}

// Cursor effect
let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", e => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

  const cursor = document.querySelector(".cursor");
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  particles.forEach((p, i) => {
    p.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
  });

  camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  // Flickering spotlight
  spotLight.intensity = 1.5 + Math.sin(Date.now() * 0.005) * 0.5;

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
