// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');


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

});

/* =================================
   WATER COLLECTION
================================= */

const waterSource = document.getElementById("water-source");
const gameFeedback = document.getElementById("game-feedback");

// Is the player carrying water?
let carryingWater = false;

// Check whether two elements overlap
function isTouching(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
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

