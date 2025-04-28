import { PIECE_TYPES, COLORS, LETTER_TO_PIECE, LETTER_TO_COLOR } from './constants';


export const getPieceColor = (piece) => {
  if (!piece) return null;
  return piece === piece.toUpperCase() ? COLORS.WHITE : COLORS.BLACK;
};

export const getPieceType = (piece) => {
  if (!piece) return null;
  return piece.toLowerCase();
};


export const isValidMove = (board, from, to) => {
  const piece = board[from.row][from.col];
  if (!piece) return false;

  const pieceType = getPieceType(piece);
  const pieceColor = getPieceColor(piece);

  // Can't capture your own piece
  const targetPiece = board[to.row][to.col];
  if (targetPiece && getPieceColor(targetPiece) === pieceColor) {
    return false;
  }

  // Calculate row and column differences
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);

  switch (pieceType) {
    case PIECE_TYPES.PAWN:
      return isValidPawnMove(board, from, to, pieceColor);
    case PIECE_TYPES.ROOK:
      return isValidRookMove(board, from, to);
    case PIECE_TYPES.KNIGHT:
      return isValidKnightMove(rowDiff, colDiff);
    case PIECE_TYPES.BISHOP:
      return isValidBishopMove(board, from, to);
    case PIECE_TYPES.QUEEN:
      return isValidQueenMove(board, from, to);
    case PIECE_TYPES.KING:
      return isValidKingMove(rowDiff, colDiff);
    default:
      return false;
  }
};

const isValidPawnMove = (board, from, to, color) => {
  const direction = color === COLORS.WHITE ? -1 : 1;
  const startRow = color === COLORS.WHITE ? 6 : 1;
  const rowDiff = to.row - from.row;
  const colDiff = Math.abs(to.col - from.col);

  // Moving forward
  if (to.col === from.col) {
    // Single move forward
    if (rowDiff === direction && !board[to.row][to.col]) {
      return true;
    }
    // Double move from starting position
    if (from.row === startRow && rowDiff === 2 * direction &&
        !board[from.row + direction][from.col] &&
        !board[to.row][to.col]) {
      return true;
    }
    return false;
  }

  // Capturing diagonally
  if (colDiff === 1 && rowDiff === direction && board[to.row][to.col]) {
    return true;
  }

  return false;
};

const isValidRookMove = (board, from, to) => {
  // Must move in straight line
  if (from.row !== to.row && from.col !== to.col) return false;

  // Check if path is clear
  if (from.row === to.row) {
    // Horizontal move
    const start = Math.min(from.col, to.col) + 1;
    const end = Math.max(from.col, to.col);
    for (let col = start; col < end; col++) {
      if (board[from.row][col]) return false;
    }
  } else {
    // Vertical move
    const start = Math.min(from.row, to.row) + 1;
    const end = Math.max(from.row, to.row);
    for (let row = start; row < end; row++) {
      if (board[row][from.col]) return false;
    }
  }

  return true;
};

const isValidKnightMove = (rowDiff, colDiff) => {
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

const isValidBishopMove = (board, from, to) => {
  // Must move diagonally
  if (Math.abs(from.row - to.row) !== Math.abs(from.col - to.col)) return false;

  // Check if path is clear
  const rowStep = from.row < to.row ? 1 : -1;
  const colStep = from.col < to.col ? 1 : -1;
  let row = from.row + rowStep;
  let col = from.col + colStep;

  while (row !== to.row && col !== to.col) {
    if (board[row][col]) return false;
    row += rowStep;
    col += colStep;
  }

  return true;
};

const isValidQueenMove = (board, from, to) => {
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
};

const isValidKingMove = (rowDiff, colDiff) => {
  return rowDiff <= 1 && colDiff <= 1;
};
export const movePiece = (board, from, to) => {
  const newBoard = [...board.map(row => [...row])];
  newBoard[to.row][to.col] = newBoard[from.row][from.col];
  newBoard[from.row][from.col] = '';
  return newBoard;
};