import './styles/main.scss';
import './scripts/utils.js';

// ===================== CANVAS =====================
const canvas = document.querySelector('#canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

// ===================== CLASSES =====================
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 500,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 100;
    this.height = 100;
  }

  draw() {
    c.fillStyle = 'black';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

// ===================== VARIABLES =====================
const player = new Player();

// ===================== ANIMATION LOOP =====================
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}
// ===================== EXECUTION =====================
animate();
