import './styles/main.scss';
import './scripts/utils.js';
import terrainTilemap from './assets/terrain-tilemap.png';

// ===================== CANVAS =====================
const canvas = document.querySelector('#canvas');
canvas.width = 1024;
canvas.height = 576;
const c = canvas.getContext('2d');

// ===================== CLASSES =====================
let gravity = 0.5;
class Player {
  constructor() {
    this.position = {
      x: 150,
      y: 300,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 50;
    this.height = 70;
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
  constructor(x, y, width, height, image, tile) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
    this.image = image;
    this.tile = tile;
  }

  draw() {
    c.drawImage(
      this.image,
      this.tile.position.x,
      this.tile.position.y,
      this.tile.width,
      this.tile.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

// ===================== VARIABLES =====================
const player = new Player();
let platforms = [];

let groundEnd = drawGround(64, canvas.height, 40);
groundEnd = drawGround(groundEnd + 400, canvas.height, 20);
drawGround(1000, 300, 3);

drawGround(3200, 300, 3);
drawGround(3700, 200, 3);
drawGround(4200, 200, 12);

drawGround(5200, 400, 1);
drawGround(5600, 300, 1);
drawGround(6100, 300, 1);
drawGround(6600, canvas.height, 20);
drawWall(64, canvas.height, 10);

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
  platforms.forEach((p) => {
    p.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 450) player.velocity.x = 5;
  else if (keys.left.pressed && player.position.x > 115) player.velocity.x = -5;
  else {
    player.velocity.x *= 0.9;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((p) => (p.position.x -= 5));
    } else if (keys.left.pressed && scrollOffset > 0) {
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

function drawGround(drawStartX, drawY, tileCount) {
  const platformImage = new Image();
  platformImage.src = terrainTilemap;
  let curX = drawStartX;

  // ================ BEGINNING TILE ================
  const tileInformationBeg = {
    position: {
      x: 97,
      y: 1,
    },
    width: 15,
    height: 30,
  };
  platforms.push(
    new Platform(
      curX,
      drawY - tileInformationBeg.height * 2,
      tileInformationBeg.width * 2,
      tileInformationBeg.height * 2,
      platformImage,
      tileInformationBeg
    )
  );
  curX += tileInformationBeg.width * 2;

  // ================ MIDDLE TILE ================
  const tileInformationMid = {
    position: {
      x: tileInformationBeg.position.x + tileInformationBeg.width,
      y: tileInformationBeg.position.y,
    },
    width: 24,
    height: tileInformationBeg.height,
  };
  for (let i = 0; i < tileCount; i++) {
    platforms.push(
      new Platform(
        curX,
        drawY - tileInformationMid.height * 2,
        tileInformationMid.width * 2,
        tileInformationMid.height * 2,
        platformImage,
        tileInformationMid
      )
    );
    curX += tileInformationMid.width * 2;
  }

  // ================ ENDING TILE ================
  const tileInformationEnd = {
    position: {
      x: tileInformationMid.position.x + tileInformationMid.width,
      y: tileInformationBeg.position.y,
    },
    width: 7,
    height: tileInformationBeg.height,
  };
  platforms.push(
    new Platform(
      curX,
      drawY - tileInformationMid.height * 2,
      tileInformationEnd.width * 2,
      tileInformationEnd.height * 2,
      platformImage,
      tileInformationEnd
    )
  );
  curX += tileInformationBeg.width * 2;
  return curX;
}

function drawWall(drawX, drawStartY, tileCount) {
  const platformImage = new Image();
  platformImage.src = terrainTilemap;
  let curY = drawStartY;

  const tileInformation = {
    position: {
      x: 208,
      y: 16,
    },
    width: 32,
    height: 32,
  };
  for (let i = 0; i < tileCount; i++) {
    platforms.push(
      new Platform(
        drawX - tileInformation.width * 2,
        curY,
        tileInformation.width * 2,
        tileInformation.height * 2,
        platformImage,
        tileInformation
      )
    );
    curY -= tileInformation.height * 2;
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
        player.velocity.y -= 12;
        player.curJumpCount++;
      } else if (!e.repeat && player.curJumpCount == 1) {
        if (player.velocity.y > 0) player.velocity.y = 0;
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
