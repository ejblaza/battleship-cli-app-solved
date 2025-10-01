const readlineSync = require("readline-sync");
const { gameConfig, shipsConfig } = require("./config.js");

const checkArray = new Array(2);
console.log(checkArray.length);
checkArray.push("pushed");
console.log(checkArray.length);

function printBoard(board, debug) {
  const arrayColumnType = [];
  let arrayColumnLetter = "a";
  const battleshipTable = {};
  getTypeShape(board);
  for (let i = 0; i < board.length; i++) {
    const arrayRowType = [];
    for (let k = 0; k < board[i].length; k++) {
      // 'if' displays board with all exposed labels for debugging purposes
      if (debug) {
        board[i][k].hit = true;
        arrayRowType.push(board[i][k].typeShape);
      }
      // 'else' displays the current status of the board depending positions' status of 'hit'
      else {
        if (board[i][k].hit === true) {
          arrayRowType.push(board[i][k].typeShape);
        } else if (board[i][k].hit === false) {
          arrayRowType.push("-");
        }
      }
    }
    arrayColumnType.push(arrayRowType);
    arrayColumnLetter = String.fromCharCode("A".charCodeAt() + i);
    battleshipTable[arrayColumnLetter] = arrayColumnType[i];
  }
  console.table(battleshipTable);
  return battleshipTable;
}

function getTypeShape(board) {
  for (let i = 0; i < board.length; i++) {
    const arrayRowType = [];
    for (let k = 0; k < board[i].length; k++) {
      if (board[i][k].type === "small") {
        board[i][k].typeShape = "🟠";
      } else if (board[i][k].type === "large") {
        board[i][k].typeShape = "🔵";
      } else if (board[i][k].type === "empty") board[i][k].typeShape = "❗";
    }
  }
}

function startingBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      board[i][k].hit = false;
    }
  }
}

function letterToNumber(char) {
  const upperChar = char.toUpperCase(); // Convert to uppercase for consistent handling
  const asciiValue = upperChar.charCodeAt(0); // Get ASCII value of the first character

  // For min letter position value 'A' (ASCII 65) to max letter position value 'F' (ASCII 70)
  if (asciiValue >= 65 && asciiValue <= 70) {
    return asciiValue - 65; // Subtract 65 to get 0 for 'A', 1 for 'B', etc.
  } else {
    return null; // Return null if letter passed in is outside boundaries
  }
}

function userMove(board) {
  const selectedMove = readlineSync.question(
    "Make a guess eg.. A1, B2, etc...\n"
  );
  const positionLetter = letterToNumber(selectedMove.charAt(0));
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

function didUserWin(board) {
  let totalBoatSpace = 0;
  let hitBoatSpace = 0;
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      if (board[i][k].type === "large" || board[i][k].type === "small") {
        totalBoatSpace++;
      }
      if (
        (board[i][k].type === "large" || board[i][k].type === "small") &&
        board[i][k].hit === true
      ) {
        hitBoatSpace++;
      }
    }
  }
  if (totalBoatSpace === hitBoatSpace) {
    return true;
  }
}

const createEmptyCell = () => ({ type: "empty", hit: false });

const createBoardSize = (size) => {
  return [...Array(size)].map((row) =>
    [...Array(size)].map((cell) => createEmptyCell())
  );
};

const testBoard1 = [
  [
    { type: "empty", hit: false }, // Represents position A0
    { type: "empty", hit: false }, // Represents position A1
    { type: "empty", hit: false }, // Represents position A2
    { type: "large", hit: false }, // Represents position A3
    { type: "large", hit: false }, // Represents position A4
    { type: "large", hit: false }, // Represents position A5
  ],
  [
    { type: "small", hit: false }, // Represents position B0
    { type: "small", hit: false }, // Represents position B1
    { type: "empty", hit: false }, // Represents position B2
    { type: "empty", hit: false }, // Represents position B3
    { type: "empty", hit: false }, // Represents position B4
    { type: "empty", hit: false }, // Represents position B5
  ],
  [
    { type: "empty", hit: false }, // Represents position C0
    { type: "empty", hit: false }, // Represents position C1
    { type: "empty", hit: false }, // Represents position C2
    { type: "empty", hit: false }, // Represents position C3
    { type: "empty", hit: false }, // Represents position C4
    { type: "empty", hit: false }, // Represents position C5
  ],
  [
    { type: "empty", hit: false }, // Represents position D0
    { type: "large", hit: false }, // Represents position D1
    { type: "empty", hit: false }, // Represents position D2
    { type: "empty", hit: false }, // Represents position D3
    { type: "empty", hit: false }, // Represents position D4
    { type: "empty", hit: false }, // Represents position D5
  ],
  [
    { type: "empty", hit: false }, // Represents position E0
    { type: "large", hit: false }, // Represents position E1
    { type: "empty", hit: false }, // Represents position E2
    { type: "small", hit: false }, // Represents position E3
    { type: "empty", hit: false }, // Represents position E4
    { type: "empty", hit: false }, // Represents position E5
  ],
  [
    { type: "empty", hit: false }, // Represents position F0
    { type: "large", hit: false }, // Represents position F1
    { type: "empty", hit: false }, // Represents position F2
    { type: "small", hit: false }, // Represents position F3
    { type: "empty", hit: false }, // Represents position F4
    { type: "empty", hit: false }, // Represents position F5
  ],
];

console.log(createBoardSize(4));

// console.log("Starting board for testBoard1...");
// console.log(testBoard1[0]);
// startingBoard(testBoard1);
// printBoard(testBoard1, false);
console.log("Test Board 1 is...");
printBoard(createBoardSize(4), false);
// let userWon = false;
// let updatedBoard = testBoard1;
// let attempts = 0;

// while (!userWon) {
//   printBoard(updatedBoard);
//   updatedBoard = userMove(updatedBoard);
//   userWon = didUserWin(updatedBoard);
//   if (userWon) {
//     console.clear();
//     printBoard(updatedBoard);
//     console.log(`========\n
// __   _______ _   _   _    _ _____ _   _
// \\ \\ / /  _  | | | | | |  | |_   _| \\ | |
//  \\ V /| | | | | | | | |  | | | | |  \\| |
//   \\ / | | | | | | | | |/\\| | | | | . ' |
//   | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
//   \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
// \n========`);
//   }
//   attempts++;
// }
// console.log(`Won the game in ${attempts} attempts!`);
// // console.log("Test Board 1 should be...");
// console.table({
//   A: ["-", "🟠", "-"],
//   B: ["-", "-", "❗"],
//   C: ["-", "-", "-"],
// });
