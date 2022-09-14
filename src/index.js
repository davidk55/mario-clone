import './styles/main.scss';
import terrainTilemap from './assets/terrain-tilemap.png';
import idleLeft from './assets/playerIdleLeft.png';
import idleRight from './assets/playerIdleRight.png';
import runLeft from './assets/playerRunLeft.png';
import runRight from './assets/playerRunRight.png';
import jumpLeft from './assets/playerJumpLeft.png';
import jumpRight from './assets/playerJumpRight.png';
import background from './assets/background.png';
import enemyRunLeft from './assets/enemyRunLeft.png';
import enemyRunRight from './assets/enemyRunRight.png';

// ===================== CANVAS =====================
const canvas = document.querySelector('#canvas');
const winningContainer = document.querySelector('.winning-text-container');
canvas.width = 1024;
canvas.height = 576;
const c = canvas.getContext('2d');

// ===================== CLASSES =====================
class GameObject {
  constructor(
    { x: posX, y: posY },
    width,
    height,
    { image, x: tileX, y: tileY, width: tileWidth, height: tileHeight }
  ) {
    this.position = {
      x: posX,
      y: posY,
    };
    this.width = width;
    this.height = height;
    this.tileInformation = {
      image: image,
      x: tileX,
      y: tileY,
      width: tileWidth,
      height: tileHeight,
    };
  }

