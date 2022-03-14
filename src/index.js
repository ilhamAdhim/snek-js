const eat = (snake, item) => {
  if (snake.head.x == item.position.x && snake.head.y == item.position.y) {
    let eatAudio = new Audio("../assets/sounds/Eat Apple.mp3");
    eatAudio.play();

    switch (item.type) {
      case "apple-image":
        item.position = renderPosition();
        snake.score++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
        break;
      case "health":
        item.position = renderPosition();
        snake.score++;
        snake.health++;
        break;
    }
    if (isMoveNextLevel()) proceedNextLevel();
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

const initGame = () => {
  move(snake1);
};

initGame();
draw();
