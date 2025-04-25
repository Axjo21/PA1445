// Represents a piece on the board
// type: 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'
// color: 'white', 'black'
const createPiece = (type, color) => ({ type, color });

// Creates the initial 8x8 board setup
export const getInitialBoard = () => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));

  // Place Pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = createPiece('pawn', 'black');
    board[6][i] = createPiece('pawn', 'white');
  }

  // Place Rooks
  board[0][0] = createPiece('rook', 'black');
  board[0][7] = createPiece('rook', 'black');
  board[7][0] = createPiece('rook', 'white');
  board[7][7] = createPiece('rook', 'white');

  // Place Knights
  board[0][1] = createPiece('knight', 'black');
  board[0][6] = createPiece('knight', 'black');
  board[7][1] = createPiece('knight', 'white');
  board[7][6] = createPiece('knight', 'white');

  // Place Bishops
  board[0][2] = createPiece('bishop', 'black');
  board[0][5] = createPiece('bishop', 'black');
  board[7][2] = createPiece('bishop', 'white');
  board[7][5] = createPiece('bishop', 'white');

  // Place Queens
  board[0][3] = createPiece('queen', 'black');
  board[7][3] = createPiece('queen', 'white');

  // Place Kings
  board[0][4] = createPiece('king', 'black');
  board[7][4] = createPiece('king', 'white');

  return board;
};

// Simple mapping for piece display (using Unicode characters)
export const pieceSymbols = {
  white: {
    king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙',
  },
  black: {
    king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟︎', // Added variation selector for pawn
  },
};
