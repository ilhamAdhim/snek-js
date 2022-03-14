const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
let OBSTACLES = [];

const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};

// Blink for health food
const BLINK_FREQ = 500;

const renderPosition = () => {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
};

// Speed at level 1
let MOVE_INTERVAL = 50;

let snake1 = initSnake({ color: "rgb(91, 123, 249)" });

let apple = {
  color: "red",
  position: renderPosition(),
  type: "apple-image",
};

let apple2 = {
  color: "red",
  position: renderPosition(),
  type: "apple-image",
};

let health = {
  position: renderPosition(),
  type: "health",
};

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
};
