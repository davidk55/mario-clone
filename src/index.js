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
    this.curJumpCount = 0;
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
      this.curJumpCount = 0;
    }
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 300,
      y: 450,
    };
    this.width = 200;
    this.height = 40;
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// ===================== VARIABLES =====================
const player = new Player();
const platform = new Platform();
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};

// ===================== ANIMATION LOOP =====================
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();

  if (keys.right.pressed) player.velocity.x = 5;
  else if (keys.left.pressed) player.velocity.x = -5;
  else player.velocity.x *= 0.9;

  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
    player.curJumpCount = 0;
  }
}
// ===================== EXECUTION =====================
animate();

// ===================== LISTENERS =====================
addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'KeyA':
      keys.left.pressed = true;
      break;
    case 'KeyD':
      keys.right.pressed = true;
      break;
    case 'KeyW':
      if (!e.repeat && player.curJumpCount == 0) {
        player.velocity.y -= 15;
        player.curJumpCount++;
      } else if (!e.repeat && player.curJumpCount == 1) {
        player.velocity.y -= 12;
        player.curJumpCount++;
      }
      break;
    case 'KeyS':
      keys.down.pressed = true;
      break;
  }
});
addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'KeyA':
      keys.left.pressed = false;
      break;
    case 'KeyD':
      keys.right.pressed = false;
      break;
    case 'KeyS':
      keys.down.pressed = false;
      break;
  }
});
