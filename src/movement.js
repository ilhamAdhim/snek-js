let isRespawning = false;

const teleport = (snake) => {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
};

// Kalau collide dengan tubuhnya sendiri
const checkCollision = (snakes) => {
  let isCollide = false;
  for (let i = 0; i < snakes.length; i++) {
    for (let k = 1; k < snakes[i].body.length; k++) {
      if (
        snakes[i].head.x == snakes[i].body[k].x &&
        snakes[i].head.y == snakes[i].body[k].y
      ) {
        console.log("collide own body ", snake1.health);
        isCollide = true;
        break;
      }
    }
  }
  return isCollide;
};

// ? Item can be its own snake body / another obstacle which added as the level increased
const checkCollisionObstacle = (snake, item) => {
  let isCollide = false;
  // Kalau collide dengan obstacle
  for (let nObstacle = 0; nObstacle < item.length; nObstacle++) {
    for (let k = 0; k < item[nObstacle].obstacleList.length; k++) {
      if (
        snake.head.x == item[nObstacle].obstacleList[k].x &&
        snake.head.y == item[nObstacle].obstacleList[k].y
      ) {
        console.log("collide obstacle ", snake.health);
        isCollide = true;
        break;
      }
    }
  }
  return isCollide;
};

const move = (snake) => {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  // check eat for all items
  eat(snake, apple);
  eat(snake, apple2);
  eat(snake, health);

  moveBody(snake);
  isRespawning = false;

  if (checkCollision([snake]) || checkCollisionObstacle(snake, OBSTACLES)) {
    snake.health--;
    console.log("health left ", snake.health);
    checkGameOver();
    respawnSnake(snake);
  } else
    setTimeout(() => {
      move(snake);
    }, MOVE_INTERVAL);
};

const respawnSnake = (snake) => {
  isRespawning = true;
  snake1 = initSnake({
    ...snake,
    score: snake.score,
    health: snake.health,
  });
  setTimeout(() => {
    move(snake1);
  }, MOVE_INTERVAL);
};

const moveLeft = (snake) => {
  snake.head.x--;
  teleport(snake);
};

const moveRight = (snake) => {
  snake.head.x++;
  teleport(snake);
};

const moveDown = (snake) => {
  snake.head.y++;
  teleport(snake);
};

const moveUp = (snake) => {
  snake.head.y--;
  teleport(snake);
};

const moveBody = (snake) => {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y, color: snake.body[0].color });
  snake.body.pop();
};

const turn = (snake, direction) => {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
};
