import './styles/main.scss';
import './scripts/utils.js';

// ===================== CANVAS =====================
const canvas = document.querySelector('#canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

// ===================== CLASSES =====================
let gravity = 0.5;
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

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    const approxPosition = this.position.y + this.height + this.velocity.y;
    if (approxPosition < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
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
