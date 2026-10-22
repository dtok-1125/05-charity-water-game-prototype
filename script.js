// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');
// ==============================
// GAME TIMER
// ==============================

const timerDisplay = document.getElementById("timer");

const restartButton = document.getElementById("restart-button");


let timeRemaining = 60;
let timerInterval = null;
function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;

      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;

      timerDisplay.textContent =
        `${minutes}:${String(seconds).padStart(2, "0")}`;


    }

    if (timeRemaining === 0) {
  clearInterval(timerInterval);
  timerInterval = null;
  
  restartButton.hidden = false;


  if (deliveries > 0) {
    alert(`Time's up! You delivered ${deliveries} water supplies to the community!`);
  } else {
    alert("Time's up! Every journey begins with a single step. Try again!");
  }

    }
  }, 1000);
}


/* =================================
   EVERY DROP COUNTS - GAME LOGIC
================================= */

// Find our HTML elements
const startButton = document.getElementById("start-button");
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");

// Listen for the player to click START JOURNEY
startButton.addEventListener("click", function () {

  // Hide the welcome screen
  welcomeScreen.hidden = true;

  // Show the gameplay screen
  gameScreen.hidden = false;
  startTimer();

  console.log("Journey started!");

});

/* =================================
   PLAYER MOVEMENT
================================= */

const player = document.getElementById("player");
const gameBoard = document.getElementById("game-board");

// Player starting position
let playerX = 85;
let playerY = 85;

// Movement speed (percentage per key press)
const playerSpeed = 2;

// Listen for arrow keys
document.addEventListener("keydown", function (event) {

  // Only move while the game screen is visible
  if (gameScreen.hidden) return;

  // Move in the direction of the arrow key
  if (event.key === "ArrowUp") {
    playerY -= playerSpeed;
  } else if (event.key === "ArrowDown") {
    playerY += playerSpeed;
  } else if (event.key === "ArrowLeft") {
    playerX -= playerSpeed;
  } else if (event.key === "ArrowRight") {
    playerX += playerSpeed;
  } else {
    return;
  }

  // Stop arrow keys from scrolling the page
  event.preventDefault();

  // Keep player inside the game board
  playerX = Math.max(3, Math.min(97, playerX));
  playerY = Math.max(5, Math.min(95, playerY));

  // Update player's position
  player.style.left = playerX + "%";
  player.style.top = playerY + "%";

checkWaterCollection();
checkWaterDelivery();
checkObstacleCollision();

});

/* =================================
   WATER COLLECTION
================================= */

const waterSource = document.getElementById("water-source");
const gameFeedback = document.getElementById("game-feedback");
const community = document.getElementById("community");
const deliveriesDisplay = document.getElementById("deliveries");

let deliveries = 0;

// ==============================
// OBSTACLE COLLISION
// ==============================

// Find all five obstacles
const obstacles = document.querySelectorAll(".obstacle");

// Prevent repeated penalties from one collision
let obstacleCooldown = false;

// Is the player carrying water?
let carryingWater = false;

// Check whether two elements overlap
function isTouching(element1, element2) {
  const circle = element1.getBoundingClientRect();
  const rectangle = element2.getBoundingClientRect();

  // Find the center of the player
  const centerX = circle.left + circle.width / 2;
  const centerY = circle.top + circle.height / 2;
  const radius = Math.min(circle.width, circle.height) / 2;

  // Find the closest point on the obstacle
  const closestX = Math.max(
    rectangle.left,
    Math.min(centerX, rectangle.right)
  );
  const closestY = Math.max(
    rectangle.top,
    Math.min(centerY, rectangle.bottom)
  );

  // Calculate the distance
  const distanceX = centerX - closestX;
  const distanceY = centerY - closestY;

  return (
    distanceX * distanceX + distanceY * distanceY <=
    radius * radius
  );
}

function isTouchingObstacle(player, obstacle) {
  console.log("Checking obstacle collision!");

  const rect1 = player.getBoundingClientRect();
  const rect2 = obstacle.getBoundingClientRect();

  const padding = 2;

  return (
    rect1.left + padding < rect2.right - padding &&
    rect1.right - padding > rect2.left + padding &&
    rect1.top + padding < rect2.bottom - padding &&
    rect1.bottom - padding > rect2.top + padding
  );
}

// Collect water when the player reaches the source
function checkWaterCollection() {

  // Don't collect more water if already carrying some
  if (carryingWater) return;

  if (isTouching(player, waterSource)) {
    carryingWater = true;

    // Visual feedback
    player.textContent = "💧";
    player.style.backgroundColor = "#2E9DF7";

    // Written feedback
    gameFeedback.textContent =
      "💧 Water collected! Deliver it to the community!";

    console.log("Water collected!");
  }
}
// Deliver water when the player returns to the community
function checkWaterDelivery() {

  // Only deliver if carrying water
  if (!carryingWater) return;

  if (isTouching(player, document.getElementById("community-house"))) {
    deliveries++;
    deliveriesDisplay.textContent = deliveries;

    carryingWater = false;

    // Return player to original appearance
    player.textContent = "";
    player.style.backgroundColor = "#FFCC00";

    // Celebrate successful delivery
    gameFeedback.textContent =
      "💛 Water delivered! Your community thanks you!";

    console.log("Delivery completed!");
  }
}
function checkObstacleCollision() {
  // Ignore collisions while the cooldown is active
  if (obstacleCooldown || timeRemaining <= 0) return;

  for (const obstacle of obstacles) {
    if (isTouchingObstacle(player, obstacle)) {

      // Deduct 5 seconds without going below zero
      timeRemaining = Math.max(0, timeRemaining - 5);

      // Update the timer immediately
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;

      timerDisplay.textContent =
        `${minutes}:${String(seconds).padStart(2, "0")}`;







      // Warn the player
      gameFeedback.textContent =
        "🚧 Ouch! Obstacle hit! You lost 5 seconds!";

      // Activate cooldown
      obstacleCooldown = true;

      setTimeout(function () {
        obstacleCooldown = false;
      }, 1000);

      break;
    }
  }
}

/* ==============================
   RESTART GAME
================================= */

restartButton.addEventListener("click", function () {
  window.location.reload();
});
