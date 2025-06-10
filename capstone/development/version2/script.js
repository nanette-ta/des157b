(function() {
'use strict';

let gameState = {
  sealX: 3,
  sealY: 3,
  timeLeft: 20,
  bottlesCollected: 0,
  milkBottles: [],
  gameRunning: true,
  gameTimer: null,
  isMoving: false,
};

const boardSize = 6;
const totalBottles = 5;

const sealImages = [
  './images/seal0.png',
  './images/seal1.png', 
  './images/seal2.png',
  './images/seal3.png',
  './images/seal4.png',
  './images/seal5.png'
];

const bottleImage = './images/bottle.png'

function startGame() {
  createBoard();
  placeSeal();
  generateMilkBottles();
  startTimer();
  setupControls();
}

function createBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const tile = document.createElement("div");
      tile.className = "ice-tile";
      tile.id = `tile-${row}-${col}`;
      tile.dataset.row = row;
      tile.dataset.col = col;
      board.appendChild(tile);
    }
  }
}

function placeSeal() {
  const sealElement = document.createElement("div");
  sealElement.className = "seal";
  sealElement.id = "seal";

  const sealImg = document.createElement("img");
  sealImg.src = sealImages[gameState.bottlesCollected];
  sealImg.alt = "Seal";
  sealImg.className = "seal-img";

  sealElement.appendChild(sealImg);

  const targetTile = document.getElementById(
    `tile-${gameState.sealY}-${gameState.sealX}`
  );
  targetTile.appendChild(sealElement);
}

function updateSealImage() {
  const sealImg = document.querySelector(".seal-img");
  if (sealImg) {
    sealImg.src = sealImages[gameState.bottlesCollected];
  }
}

function generateMilkBottles() {
  gameState.milkBottles = [];
  const occupiedPositions = new Set([`${gameState.sealX},${gameState.sealY}`]);

  while (gameState.milkBottles.length < totalBottles) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    const posKey = `${x},${y}`;

    if (!occupiedPositions.has(posKey)) {
      gameState.milkBottles.push({ x, y });
      occupiedPositions.add(posKey);

      const bottleElement = document.createElement("div");
      bottleElement.className = "milk-bottle";

      const bottleImg = document.createElement("img");
      bottleImg.src = bottleImage;
      bottleImg.alt = "Milk Bottle";
      bottleImg.className = "bottle-img";

      bottleElement.appendChild(bottleImg);

      const targetTile = document.getElementById(`tile-${y}-${x}`);
      targetTile.appendChild(bottleElement);
    }
  }
}

function moveSeal(dx, dy) {
  if (!gameState.gameRunning || gameState.isMoving) return;

  const newX = gameState.sealX + dx;
  const newY = gameState.sealY + dy;

  if (newX < 0 || newX >= boardSize || newY < 0 || newY >= boardSize) {
    return;
  }

  gameState.isMoving = true;
  gameState.sealX = newX;
  gameState.sealY = newY;

  const seal = document.getElementById("seal");
  const newTile = document.getElementById(`tile-${newY}-${newX}`);

  seal.classList.add("hopping");

  setTimeout(() => {
    newTile.appendChild(seal);
    checkBottleCollection();

    setTimeout(() => {
      seal.classList.remove("hopping");
      gameState.isMoving = false;
    }, 100);
  }, 200);
}

function checkBottleCollection() {
  const bottleIndex = gameState.milkBottles.findIndex(
    (bottle) => bottle.x === gameState.sealX && bottle.y === gameState.sealY
  );

  if (bottleIndex !== -1) {
    gameState.milkBottles.splice(bottleIndex, 1);
    gameState.bottlesCollected++;

    const currentTile = document.getElementById(
      `tile-${gameState.sealY}-${gameState.sealX}`
    );
    const bottle = currentTile.querySelector(".milk-bottle");
    if (bottle) bottle.remove();

    // Harper getting fatter here
    updateSealImage();

    document.getElementById("bottlesCollected").textContent =
      gameState.bottlesCollected;

    if (gameState.bottlesCollected >= totalBottles) {
      endGame(true);
    }
  }
}

function startTimer() {
  gameState.gameTimer = setInterval(() => {
    gameState.timeLeft--;
    document.getElementById("timeLeft").textContent = gameState.timeLeft;

    updateIceCracking();

    if (gameState.timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

function updateIceCracking() {
  const totalTime = 20;
  const timeProgress = (totalTime - gameState.timeLeft) / totalTime;

  const tiles = document.querySelectorAll(".ice-tile");
  tiles.forEach((tile) => {
    tile.className = "ice-tile";
  });
}

function endGame(won) {
  gameState.gameRunning = false;
  clearInterval(gameState.gameTimer);

  const seal = document.getElementById("seal");
  if (!won) {
    seal.classList.add("swimming");
    document.getElementById("gameOver").style.display = "block";
  } else {
    document.getElementById("gameWon").style.display = "block";
  }
}

function setupControls() {
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        moveSeal(0, -1);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveSeal(0, 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveSeal(-1, 0);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveSeal(1, 0);
        break;
    }
  });
}

function restartGame() {
  gameState = {
    sealX: 3,
    sealY: 3,
    timeLeft: 20, 
    bottlesCollected: 0,
    milkBottles: [],
    gameRunning: true,
    gameTimer: null,
    isMoving: false,
  };

  document.getElementById("gameOver").style.display = "none";
  document.getElementById("gameWon").style.display = "none";
  document.getElementById("timeLeft").textContent = "20";
  document.getElementById("bottlesCollected").textContent = "0";

  startGame();
}

// Start game
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("instructionsModal");
  const startButton = document.getElementById("startButton");
  
  document.querySelectorAll(".restartButton").forEach((btn) => {
    btn.addEventListener("click", () => {
      restartGame();
    });
  });

  startButton.addEventListener("click", () => {
    modal.style.display = "none";
    startGame();
  });
});


})()