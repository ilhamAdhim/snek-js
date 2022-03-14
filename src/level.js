// ? Flow of generating obstacle
/*
  1. Check current accumulated score of the snake by calling isMoveNextLevel()
  2. If it's true, then proceed to the next level by calling proceedNextLevel()
  3. As new level is achieved, the program will call addObstacle() which will call initObstaclePack()
     Here, we have switch case condition and monitor what is the current level and will render obstacle based on it.
    It will call createObstacleBlock(), which will define the position of the obstacle
  4. After the position of obstacles has defined, then it will be rendered in drawObstacle(). 
     The function is in render.js
*/

let CURRENT_LEVEL = 1;

const isMoveNextLevel = () => {
  // move every multiple of 5
  if (snake1.score % 5 === 0 && snake1.score > 1) return true;
  else false;
};

const checkGameOver = () => {
  // game over if health is exactly zero
  if (snake1.health == 0) resetGame();
};

const proceedNextLevel = () => {
  let levelUpAudio = new Audio("../assets/sounds/Level Up.mp3");
  levelUpAudio.play();

  MOVE_INTERVAL -= 5;
  CURRENT_LEVEL++;
  // render Obstacles
  addObstacle();
  console.log("Anda berada di level ", CURRENT_LEVEL);

  setTimeout(() => alert(`Anda berada di level ${CURRENT_LEVEL}`), 500);
};

const addObstacle = () => OBSTACLES.push(initObstaclePack());

const resetScore = () => 0;
const resetLevel = () => {
  CURRENT_LEVEL = 1;
  OBSTACLES = [];
};
const resetSpeed = () => (MOVE_INTERVAL = 50);

const resetGame = () => {
  snake1 = initSnake({ color: "purple" });

  resetScore();
  resetLevel();
  resetSpeed();

  let gameOverAudio = new Audio("../assets/sounds/GameOver Sound.mp3");
  gameOverAudio.play();

  let retry = confirm("GAME OVER, RETRY ?");
  if (retry) {
    setTimeout(() => window.location.reload(false), 1000);
  } else {
    alert("Thank you for playing !");
    setTimeout(() => window.location.reload(false), 1000);
  }
  setTimeout(() => {
    move(snake1);
  }, MOVE_INTERVAL);
};

const gameFinished = () => {
  let confirmAction = confirm(
    "CONGRATULATIONS ! YOU'VE FINISHED ALL THE LEVELS. DO YOU TWANT TO PLAY AGAIN ?"
  );
  if (confirmAction) resetGame();
  else alert("Thank you for playing !");
};

const initObstaclePack = () => {
  let obstacleList = [];

  switch (CURRENT_LEVEL) {
    case 2:
      createObstacleBlock(obstacleList, 5, 10, "horizontal");
      break;
    case 3:
      createObstacleBlock(obstacleList, 10, 15, "horizontal");
      break;
    case 4:
      OBSTACLES.pop();
      OBSTACLES.pop();

      createObstacleBlock(obstacleList, 5, 10, "vertical");
      createObstacleBlock(obstacleList, 15, 10, "vertical");
      createObstacleBlock(obstacleList, 25, 10, "vertical");
      break;
    case 5:
      createObstacleBlock(obstacleList, 5, 10, "horizontal");
      break;
    case 6:
      createObstacleBlock(obstacleList, 15, 10, "horizontal");
      break;
    default:
      OBSTACLES = [];
      gameFinished();
      break;
  }

  return {
    obstacleList: obstacleList,
    type: "obstacle",
    color: "black",
  };
};

const createObstacleBlock = (
  obstacleList,
  startPointX,
  startPointY,
  direction
) => {
  for (let i = 0; i < 10; i++) {
    obstacleList.push({
      x: direction === "horizontal" ? startPointX + i : startPointX,
      y: direction === "vertical" ? startPointY + i : startPointY,
    });
  }

  return obstacleList;
};
