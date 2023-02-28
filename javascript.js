const gameBoard = (() => {
  const gameBoard = ["x", "", "o", "", "o", "", "x", "", ""];
  const move = (move, position) => {
    gameBoard[position] = move;
    displayController(gameBoard);
  };

  return {move};
})();

const displayController = (gameBoard) => {
  const container = document.querySelector("#game-container");

  gameBoard.forEach((move) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = move;

    container.appendChild(cell);
  });
};

const Player = (name) => {
  return {name};
};

gameBoard.move("x", 2);
