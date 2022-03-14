const drawCell = (ctx, item) => {
  switch (item?.type) {
    case "apple-image":
      base_image = new Image();
      base_image.src = "../assets/images/apple.png";
      ctx.drawImage(
        base_image,
        item.position.x * CELL_SIZE,
        item.position.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      break;

    case "obstacle":
      item.obstacleList.map((partObstacle) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(
          partObstacle.x * CELL_SIZE,
          partObstacle.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      });
      break;

    default:
      ctx.fillStyle = item.color;
      ctx.fillRect(
        item.x * CELL_SIZE,
        item.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      break;
  }
};

const drawSnake = (ctx, snake) => {
  let imageName;
  switch (snake.direction) {
    case DIRECTION.LEFT:
      imageName = "head_left";
      break;
    case DIRECTION.RIGHT:
      imageName = "head_right";
      break;
    case DIRECTION.UP:
      imageName = "head_up";
      break;
    case DIRECTION.DOWN:
      imageName = "head_down";
      break;
  }
  let headImage = new Image();
  headImage.src = `../assets/images/${imageName}.png`;
  ctx.drawImage(
    headImage,
    snake.head.x * CELL_SIZE,
    snake.head.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
  for (let i = 1; i < snake.body.length; i++) {
    drawCell(ctx, snake.body[i]);
  }
};

const drawHealthCell = (ctx, health, snake) => {
  let image = new Image();
  image.src = "../assets/images/Heart.svg";

  // draw if score is prime at specified frequency
  if (isPrime(snake.score) && Math.floor(Date.now() / BLINK_FREQ) % 2) {
    ctx.drawImage(
      image,
      health.position.x * CELL_SIZE,
      health.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
};

const drawScore = (snake) => {
  let scoreCanvas;

  switch (snake.color) {
    case snake1.color:
      scoreCanvas = document.getElementById("score1Board");
      break;
  }

  let scoreCtx = scoreCanvas.getContext("2d");
  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
};

const drawHealth = (health) => {
  let healthCanvas = document.getElementById("healthBoard");
  let ctx = healthCanvas.getContext("2d");

  let healthImg = new Image();
  healthImg.src = "../assets/images/Heart.svg";
  // clear health canvas before rendering to avoid health not decreasing bug
  ctx.clearRect(0, 0, healthCanvas.width, healthCanvas.height);
  for (let i = 0; i < health; i++) {
    ctx.drawImage(healthImg, 10 + i * 25, 10, CELL_SIZE, CELL_SIZE);
  }
};

const draw = () => {
  setInterval(() => {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // snake 1
    drawSnake(ctx, snake1);

    // apple
    drawCell(ctx, apple);
    drawCell(ctx, apple2);
    // health
    drawHealthCell(ctx, health, snake1);

    drawObstacle();
    drawHealth(snake1.health);
    drawScore(snake1);
    drawLevel();
    drawSpeed();
  }, REDRAW_INTERVAL);
};

const drawObstacle = () => {
  let snakeCanvas = document.getElementById("snakeBoard");
  let ctx = snakeCanvas.getContext("2d");
  OBSTACLES.map((item) => drawCell(ctx, item));
};

const drawLevel = () => {
  let levelElement = document.getElementById("levelBoard");
  let levelCtx = levelElement.getContext("2d");

  levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  levelCtx.font = "30px Arial";
  levelCtx.fillText(CURRENT_LEVEL, 10, levelElement.scrollHeight / 2);
};

const drawSpeed = () => {
  let speedElement = document.getElementById("speedContainer");
  let speedCtx = speedElement.getContext("2d");

  speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  speedCtx.font = "30px Arial";
  speedCtx.fillText(MOVE_INTERVAL, 10, speedElement.scrollHeight);
};
