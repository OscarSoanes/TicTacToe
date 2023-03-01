const gameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const reset = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    displayController(gameBoard);
  };

  const result = (player) => {
    const isFull = !gameBoard.includes("");

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const key in winningCombos) {
      if (
        gameBoard[winningCombos[key][0]] === player &&
        gameBoard[winningCombos[key][1]] === player &&
        gameBoard[winningCombos[key][2]] === player
      ) {
        return "won";
      }
    }

    if (isFull) {
      return "full";
    }
  };

  const move = (player, position) => {
    if (gameBoard[position] === "") {
      gameBoard[position] = player;
      displayController(gameBoard);
      let res = result(player);
      return res;
    }
    return "error";
  };

  return {move, reset};
})();

const displayController = (gameBoard, turn) => {
  // clears a parent container
  const empty = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const container = document.querySelector("#game-container");
  empty(container);

  let index = 0;
  gameBoard.forEach((move) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = move;
    cell.setAttribute("index", index);

    container.appendChild(cell);
    index++;
  });

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) =>
    cell.addEventListener("click", () => {
      game.move(cell.getAttribute("index"));
    })
  );
};

const game = (() => {
  const player = (name) => {
    return {name};
  };

  const player1 = player("x");
  const player2 = player("o");
  let currentPlayer = player1;
  let result = undefined;
  let span;
  const message = document.querySelector("#message");

  const startGame = () => {
    const empty = (parent) => {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    gameBoard.reset();
    currentPlayer = player1;
    result = undefined;

    empty(message);
    message.appendChild(document.createTextNode("Player "));

    let spanEl = document.createElement("span");

    spanEl.setAttribute("id", "turn");
    spanEl.textContent = currentPlayer.name;
    message.appendChild(spanEl);

    message.appendChild(document.createTextNode("'s turn"));

    span = document.querySelector("#turn");
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const move = (index) => {
    if (result === "won" || result === "full") {
      return;
    }

    result = gameBoard.move(currentPlayer.name, index);

    if (result === "error") return;
    if (result === "won") {
      message.textContent = `Player ${currentPlayer.name} won!`;
    }
    if (result === "full") {
      message.textContent = "It's a draw!";
    }

    switchPlayer();
    span.textContent = currentPlayer.name;
  };

  return {startGame, switchPlayer, move, currentPlayer, result};
})();

game.startGame();

const restart = document.querySelector("#restart");
restart.addEventListener("click", () => {
  game.startGame();
});
