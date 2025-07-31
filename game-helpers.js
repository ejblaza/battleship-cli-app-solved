module.exports = {
  board4x4: [
    [
      { type: "empty", hit: false }, // Represents position A0
      { type: "empty", hit: false }, // Represents position A1
      { type: "empty", hit: false }, // Represents position A2
      { type: "small", hit: false }, // Represents position A3
    ],
    [
      { type: "empty", hit: false }, // Represents position B0
      { type: "empty", hit: false }, // Represents position B1
      { type: "empty", hit: false }, // Represents position B2
      { type: "small", hit: false }, // Represents position B3
    ],
    [
      { type: "large", hit: false }, // Represents position C0
      { type: "large", hit: false }, // Represents position C1
      { type: "large", hit: false }, // Represents position C2
      { type: "empty", hit: false }, // Represents position C3
    ],
    [
      { type: "empty", hit: false }, // Represents position D0
      { type: "empty", hit: false }, // Represents position D1
      { type: "empty", hit: false }, // Represents position D2
      { type: "empty", hit: false }, // Represents position D3
    ],
  ],
  board5x5: [
    [
      { type: "small", hit: false }, // Represents position A0
      { type: "small", hit: false }, // Represents position A1
      { type: "empty", hit: false }, // Represents position A2
      { type: "empty", hit: false }, // Represents position A3
      { type: "empty", hit: false }, // Represents position A4
    ],
    [
      { type: "empty", hit: false }, // Represents position B0
      { type: "empty", hit: false }, // Represents position B1
      { type: "empty", hit: false }, // Represents position B2
      { type: "large", hit: false }, // Represents position B3
      { type: "empty", hit: false }, // Represents position B4
    ],
    [
      { type: "empty", hit: false }, // Represents position C0
      { type: "empty", hit: false }, // Represents position C1
      { type: "empty", hit: false }, // Represents position C2
      { type: "large", hit: false }, // Represents position C3
      { type: "empty", hit: false }, // Represents position C4
    ],
    [
      { type: "empty", hit: false }, // Represents position D0
      { type: "small", hit: false }, // Represents position D1
      { type: "empty", hit: false }, // Represents position D2
      { type: "large", hit: false }, // Represents position D3
      { type: "empty", hit: false }, // Represents position D4
    ],
    [
      { type: "empty", hit: false }, // Represents position E0
      { type: "small", hit: false }, // Represents position E1
      { type: "empty", hit: false }, // Represents position E2
      { type: "empty", hit: false }, // Represents position E3
      { type: "empty", hit: false }, // Represents position E4
    ],
  ],
  board6x6: [
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
  ],
  // Gets designated board the user selects and passes it along the game flow
  userSelectBoard: function (boardSelect) {
    switch (boardSelect) {
      case 0:
        return this.board4x4;
      case 1:
        return this.board5x5;
      case 2:
        return this.board6x6;
      case -1:
        return null;
    }
  },
  // Prints out the designated board with proper x-index and y-index with corresponding labels depending position status
  printBoard: function (board, debug) {
    const arrayColumnType = [];
    let arrayColumnLetter = "a";
    const battleshipTable = {};
    this.getTypeShape(board);
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
        if (board[i][k].type === "small") {
          board[i][k].typeShape = "🟠";
        } else if (board[i][k].type === "large") {
          board[i][k].typeShape = "🔵";
        } else if (board[i][k].type === "empty") board[i][k].typeShape = "❗";
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
    if (asciiValue >= 65 && asciiValue <= 70) {
      return asciiValue - 65; // Subtract 65 to get 0 for 'A', 1 for 'B', etc.
    } else {
      return null; // Return null if letter passed in is outside boundaries
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
    if (totalBoatSpace === hitBoatSpace && totalBoatSpace > 0) {
      return true;
    }
  },
};
