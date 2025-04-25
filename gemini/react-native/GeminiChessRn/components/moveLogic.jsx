// --- Helper Functions ---

// Checks if coordinates are within the board boundaries (0-7)
const isWithinBoard = (row, col) => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

// Checks if a square is empty or contains an opponent's piece
const canMoveTo = (board, row, col, pieceColor) => {
  if (!isWithinBoard(row, col)) return false;
  const targetSquare = board[row][col];
  return targetSquare === null || targetSquare.color !== pieceColor;
};

// Checks if a square contains an opponent's piece (for captures)
const canCapture = (board, row, col, pieceColor) => {
    if (!isWithinBoard(row, col)) return false;
    const targetSquare = board[row][col];
    return targetSquare !== null && targetSquare.color !== pieceColor;
}

// --- Piece Specific Move Logic ---

// Calculates Pawn moves
const getPawnMoves = (board, row, col, color) => {
  const moves = [];
  const direction = color === 'white' ? -1 : 1; // White moves up (-1), Black moves down (+1)
  const startRow = color === 'white' ? 6 : 1;

  // 1. Move forward one square
  const oneStep = row + direction;
  if (isWithinBoard(oneStep, col) && board[oneStep][col] === null) {
    moves.push([oneStep, col]);

    // 2. Move forward two squares (only from starting position)
    if (row === startRow) {
      const twoSteps = row + 2 * direction;
      if (isWithinBoard(twoSteps, col) && board[twoSteps][col] === null) {
        moves.push([twoSteps, col]);
      }
    }
  }

  // 3. Capture diagonally
  const captureCols = [col - 1, col + 1];
  captureCols.forEach(captureCol => {
    if (canCapture(board, oneStep, captureCol, color)) {
      moves.push([oneStep, captureCol]);
    }
  });

  // Note: En passant and Promotion are not included yet.
  return moves;
};

// Calculates Rook moves (horizontal and vertical)
const getRookMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

  directions.forEach(([dRow, dCol]) => {
    for (let i = 1; ; i++) {
      const nextRow = row + i * dRow;
      const nextCol = col + i * dCol;

      if (!isWithinBoard(nextRow, nextCol)) break; // Off the board

      const targetSquare = board[nextRow][nextCol];
      if (targetSquare === null) {
        moves.push([nextRow, nextCol]); // Empty square, can move here
      } else {
        if (targetSquare.color !== color) {
          moves.push([nextRow, nextCol]); // Opponent piece, can capture
        }
        break; // Blocked by a piece (own or opponent)
      }
    }
  });
  // Note: Castling is not included yet.
  return moves;
};

// Calculates Knight moves (L-shape)
const getKnightMoves = (board, row, col, color) => {
  const moves = [];
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1],
  ];

  knightMoves.forEach(([dRow, dCol]) => {
    const nextRow = row + dRow;
    const nextCol = col + dCol;
    if (canMoveTo(board, nextRow, nextCol, color)) {
      moves.push([nextRow, nextCol]);
    }
  });

  return moves;
};

// Calculates Bishop moves (diagonal)
const getBishopMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; // Diagonal directions

  directions.forEach(([dRow, dCol]) => {
    for (let i = 1; ; i++) {
      const nextRow = row + i * dRow;
      const nextCol = col + i * dCol;

      if (!isWithinBoard(nextRow, nextCol)) break; // Off the board

      const targetSquare = board[nextRow][nextCol];
      if (targetSquare === null) {
        moves.push([nextRow, nextCol]); // Empty square
      } else {
        if (targetSquare.color !== color) {
          moves.push([nextRow, nextCol]); // Capture opponent
        }
        break; // Blocked
      }
    }
  });

  return moves;
};

// Calculates Queen moves (combines Rook and Bishop moves)
const getQueenMoves = (board, row, col, color) => {
  // Queen moves like a Rook and a Bishop combined
  return [
    ...getRookMoves(board, row, col, color),
    ...getBishopMoves(board, row, col, color),
  ];
};

// Calculates King moves (one square in any direction)
const getKingMoves = (board, row, col, color) => {
  const moves = [];
  const kingMoves = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  kingMoves.forEach(([dRow, dCol]) => {
    const nextRow = row + dRow;
    const nextCol = col + dCol;
    if (canMoveTo(board, nextRow, nextCol, color)) {
      moves.push([nextRow, nextCol]);
    }
  });
  // Note: Castling and Check detection are not included yet.
  return moves;
};

// Main function to get valid moves for any piece
export const getValidMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return []; // No piece on this square

  switch (piece.type) {
    case 'pawn':   return getPawnMoves(board, row, col, piece.color);
    case 'rook':   return getRookMoves(board, row, col, piece.color);
    case 'knight': return getKnightMoves(board, row, col, piece.color);
    case 'bishop': return getBishopMoves(board, row, col, piece.color);
    case 'queen':  return getQueenMoves(board, row, col, piece.color);
    case 'king':   return getKingMoves(board, row, col, piece.color);
    default:       return [];
  }
};
