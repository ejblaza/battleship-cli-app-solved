const readlineSync = require("readline-sync");
const { gameConfig, shipsConfig } = require("./config");

const createEmptyCell = () => ({ type: "empty", hit: false });

const data = {
  // Gets designated board the user selects and passes it along the game flow
  userSelectBoard: function (size) {
    return [...Array(size + 4)].map((row) =>
      [...Array(size + 4)].map((column) => createEmptyCell())
    );
  },

  // Prints out the designated board with proper x-index and y-index with corresponding labels depending position status
  printBoard: function (board, debug) {
    const arrayColumnType = [];
    let arrayColumnLetter = "a";
    const battleshipTable = {};
    this.getTypeShape(board, shipsConfig);
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
  },

  // Adds 'typeShape' property to board position object to hold the symbol based on the position's 'type'
  getTypeShape: function (board) {
    for (let i = 0; i < board.length; i++) {
      for (let k = 0; k < board[i].length; k++) {
        board[i][k].typeShape = shipsConfig[board[i][k].type].shape;
      }
    }
  },

  // Resets all the positions 'hit' status to false if any saved to true before beginning game
  startingBoard: function (board) {
    for (let i = 0; i < board.length; i++) {
      for (let k = 0; k < board[i].length; k++) {
        board[i][k].hit = false;
      }
    }
  },

  // Conversion for letter index to number to help point to specific array in letter index
  letterToNumber: function (char) {
    const upperChar = char.toUpperCase(); // Convert to uppercase for consistent handling
    const asciiValue = upperChar.charCodeAt(0); // Get ASCII value of the first character

    // For min letter position value 'A' (ASCII 65) to max letter position value 'F' (ASCII 70)
    // Subtract 65 to get 0 for 'A', 1 for 'B', etc.
    // Return null if letter passed in is outside boundaries
    return asciiValue >= 65 && asciiValue <= 70 ? asciiValue - 65 : null;
  },

  getRandomInt: function (max) {
    return Math.floor(Math.random() * max);
  },

  checkIfNextSpacesEmpty: function (
    board,
    row,
    column,
    direction,
    units,
    shipType
  ) {
    console.log("funciton 'checkIfNextSpacesEmpty' is working");
    const checkArray = [];
    if (direction == 0) {
      for (i = 1; i < units; i++) {
        if (board[row + i][column].type.includes("empty"))
          checkArray.push(board[row + i][column]);
      }
      if (checkArray.length == units - 1) {
        checkArray.forEach((space) => (space.type = shipType));
        console.log("checkArray: ", checkArray);
        for (i = 1; i < units; i++) {
          board[row + i][column] = checkArray[i - 1];
          console.log(
            `board[${row} + ${i}][${column}]:`,
            board[row + i][column]
          );
        }
      } else {
        checkArray = [];
        for (i = 1; i < units; i++) {
          if (board[row - i][column].type.includes("empty"))
            checkArray.push(board[row - i][column]);
        }
        if (checkArray.length == units - 1) {
          checkArray.forEach((space) => (space.type = shipType));
          console.log("checkArray: ", checkArray);
          for (i = 1; i < units; i++) {
            board[row - i][column] = checkArray[i - 1];
            console.log(
              `board[${row} - ${i}][${column}]:`,
              board[row + i][column]
            );
          }
        } else this.placeShip(board, shipType);
      }
    } else if (direction == 1) {
      for (i = 1; i < units; i++) {
        if (board[row][column + i].type.includes("empty"))
          checkArray.push(board[row][column + i]);
      }
      if (checkArray.length == units - 1) {
        checkArray.forEach((space) => (space.type = shipType));
        console.log("checkArray: ", checkArray);
        for (i = 1; i < units; i++) {
          board[row][column + i] = checkArray[i - 1];
          console.log(
            `board[${row}][${column} + ${i}]:`,
            board[row + i][column]
          );
        }
      } else {
        checkArray = [];
        for (i = 1; i < units; i++) {
          if (board[row][column - i].type.includes("empty"))
            checkArray.push(board[row][column - i]);
        }
        if (checkArray.length == units - 1) {
          checkArray.forEach((space) => (space.type = shipType));
          console.log("checkArray: ", checkArray);
          for (i = 1; i < units; i++) {
            board[row][column - i] = checkArray[i - 1];
            console.log(
              `board[${row}][${column} - ${i}]:`,
              board[row + i][column]
            );
          }
        } else this.placeShip(board, shipType);
      }
    }
  },

  checkIfStartOffShipInBoard: function (board, row, column, direction, units) {
    const addToShip = units - 1;
    let result;
    console.log("CHECKING");
    if (direction == 0) {
      result =
        row + addToShip < board.length || row - addToShip > 0 ? true : false;
    } else if (direction == 1) {
      result =
        column + addToShip < board.length || column - addToShip > 0
          ? true
          : false;
    }
    console.log("DONE CHECK:", result);
    return result;
  },

  placeShip: function (board, shipType) {
    const shipDirection = this.getRandomInt(2); // 0: vertical ship direction; 1 horizontal ship direction
    console.log("direction: ", shipDirection);
    const placeShipInRow = this.getRandomInt(board.length);
    console.log("row: ", placeShipInRow);
    const placeShipInColumn = this.getRandomInt(board.length);
    console.log("column: ", placeShipInColumn);
    const shipLength = shipsConfig[shipType].units;

    const spaceCurrentlyEmpty =
      board[placeShipInRow][placeShipInColumn].type.includes("empty");
    if (spaceCurrentlyEmpty) {
      board[placeShipInRow][placeShipInColumn].type = shipType;
      console.log("checkIfStartOffShipInBoard");
      if (
        this.checkIfStartOffShipInBoard(
          board,
          placeShipInRow,
          placeShipInColumn,
          shipDirection,
          shipLength
        )
      ) {
        console.log("funciton 'checkIfStartOffShipInBoard' is working");
        this.checkIfNextSpacesEmpty(
          board,
          placeShipInRow,
          placeShipInColumn,
          shipDirection,
          shipLength,
          shipType
        );
      } else {
        board[placeShipInRow][placeShipInColumn].type = "empty";
        this.placeShip(board, shipType);
      }
    } else this.placeShip(board, shipType);
  },

  generateShips: function (board) {
    let smallShipTotal = gameConfig[board.length].small;
    let largeShipTotal = gameConfig[board.length].large;

    while (smallShipTotal > 0) {
      this.placeShip(board, "small");
      smallShipTotal--;
    }
    while (largeShipTotal > 0) {
      this.placeShip(board, "large");
      largeShipTotal--;
    }
  },

  // Prompts user to guess the position to hit
  userMove: function (board) {
    const selectedMove = readlineSync.question(
      "Make a guess eg.. A1, B2, etc...\n"
    );
    const positionLetter = this.letterToNumber(selectedMove.charAt(0));
    const positionNumber = parseInt(selectedMove.charAt(1));

    // console.clear();

    const isCoordOutBoard =
      positionLetter == null || positionNumber >= board.length;
    if (isCoordOutBoard) {
      console.log(
        `${selectedMove.charAt(0)}${positionNumber} is outside the board!`
      );
      return board;
    } else if (board[positionLetter][positionNumber].hit === true) {
      console.log(
        `${selectedMove.charAt(0)}${positionNumber} has already been shot at!`
      );
      return board;
    } else {
      if (
        board[positionLetter][positionNumber].type.includes(["small", "large"])
      ) {
        console.log(`HIT AT ${selectedMove.charAt(0)}${positionNumber}!`);
      } else if (board[positionLetter][positionNumber].type === "empty") {
        console.log(`MISS AT ${selectedMove.charAt(0)}${positionNumber}!`);
      }
      board[positionLetter][positionNumber].hit = true;
      return board;
    }
  },

  // Determines user win by comparing boat spaces and how many boat spaces are hit
  didUserWin: function (board) {
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
    return totalBoatSpace === hitBoatSpace && totalBoatSpace > 0;
  },
};

const userSelectBoard = (size) => data.userSelectBoard(size);
const letterToNumber = (char) => data.letterToNumber(char);
const getTypeShape = (board) => getTypeShape(board);
const startingBoard = (board) => data.startingBoard(board);
const generateShips = (board) => data.generateShips(board);
const printBoard = (board, debug) => data.printBoard(board, debug);
const didUserWin = (board) => data.didUserWin(board);
const userMove = (board) => data.userMove(board);

module.exports = {
  userSelectBoard,
  letterToNumber,
  getTypeShape,
  startingBoard,
  generateShips,
  printBoard,
  didUserWin,
  userMove,
};
