const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayGame = () => {
    let boardHTML = "";
    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector(".game-board").innerHTML = boardHTML;

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    board[index] = value;
    GameBoard.displayGame();
  };

  const getGameBoard = () => board;

  return {
    displayGame,
    update,
    getGameBoard,
  };
})();

const startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", () => {
  Game.start();
});

const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", () => {
  Game.restart();
});

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const createPlayer = (name, mark) => {
    return {
      name,
      mark,
    };
  };

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    GameBoard.displayGame();
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      GameBoard.update(i, "");
      GameBoard.displayGame();
    }
    document.querySelector(".message").innerHTML = ``;
    gameOver = false;
  };

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }

    let index = parseInt(event.target.id.split("-")[1]);

    if (GameBoard.getGameBoard()[index] !== "") {
      return;
    }

    GameBoard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(GameBoard.getGameBoard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      displayController.displayMessage(
        `${players[currentPlayerIndex].name} won!!`
      );
    } else if (checkForTie(GameBoard.getGameBoard())) {
      gameOver = true;
      displayController.displayMessage(`It's a tie! Try again.`);
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    restart,
    handleClick,
  };
})();

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

const displayController = (() => {
  const displayMessage = (message) => {
    document.querySelector(".message").innerHTML = message;
  };
  return {
    displayMessage,
  };
})();
