// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// === GAME STATE ===
const GameState = {
  questionAmount: 0,
  equations: [],
  guesses: [],
  bestScores: [],
  timer: null,
  time: {
    played: 0,
    base: 0,
    penalty: 0,
    final: 0,
    display: '0.0',
  },
  scrollY: 0,
};

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Refresh Splash Page Best Scores
function displayBestScores() {
  bestScores.forEach((bestScoreEl, index) => {
    bestScoreEl.textContent = `${GameState.bestScores[index].bestScore}s`;
  });
}

// Check Local Storage for Best Scores
function getSavedBestScores() {
  if (localStorage.getItem('bestScores')) {
    GameState.bestScores = JSON.parse(localStorage.bestScores);
  } else {
    GameState.bestScores = [
      { questions: 10, bestScore: GameState.time.display },
      { questions: 25, bestScore: GameState.time.display },
      { questions: 50, bestScore: GameState.time.display },
      { questions: 99, bestScore: GameState.time.display },
    ];
    localStorage.setItem('bestScores', JSON.stringify(GameState.bestScores));
  }
}

// Update Best Score Array
function updateBestScore() {
  GameState.bestScores.forEach((score, index) => {
    if (GameState.questionAmount == score.questions) {
      const savedBestScore = Number(GameState.bestScores[index].bestScore);
      if (savedBestScore === 0 || savedBestScore > GameState.time.final) {
        GameState.bestScores[index].bestScore = GameState.time.display;
      }
    }
  });
  localStorage.setItem('bestScores', JSON.stringify(GameState.bestScores));
}

// Reset Variables
function resetGameState() {
  gamePage.addEventListener('click', startTimer);
  playAgainBtn.hidden = true;

  GameState.questionAmount = 0;
  GameState.equations = [];
  GameState.guesses = [];
  GameState.scrollY = 0;
  GameState.timer = null;

  GameState.time = {
    played: 0,
    base: 0,
    penalty: 0,
    final: 0,
    display: '0.0',
  };
}

// Reset Game
function playAgain() {
  resetGameState();
  gamePage.hidden = true;
  splashPage.hidden = false;
}

// Show Score Page
function showScorePage() {
  itemContainer.scrollTo({ top: 0, behavior: 'instant' });
  setTimeout(() => playAgainBtn.hidden = false, 1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
}

// Format & Display Time in DOM
function displayScore() {
  const time = GameState.time;
  baseTimeEl.textContent = `Base Time: ${time.played.toFixed(1)}s`;
  penaltyTimeEl.textContent = `Penalty: +${time.penalty.toFixed(1)}s`;
  finalTimeEl.textContent = `${time.final.toFixed(1)}s`;
  time.display = time.final.toFixed(1);
}

function calculateFinalTime() {
  const time = GameState.time;
  time.final = time.played + time.penalty;
}

// Stop Timer, Process Results, go to Score Page
function checkTimeStop() {
  const { guesses, questionAmount, equations, time } = GameState;
  if (guesses.length >= questionAmount) {
    clearInterval(GameState.timer);
    equations.forEach((eq, index) => {
      if (eq.evaluated != guesses[index]) time.penalty += 1.0;
    });
    calculateFinalTime();
    displayScore();
    updateBestScore();
    displayBestScores();
    showScorePage();
  }
}

// Add time to GameState.time.played
function addTime() {
  GameState.time.played += 0.1;
  checkTimeStop();
}

// Start timer when game page is clicked
function startTimer() {
  GameState.time.played = 0;
  GameState.time.penalty = 0;
  GameState.time.final = 0;
  GameState.timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);
}

// Scroll After Right/Wrong Selection
function recordAnswer(guessedTrue) {
  GameState.scrollY += 80;
  itemContainer.scroll(0, GameState.scrollY);
  const choice = guessedTrue ? 'true' : 'false';
  GameState.guesses.push(choice);
  return choice;
}

// Util Random Int
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Util Shuffle Array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Displays Game Page
function showGamePage() {
  countdownPage.hidden = true;
  gamePage.hidden = false;
}

// Create Correct/Incorrect Random Equations
function createEquations(questionAmount) {
  const correctEquations = getRandomInt(questionAmount);
  const wrongEquations = questionAmount - correctEquations;
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(10);
    secondNumber = getRandomInt(10);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    GameState.equations.push(equationObject);
  }
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(10);
    secondNumber = getRandomInt(10);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber - 1} = ${equationValue}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    wrongFormat[3] = `${firstNumber - 1} x ${secondNumber} = ${equationValue}`;
    wrongFormat[4] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[5] = `${firstNumber} x ${secondNumber} = ${equationValue + 1}`;
    const formatChoice = getRandomInt(6);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    GameState.equations.push(equationObject);
  }
  shuffle(GameState.equations);
}

// Add Equations to DOM
function equationsToDOM() {
  GameState.equations.forEach((equation) => {
    const item = document.createElement('div');
    item.classList.add('item');

    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;

    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}

// Dynamically adding correct/incorrect equations
function populateGamePage(questionAmount) {
  itemContainer.textContent = '';
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');

  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  itemContainer.append(topSpacer, selectedItem);

  createEquations(questionAmount);
  equationsToDOM();

  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// Displays 3, 2, 1, GO!
function countdownStart() {
  countdown.textContent = '3';
  setTimeout(() => countdown.textContent = '2', 1000);
  setTimeout(() => countdown.textContent = '1', 2000);
  setTimeout(() => countdown.textContent = 'GO!', 3000);
}

// Navigate from Splash Page to Countdown Page
function showCountdownPage() {
  splashPage.hidden = true;
  countdownPage.hidden = false;
}

// Get the value from selected radio button
function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radio) => {
    if (radio.checked) radioValue = radio.value;
  });
  return radioValue;
}

// Form that decide amount of questions
function selectQuestionAmount() {
  radioContainers.forEach((radio) => {
    radio.classList.remove('selected-label');
    if (radio.children[1].checked) {
      radio.classList.add('selected-label');
    }
  });
};

// Submit Form
function startGameFlow(e) {
  e.preventDefault();
  const questionAmount = Number(getRadioValue());
  if (questionAmount) {
    GameState.questionAmount = questionAmount;
    showCountdownPage();
    countdownStart();
    populateGamePage(questionAmount);
    setTimeout(showGamePage, 4000);
  }
}

// On Load
function init() {
  getSavedBestScores();
  displayBestScores();
  startForm.addEventListener('click', selectQuestionAmount);
  startForm.addEventListener('submit', startGameFlow);
  gamePage.addEventListener('click', startTimer);
  playAgainBtn.addEventListener('click', playAgain);
}

init();