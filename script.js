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
