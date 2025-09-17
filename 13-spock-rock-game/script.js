import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

// DOM Elements
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

// Choices as DOM Elements
const elements = {
  player: {
    rock: document.getElementById("playerRock"),
    paper: document.getElementById("playerPaper"),
    scissors: document.getElementById("playerScissors"),
    lizard: document.getElementById("playerLizard"),
    spock: document.getElementById("playerSpock"),
  },
  computer: {
    rock: document.getElementById("computerRock"),
    paper: document.getElementById("computerPaper"),
    scissors: document.getElementById("computerScissors"),
    lizard: document.getElementById("computerLizard"),
    spock: document.getElementById("computerSpock"),
  },
};

// Game rules
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// Local variables
let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// Reset selected icons
function resetTurn() {
  allGameIcons.forEach((icon) => icon.classList.remove("selected"));
  stopConfetti();
  removeConfetti();
}

// Reset score & choices
function resetGame() {
  playerScoreNumber = computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetTurn();
}
window.resetGame = resetGame;

// Random computer choice
function generateComputerChoice() {
  const keys = Object.keys(choices);
  computerChoice = keys[Math.floor(Math.random() * keys.length)];
}

// Show computer or player choice
function showChoice(playerType, choice) {
  const el = elements[playerType][choice];
  if (!el) return;
  el.classList.add("selected");
  const target = playerType === "player" ? playerChoiceEl : computerChoiceEl;
  target.textContent = ` --- ${choices[choice].name}`;
}

// Update results
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
    return;
  }
  const won = choices[playerChoice].defeats.includes(computerChoice);
  if (won) {
    resultText.textContent = "You WON!!";
    playerScoreEl.textContent = ++playerScoreNumber;
    startConfetti();
  } else {
    resultText.textContent = "You Lost..";
    computerScoreEl.textContent = ++computerScoreNumber;
  }
}

// Process turn
function processTurn(playerChoice) {
  resetTurn();
  generateComputerChoice();
  showChoice('computer', computerChoice);
  showChoice('player', playerChoice)
  updateScore(playerChoice);
}

// Show player choice
function select(playerChoice) {
  processTurn(playerChoice);
}
window.select = select;