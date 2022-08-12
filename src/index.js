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
  constructor(x, y, width, height) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// ===================== VARIABLES =====================
const player = new Player();
const platforms = [
  new Platform(200, 500, 100, 40),
  new Platform(500, 400, 100, 40),
];
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

let scrollOffset = 0;
// ===================== ANIMATION LOOP =====================
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((p) => p.draw());

  if (keys.right.pressed && player.position.x < 600) player.velocity.x = 5;
  else if (keys.left.pressed && player.position.x > 100) player.velocity.x = -5;
  else {
    player.velocity.x *= 0.9;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((p) => (p.position.x -= 5));
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((p) => (p.position.x += 5));
    }
  }

  platforms.forEach((p) => {
    if (
      player.position.y + player.height <= p.position.y &&
      player.position.y + player.height + player.velocity.y >= p.position.y &&
      player.position.x + player.width >= p.position.x &&
      player.position.x <= p.position.x + p.width
    ) {
      player.velocity.y = 0;
      player.curJumpCount = 0;
    }
  });

  if (scrollOffset > 2000) {
    console.log('You win!');
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
        if (player.velocity.y > 0) player.velocity.y = 0;
        player.velocity.y -= 10;
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
