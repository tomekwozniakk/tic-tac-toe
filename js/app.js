const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const backdrop = document.getElementById("backdrop");
const form = document.querySelector("form");
const errorsOutput = document.getElementById("config-errors");
const gameArea = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOver = document.getElementById("game-over");

const editPlayerOneBtn = document.getElementById("edit-player-one");
const editPlayerTwoBtn = document.getElementById("edit-player-two");
const cancelConfigBtn = document.getElementById("cancel-config");
const startNewGameBtn = document.getElementById("start-game");
const gameAreaElements = document.querySelectorAll(".game-board li");
const gameBoard = document.getElementById("game-board");

editPlayerOneBtn.addEventListener("click", openPlayerConfig);
editPlayerTwoBtn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closePlayerConfig);
backdrop.addEventListener("click", closePlayerConfig);

form.addEventListener("submit", savePlayerConfig);

startNewGameBtn.addEventListener("click", startNewGame);

for (const element of gameAreaElements) {
  element.addEventListener("click", selectGameAreaElement);
}
