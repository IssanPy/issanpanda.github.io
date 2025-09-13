// Premium Dark 3D Particle Background
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.prepend(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.background = "radial-gradient(circle at center, #050505, #000)";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width - canvas.width / 2;
    this.y = Math.random() * canvas.height - canvas.height / 2;
    this.z = Math.random() * canvas.width;
    this.size = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.z -= 2;
    if (this.z <= 0) {
      this.z = canvas.width;
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
    }
  }
  draw() {
    let scale = 300 / this.z;
    let x2d = this.x * scale + canvas.width / 2;
    let y2d = this.y * scale + canvas.height / 2;
    ctx.beginPath();
    ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 400; i++) {
    particlesArray.push(new Particle());
  }
}
init();

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
