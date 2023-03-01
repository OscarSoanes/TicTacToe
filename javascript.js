const gameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const move = (player, position) => {
    gameBoard[position] = player;
    displayController(gameBoard);
  };

  const reset = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    displayController(gameBoard);
  };

  return {move, reset};
})();

const displayController = (gameBoard, turn) => {
  const container = document.querySelector("#game-container");
  container.innerHTML = "";

  let index = 0;
  gameBoard.forEach((move) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = move;
    cell.setAttribute("index", index);

    container.appendChild(cell);
    index++;
  });
};

const game = (() => {
  const player = (name) => {
    return {name};
  };
  const player1 = player("x");
  const player2 = player("o");

  let currentPlayer = player1;

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      console.log("true");
      currentPlayer = player2;
    } else {
      console.log("false");
      currentPlayer = player1;
    }
  };

  const startGame = () => {
    gameBoard.move("", 0);
  };
  return {startGame, player1, player2, switchPlayer, currentPlayer};
})();

game.startGame();

// todo
// const cells = document.querySelectorAll(".cell");
// cells.forEach((cell) => cell.addEventListener("click", () => {}));
