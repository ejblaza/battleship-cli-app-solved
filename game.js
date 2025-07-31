const readlineSync = require("readline-sync");
const gameHelpers = require("./game-helpers.js");

// Attempted to destructure for cleaner and DRY code but it breaks game flow
// const {
//   userSelectBoard,
//   letterToNumber,
//   startingBoard,
//   printBoard,
//   didUserWin,
// } = gameHelpers;

// Welcomes the user and prompts user to choose the size board to play
function introduction() {
  console.log("Welcome to Battleship 🚢");
  const boardSelect = readlineSync.keyInSelect(
    [
      "4x4\n\tIncludes:\n\t\t- 1 large ship\n\t\t- 1 small ship",
      "5x5\n\tIncludes:\n\t\t- 1 large ship\n\t\t- 2 small ship",
      "6x6\n\tIncludes:\n\t\t- 2 large ship\n\t\t- 2 small ship",
    ],
    "Choose a board size:"
  );
  return gameHelpers.userSelectBoard(boardSelect);
}

// Prompts user to guess the position to hit
function userMove(board) {
  const selectedMove = readlineSync.question(
    "Make a guess eg.. A1, B2, etc...\n"
  );
  const positionLetter = gameHelpers.letterToNumber(selectedMove.charAt(0));
  const positionNumber = parseInt(selectedMove.charAt(1));

  console.clear();
  if (positionLetter == null || positionNumber >= board.length) {
    console.log(
      `${selectedMove.charAt(0)}${positionNumber} is outside the board!`
    );
    return board;
  } else if (board[positionLetter][positionNumber].hit === true) {
    console.log(
      `${selectedMove.charAt(0)}${positionNumber} has already been shot at!`
    );
  } else {
    if (
      board[positionLetter][positionNumber].type === "large" ||
      board[positionLetter][positionNumber].type === "small"
    ) {
      console.log(`HIT AT ${selectedMove.charAt(0)}${positionNumber}!`);
    } else if (board[positionLetter][positionNumber].type === "empty") {
      console.log(`MISS AT ${selectedMove.charAt(0)}${positionNumber}!`);
    }
    board[positionLetter][positionNumber].hit = true;
    return board;
  }
}

function gameFlow(board) {
  let userWon = false;
  let attempts = 0;
  while (!userWon) {
    gameHelpers.printBoard(board);
    board = userMove(board);
    userWon = gameHelpers.didUserWin(board);
    if (userWon) {
      console.clear();
      gameHelpers.printBoard(board);
      console.log(`========\n
__   _______ _   _   _    _ _____ _   _
\\ \\ / /  _  | | | | | |  | |_   _| \\ | |
 \\ V /| | | | | | | | |  | | | | |  \\| |
  \\ / | | | | | | | | |/\\| | | | | . ' |
  | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
  \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
\n========`);
    }
    attempts++;
  }
  console.log(`Won the game in ${attempts} attempts!`);
}

// Start of game
const selectedBoard = introduction();
let updatedBoard = selectedBoard;

if (selectedBoard === null) {
  console.log("Hope you come back to play soon!");
} else {
  console.clear();
  gameHelpers.startingBoard(selectedBoard);

  gameFlow(updatedBoard);
}
// End of game
