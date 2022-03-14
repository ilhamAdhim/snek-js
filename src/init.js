const initHeadAndBody = (color) => {
  let head = {
    color: color,
    ...renderPosition(),
  };

  let body = [{ x: head.x, y: head.y, color: color }];

  return {
    head: head,
    body: body,
  };
};

const initDirection = () => {
  return Math.floor(Math.random() * 4);
};

const initSnake = (snakeObj) => {
  return {
    color: snakeObj?.color,
    ...initHeadAndBody(snakeObj?.color),
    direction: initDirection(),
    score: snakeObj.score || 0,
    health: snakeObj.health || 3,
    type: "snake",
  };
};
