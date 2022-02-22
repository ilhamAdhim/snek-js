/*
Anggota Kelompok 3

Muhammad Ilham Rasyid
Muhammad Ilham Adhim
Reynaldi
Nisa
*/

const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
const MOVE_INTERVAL = 50;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
  };
}

let snake1 = initSnake("purple");
let snake2 = initSnake("blue");
let snake3 = initSnake("cyan");

let apple = {
  color: "red",
  position: initPosition(),
  type: "apple-image",
};

let apple2 = {
  color: "red",
  position: initPosition(),
  type: "apple-image",
};

function drawCell(ctx, x, y, color, type) {
  if (type === "apple-image") {
    base_image = new Image();
    base_image.src = "apple.png";
    ctx.drawImage(base_image, x * CELL_SIZE, y * CELL_SIZE, 20, 20);
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function drawScore(snake) {
  let scoreCanvas;

  switch (snake.color) {
    case snake1.color:
      scoreCanvas = document.getElementById("score1Board");
      break;
    case snake2.color:
      scoreCanvas = document.getElementById("score2Board");
      break;
    case snake3.color:
      scoreCanvas = document.getElementById("score3Board");
      break;
    default:
      break;
  }

  let scoreCtx = scoreCanvas.getContext("2d");
  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // snake 1
    drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color, "snake");
    for (let i = 1; i < snake1.body.length; i++) {
      drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color, "snake");
    }

    // snake 2
    drawCell(ctx, snake2.head.x, snake2.head.y, snake2.color, "snake");
    for (let i = 1; i < snake2.body.length; i++) {
      drawCell(ctx, snake2.body[i].x, snake2.body[i].y, snake2.color, "snake");
    }

    // snake 3
    drawCell(ctx, snake3.head.x, snake3.head.y, snake3.color, "snake");
    for (let i = 1; i < snake3.body.length; i++) {
      drawCell(ctx, snake3.body[i].x, snake3.body[i].y, snake3.color, "snake");
    }

    // apple
    drawCell(ctx, apple.position.x, apple.position.y, apple.color, apple.type);
    drawCell(
      ctx,
      apple2.position.x,
      apple2.position.y,
      apple2.color,
      apple2.type
    );

    drawScore(snake1);
    drawScore(snake2);
    drawScore(snake3);
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
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
}

function eat(snake, apple, apple2) {
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
  if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
    apple2.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple, apple2);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple, apple2);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple, apple2);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple, apple2);
}

function checkCollision(snakes) {
  let isCollide = false;
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          isCollide = true;
        }
      }
    }
  }
  return isCollide;
}

function move(snake) {
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
  moveBody(snake);
  if (!checkCollision([snake1, snake2])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    console.log("collide", snake.color);
    if (snake == snake1) {
      snake1 = initSnake("purple");
      setTimeout(function () {
        move(snake1);
      }, MOVE_INTERVAL);
    } else if (snake == snake3) {
      snake3 = initSnake("cyan");
      setTimeout(function () {
        move(snake3);
      }, MOVE_INTERVAL);
    } else {
      snake2 = initSnake("blue");
      setTimeout(function () {
        move(snake2);
      }, MOVE_INTERVAL);
    }
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }

  if (event.key === "a") {
    turn(snake2, DIRECTION.LEFT);
  } else if (event.key === "d") {
    turn(snake2, DIRECTION.RIGHT);
  } else if (event.key === "w") {
    turn(snake2, DIRECTION.UP);
  } else if (event.key === "s") {
    turn(snake2, DIRECTION.DOWN);
  }

  if (event.key === "j") {
    turn(snake3, DIRECTION.LEFT);
  } else if (event.key === "l") {
    turn(snake3, DIRECTION.RIGHT);
  } else if (event.key === "i") {
    turn(snake3, DIRECTION.UP);
  } else if (event.key === "k") {
    turn(snake3, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
  move(snake2);
  move(snake3);
}

initGame();
