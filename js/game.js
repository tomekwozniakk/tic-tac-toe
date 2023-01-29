function resetGameStatus() {
  gameIsOver = false;
  activePlayer = 0;
  currentRound = 1;
  gameOver.firstElementChild.innerHTML = `
    You won, <span id="winner-name">PLAYER NAME</span>!`;
  gameOver.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData.length; j++) {
      gameData[i][j] = 0;
      gameBoard.children[gameBoardIndex].textContent = "";
      gameBoard.children[gameBoardIndex].classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (!players[0].name || !players[1].name) {
    alert("Please enter valid name for each player!");
    return;
  }

  resetGameStatus();

  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameAreaElement(e) {
  const selectedColumn = e.target.dataset.col;
  const selectedRow = e.target.dataset.row;

  if (gameData[selectedRow - 1][selectedColumn - 1] > 0 || gameIsOver) {
    return;
  }

  e.target.textContent = players[activePlayer].symbol;
  e.target.classList.add("disabled");

  gameData[selectedRow - 1][selectedColumn - 1] = activePlayer + 1;

  const winnerIndex = checkForGameOver();
  if (winnerIndex !== 0) {
    endGame(winnerIndex);
    return;
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  } else if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerIndex) {
  gameOver.style.display = "block";

  if (winnerIndex > 0) {
    gameOver.firstElementChild.firstElementChild.textContent =
      players[winnerIndex - 1].name;
  } else {
    gameOver.firstElementChild.textContent = "It's a draw!";
  }
  gameIsOver = true;
}