  draw() {
    c.drawImage(
      this.tileInformation.image,
      this.tileInformation.x,
      this.tileInformation.y,
      this.tileInformation.width,
      this.tileInformation.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class MovingGameObject {
  velocity = {
    x: 0,
    y: 0,
  };
  currentFrame = 0;

  constructor({ x: posX, y: posY }, width, height) {
    this.position = {
      x: posX,
      y: posY,
    };
    this.width = width;
    this.height = height;
  }

  update() {
    // Apply velocity
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}

class Player extends MovingGameObject {
  curJumpCount = 0;
  velocity = {
    x: 0,
    y: 0,
  };
  gravity = 0.5;
  frameDelay = 5;
  delayCounter = 0;
  currentAction = 'idleRight';

  constructor(
    position,
    width,
    height,
    {
      idleLeft: {
        image: idleLeftImage,
        x: idleLeftX,
        y: idleLeftY,
        width: idleLeftWidth,
        height: idleLeftHeight,
      },
      idleRight: {
        image: idleRightImage,
        x: idleRightX,
        y: idleRightY,
        width: idleRightWidth,
        height: idleRightHeight,
      },
      runLeft: {
        image: runLeftImage,
        x: runLeftX,
        y: runLeftY,
        width: runLeftWidth,
        height: runLeftHeight,
      },
      runRight: {
        image: runRightImage,
        x: runRightX,
        y: runRightY,
        width: runRightWidth,
        height: runRightHeight,
      },
      jumpLeft: {
        image: jumpLeftImage,
        x: jumpLeftX,
        y: jumpLeftY,
        width: jumpLeftWidth,
        height: jumpLeftHeight,
      },
      jumpRight: {
        image: jumpRightImage,
        x: jumpRightX,
        y: jumpRightY,
        width: jumpRightWidth,
        height: jumpRightHeight,
      },
    }
  ) {
    super(position, width, height);
    this.animation = {
      idleLeft: {
        image: idleLeftImage,
        x: idleLeftX,
        y: idleLeftY,
        width: idleLeftWidth,
        height: idleLeftHeight,
      },
      idleRight: {
        image: idleRightImage,
        x: idleRightX,
        y: idleRightY,
        width: idleRightWidth,
        height: idleRightHeight,
      },
      runLeft: {
        image: runLeftImage,
        x: runLeftX,
        y: runLeftY,
        width: runLeftWidth,
        height: runLeftHeight,
      },
      runRight: {
        image: runRightImage,
        x: runRightX,
        y: runRightY,
        width: runRightWidth,
        height: runRightHeight,
      },
      jumpLeft: {
        image: jumpLeftImage,
        x: jumpLeftX,
        y: jumpLeftY,
        width: jumpLeftWidth,
        height: jumpLeftHeight,
      },
      jumpRight: {
        image: jumpRightImage,
        x: jumpRightX,
        y: jumpRightY,
        width: jumpRightWidth,
        height: jumpRightHeight,
      },
    };
  }
  draw() {
    if (this.currentAction == 'idleRight') {
      c.drawImage(
        this.animation.idleRight.image,
        this.animation.idleRight.width * this.currentFrame,
        this.animation.idleRight.y,
        this.animation.idleRight.width,
        this.animation.idleRight.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.currentAction == 'idleLeft') {
      c.drawImage(
        this.animation.idleLeft.image,
        this.animation.idleLeft.width * this.currentFrame,
        this.animation.idleLeft.y,
        this.animation.idleLeft.width,
        this.animation.idleLeft.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.currentAction == 'runRight') {
      c.drawImage(
        this.animation.runRight.image,
        this.animation.runRight.width * this.currentFrame,
        this.animation.runRight.y,
        this.animation.runRight.width,
        this.animation.runRight.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.currentAction == 'runLeft') {
      c.drawImage(
        this.animation.runLeft.image,
        this.animation.runLeft.width * this.currentFrame,
        this.animation.runLeft.y,
        this.animation.runLeft.width,
        this.animation.runLeft.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.currentAction == 'jumpRight') {
      c.drawImage(
        this.animation.jumpRight.image,
        this.animation.jumpRight.x,
        this.animation.jumpRight.y,
        this.animation.jumpRight.width,
        this.animation.jumpRight.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.currentAction == 'jumpLeft') {
      c.drawImage(
        this.animation.jumpLeft.image,
        this.animation.jumpLeft.x,
        this.animation.jumpLeft.y,
        this.animation.jumpLeft.width,
        this.animation.jumpLeft.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  update() {
    super.update();
    this.draw();

    // Set framerate
    if (this.delayCounter >= this.frameDelay) {
      if (this.currentFrame > 9) this.currentFrame = 0;
      else this.currentFrame++;

      this.delayCounter = 0;
    } else this.delayCounter++;

    const approxPosition = this.position.y + this.height + this.velocity.y;
    if (approxPosition < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      // Reset game when falling in death pits
      if (approxPosition > canvas.height + 50) initGame();
    }

    if (
      this.curJumpCount != 0 &&
      (this.currentAction == 'idleRight' || this.currentAction == 'runRight')
    )
      this.currentAction = 'jumpRight';
    else if (
      this.curJumpCount != 0 &&
      (this.currentAction == 'idleLeft' || this.currentAction == 'runLeft')
    )
      this.currentAction = 'jumpLeft';
    else if (
      this.curJumpCount == 0 &&
      this.currentAction == 'jumpRight' &&
      keys.right.pressed
    )
      this.currentAction = 'runRight';
    else if (
      this.curJumpCount == 0 &&
      this.currentAction == 'jumpLeft' &&
      keys.left.pressed
    )
      this.currentAction = 'runLeft';
    else if (this.curJumpCount == 0 && this.currentAction == 'jumpRight')
      this.currentAction = 'idleRight';
    else if (this.curJumpCount == 0 && this.currentAction == 'jumpLeft')
      this.currentAction = 'idleLeft';
  }
}

class Enemy extends MovingGameObject {
  frameDelay = 5;
  delayCounter = 0;
  currentAction = 'runLeft';

  constructor(
    position,
    width,
    height,
    {
      runLeft: {
        image: runLeftImage,
        x: runLeftX,
        y: runLeftY,
        width: runLeftWidth,
        height: runLeftHeight,
      },
      runRight: {
        image: runRightImage,
        x: runRightX,
        y: runRightY,
        width: runRightWidth,
        height: runRightHeight,
      },
    },
    movementPath,
    pauseOnCoordinates
  ) {
    super(position, width, height);
    this.pauseOnCoordinates = pauseOnCoordinates;
    this.movementPath = movementPath;
    this.animation = {
      runLeft: {
        image: runLeftImage,
        x: runLeftX,
        y: runLeftY,
        width: runLeftWidth,
        height: runLeftHeight,
      },
      runRight: {
        image: runRightImage,
        x: runRightX,
        y: runRightY,
        width: runRightWidth,
        height: runRightHeight,
      },
    };
    this.velocity.x = -1;
  }
  draw() {
    if (this.currentAction == 'runLeft') {
      c.drawImage(
        this.animation.runLeft.image,
        this.animation.runLeft.width * this.currentFrame,
        this.animation.runLeft.y,
        this.animation.runLeft.width,
        this.animation.runLeft.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.currentAction == 'runRight') {
      c.drawImage(
        this.animation.runRight.image,
        this.animation.runRight.width * this.currentFrame,
        this.animation.runRight.y,
        this.animation.runRight.width,
        this.animation.runRight.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  update() {
    // Set framerate
    if (this.delayCounter >= this.frameDelay) {
      if (this.currentFrame > 8) this.currentFrame = 0;
      else this.currentFrame++;

      this.delayCounter = 0;
    } else this.delayCounter++;

    this.draw();
    super.update();

    if (this.position.x < this.movementPath.x1) {
      this.velocity.x = Math.abs(this.velocity.x);
      this.currentAction = 'runRight';
    } else if (this.position.x > this.movementPath.x2) {
      this.velocity.x = -Math.abs(this.velocity.x);
      this.currentAction = 'runLeft';
    }
  }
}

// ===================== VARIABLES =====================

let collidableGameObjects = [];
let backgroundObjects = [];
let enemies = [];

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

let scrollOffset;
let player;

function initGame() {
  player = new Player({ x: 210, y: 300 }, 50, 70, {
    idleLeft: {
      image: createImage(idleLeft),
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    },
    idleRight: {
      image: createImage(idleRight),
      x: 0,
      y: -1,
      width: 32,
      height: 32,
    },
    runLeft: { image: createImage(runLeft), x: 0, y: 0, width: 32, height: 32 },
    runRight: {
      image: createImage(runRight),
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    },
    jumpLeft: {
      image: createImage(jumpLeft),
      x: 0,
      y: 0,
      width: 31,
      height: 31,
    },
    jumpRight: {
      image: createImage(jumpRight),
      x: 0,
      y: 0,
      width: 31,
      height: 31,
    },
  });

  collidableGameObjects = [];
  backgroundObjects = [];
  enemies = [];
  generateGameObjects();

  scrollOffset = 0;
}

// ===================== ANIMATION LOOP =====================
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  backgroundObjects.forEach((b) => b.draw());
  collidableGameObjects.forEach((o) => o.draw());
  enemies.forEach((e) => e.update());

  player.update();

  if (keys.right.pressed && player.position.x < 450) player.velocity.x = 5;
  else if (keys.left.pressed && player.position.x > 200) player.velocity.x = -5;
  else {
    player.velocity.x *= 0.9;

    if (keys.right.pressed) {
      scrollOffset += 5;

      collidableGameObjects.forEach((o) => (o.position.x -= 5));
      backgroundObjects.forEach((b) => (b.position.x -= 2));
      enemies.forEach((e) => {
        e.position.x -= 5;
        e.movementPath.x1 -= 5;
        e.movementPath.x2 -= 5;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= 5;

      collidableGameObjects.forEach((o) => (o.position.x += 5));
      backgroundObjects.forEach((b) => (b.position.x += 2));
      enemies.forEach((e) => {
        e.position.x += 5;
        e.movementPath.x1 += 5;
        e.movementPath.x2 += 5;
      });
    }
  }

  collidableGameObjects.forEach((p) => {
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
  enemies.forEach((e) => {
    if (
      player.position.x + player.width >= e.position.x &&
      player.position.x <= e.position.x + e.width &&
      player.position.y + player.height >= e.position.y &&
      player.position.y <= e.position.y + e.height
    ) {
      initGame();
    }
  });

  if (scrollOffset > 6400) {
    showWinScreen();
  }
}

// ===================== OTHER FUNCTIONS =====================
function showWinScreen() {
  keys.left.pressed = false;
  keys.right.pressed = false;
  player.currentAction = 'idleRight';
  winningContainer.classList.add('player-won');
  canvas.classList.add('dim-background');
}

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function generateGameObjects() {
  let platformEnd = generatePlatform({ x: 64, y: canvas.height }, 40);
  platformEnd = generatePlatform(
    { x: platformEnd + 400, y: canvas.height },
    20
  );
  generatePlatform({ x: 1000, y: 300 }, 3);

  generatePlatform({ x: 3200, y: 300 }, 3);
  generatePlatform({ x: 3700, y: 200 }, 3);
  generatePlatform({ x: 4200, y: 200 }, 12);

  generatePlatform({ x: 5200, y: 400 }, 1);
  generatePlatform({ x: 5600, y: 300 }, 1);
  generatePlatform({ x: 6100, y: 300 }, 1);
  generatePlatform({ x: 6600, y: canvas.height }, 20);

  generateWall({ x: 0, y: canvas.height - 64 }, 20);

  generateBackground({ x: 0, y: 0 }, 4);

  const animation = {
    runLeft: {
      image: createImage(enemyRunLeft),
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
    runRight: {
      image: createImage(enemyRunRight),
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
  };
  enemies.push(
    new Enemy(
      { x: 3400, y: canvas.height - 100 },
      16 * 2.5,
      16 * 2.5,
      animation,
      {
        x1: 2700,
        y1: canvas.height - 100,
        x2: 3400,
        y2: canvas.height - 100,
      },
      10
    )
  );
  enemies.push(
    new Enemy(
      { x: 1500, y: canvas.height - 100 },
      16 * 2.5,
      16 * 2.5,
      animation,
      {
        x1: 800,
        y1: canvas.height - 100,
        x2: 1500,
        y2: canvas.height - 100,
      },
      10
    )
  );
  enemies.push(
    new Enemy(
      { x: 4200, y: 100 },
      16 * 2.5,
      16 * 2.5,
      animation,
      {
        x1: 4200,
        y1: 100,
        x2: 4780,
        y2: 100,
      },
      10
    )
  );
}

function generatePlatform({ x, y }, tileCount) {
  let curX = x;

  const platformImage = new Image();
  platformImage.src = terrainTilemap;

  // ================ BEGINNING TILE ================
  const tileInformationBeg = {
    image: platformImage,
    x: 97,
    y: 1,
    width: 15,
    height: 30,
  };
  collidableGameObjects.push(
    new GameObject(
      { x: curX, y: y - tileInformationBeg.height * 2 },
      tileInformationBeg.width * 2,
      tileInformationBeg.height * 2,
      tileInformationBeg
    )
  );
  curX += tileInformationBeg.width * 2;

  // ================ MIDDLE TILE ================
  const tileInformationMid = {
    image: platformImage,
    x: tileInformationBeg.x + tileInformationBeg.width,
    y: tileInformationBeg.y,
    width: 24,
    height: tileInformationBeg.height,
  };
  for (let i = 0; i < tileCount; i++) {
    collidableGameObjects.push(
      new GameObject(
        { x: curX, y: y - tileInformationMid.height * 2 },
        tileInformationMid.width * 2,
        tileInformationMid.height * 2,
        tileInformationMid
      )
    );
    curX += tileInformationMid.width * 2;
  }

  // ================ ENDING TILE ================
  const tileInformationEnd = {
    image: platformImage,
    x: tileInformationMid.x + tileInformationMid.width,
    y: tileInformationBeg.y,
    width: 7,
    height: tileInformationBeg.height,
  };
  collidableGameObjects.push(
    new GameObject(
      { x: curX, y: y - tileInformationEnd.height * 2 },
      tileInformationEnd.width * 2,
      tileInformationEnd.height * 2,
      tileInformationEnd
    )
  );
  curX += tileInformationBeg.width * 2;
  return curX;
}

function generateWall(startingPosition, tileCount) {
  let curY = startingPosition.y;

  const tileInformation = {
    image: createImage(terrainTilemap),
    x: 208,
    y: 16,
    width: 32,
    height: 32,
  };
  for (let i = 0; i < tileCount; i++) {
    collidableGameObjects.push(
      new GameObject(
        { x: startingPosition.x, y: curY },
        64,
        64,
        tileInformation
      )
    );
    curY -= 64;
  }
  return curY;
}

function generateBackground({ x, y }, tileCount) {
  let curX = x;
  const tileInformation = {
    image: createImage(background),
    x: 0,
    y: 0,
    width: 1000,
    height: 750,
  };
  for (let i = 0; i < tileCount; i++) {
    backgroundObjects.push(
      new GameObject(
        { x: curX, y: y },
        canvas.width,
        canvas.height,
        tileInformation
      )
    );
    curX += tileInformation.width;
  }
  return curX;
}

// ===================== EXECUTION =====================
initGame();
animate();

// ===================== LISTENERS =====================
addEventListener('keydown', (e) => {
  if (winningContainer.classList.contains('player-won')) {
    if (e.code == 'KeyR') {
      winningContainer.classList.remove('player-won');
      canvas.classList.remove('dim-background');
      initGame();
    }
    return;
  }

  switch (e.code) {
    case 'KeyA':
      keys.left.pressed = true;
      player.currentAction = 'runLeft';
      break;
    case 'KeyD':
      keys.right.pressed = true;
      player.currentAction = 'runRight';
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
  if (winningContainer.classList.contains('player-won')) return;

  switch (e.code) {
    case 'KeyA':
      keys.left.pressed = false;
      player.currentAction = 'idleLeft';
      break;
    case 'KeyD':
      keys.right.pressed = false;
      player.currentAction = 'idleRight';
      break;
    case 'KeyS':
      keys.down.pressed = false;
      break;
  }
});
