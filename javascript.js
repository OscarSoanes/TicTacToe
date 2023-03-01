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

  let index = 0;
  gameBoard.forEach((move) => {
    console.log(`${index} & ${move}`);
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

  const startGame = () => {
    gameBoard.move("", 0);
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const move = (index) => {
    gameBoard.move(currentPlayer.name, index);
    switchPlayer();
  };

  return {startGame, switchPlayer, move};
})();

game.startGame();

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    console.log("hi");
    game.move(cell.getAttribute("index"));
  })
);
