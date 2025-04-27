export const initialBoard = [
  // 0 index is top (black side)
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

// Helpers
function inBounds(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getPossibleMoves(board, row, col) {
  const piece = board[row][col];
  if (!piece) return [];
  switch (piece.type) {
    case 'pawn':
      return pawnMoves(board, row, col, piece.color);
    case 'rook':
      return rookMoves(board, row, col, piece.color);
    case 'knight':
      return knightMoves(board, row, col, piece.color);
    case 'bishop':
      return bishopMoves(board, row, col, piece.color);
    case 'queen':
      return queenMoves(board, row, col, piece.color);
    case 'king':
      return kingMoves(board, row, col, piece.color);
    default:
      return [];
  }
}

function pawnMoves(board, row, col, color) {
  const dir = color === 'white' ? -1 : 1;
  const moves = [];
  const startRow = color === 'white' ? 6 : 1;
  // Forward move
  if (inBounds(row + dir, col) && !board[row + dir][col]) moves.push({ row: row + dir, col });
  // Double move from starting position
  if (row === startRow && !board[row + dir][col] && !board[row + dir * 2][col]) {
    moves.push({ row: row + dir * 2, col });
  }
  // Captures
  [-1, 1].forEach(dc => {
    const newRow = row + dir;
    const newCol = col + dc;
    if (inBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (target && target.color !== color) moves.push({ row: newRow, col: newCol });
    }
  });
  return moves;
}

function linearMoves(board, row, col, color, directions) {
  const moves = [];
  directions.forEach(([dr, dc]) => {
    let r = row + dr;
    let c = col + dc;
    while (inBounds(r, c)) {
      if (!board[r][c]) {
        moves.push({ row: r, col: c });
      } else {
        if (board[r][c].color !== color) moves.push({ row: r, col: c });
        break;
      }
      r += dr;
      c += dc;
    }
  });
  return moves;
}

function rookMoves(board, row, col, color) {
  return linearMoves(board, row, col, color, [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]);
}

function bishopMoves(board, row, col, color) {
  return linearMoves(board, row, col, color, [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]);
}

function queenMoves(board, row, col, color) {
  return [...rookMoves(board, row, col, color), ...bishopMoves(board, row, col, color)];
}

function knightMoves(board, row, col, color) {
  const candidates = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  return candidates
    .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
    .filter(({ row: r, col: c }) => inBounds(r, c) && (!board[r][c] || board[r][c].color !== color));
}

function kingMoves(board, row, col, color) {
  const candidates = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  return candidates
    .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
    .filter(({ row: r, col: c }) => inBounds(r, c) && (!board[r][c] || board[r][c].color !== color));
}
