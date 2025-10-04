const readlineSync = require("readline-sync");
const gameHelpers = require("./game-helpers.js");
const { gameConfig, shipsConfig } = require("./config.js");

// Attempted to destructure for cleaner and DRY code but it breaks game flow
const {
  userSelectBoard,
  startingBoard,
  generateShips,
  printBoard,
  didUserWin,
  userMove,
} = gameHelpers;

// Welcomes the user and prompts user to choose the size board to play
function introduction(config) {
  console.log("Welcome to Battleship 🚢");

  const boardOptionsLabels = Object.entries(config).map(
    ([key, value]) =>
      `${key}x${key}\n\tIncludes:\n\t\t- ${value.large} large ship\n\t\t- ${value.small} small ship`
  );
  const boardSelect = readlineSync.keyInSelect(
    boardOptionsLabels,
    "Choose a board size:"
  );
  return userSelectBoard(boardSelect);
}

function handleGameCompletion(board) {
  console.clear();
  printBoard(board, false);
  console.log(`========\n
__   _______ _   _   _    _ _____ _   _
\\ \\ / /  _  | | | | | |  | |_   _| \\ | |
 \\ V /| | | | | | | | |  | | | | |  \\| |
  \\ / | | | | | | | | |/\\| | | | | . ' |
  | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
  \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
\n========`);
}

function gameFlow(board) {
  let userWon = false;
  let attempts = 0;
  while (!userWon) {
    printBoard(board, false);
    board = userMove(board);
    userWon = didUserWin(board);
    if (userWon) {
      handleGameCompletion(board);
    }
    attempts++;
  }
  console.log(`Won the game in ${attempts} attempts!`);
}

const runBattleship = (config, shipConfig) => {
  // Start of game
  const boardSelected = introduction(config, shipConfig);

  if (boardSelected === null) {
    console.log("Hope you come back to play soon!");
  } else {
    console.clear();

    startingBoard(boardSelected);
    generateShips(boardSelected, config, shipConfig);

    gameFlow(boardSelected);
    // End of game
  }
};

// Game Execution
runBattleship(gameConfig, shipsConfig);
