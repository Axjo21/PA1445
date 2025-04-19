const pieceMovePatterns = {
    pawn: (x, y, color) => {
        const direction = color === 'white' ? -1 : 1;
        return [{ x, y: y + direction }];
    },
    rook: (x, y) => {
        const moves = [];
        for (let i = 1; i < 8; i++) {
            moves.push({ x: x + i, y }, { x: x - i, y }, { x, y: y + i }, { x, y: y - i });
        }
        return moves;
    },
    bishop: (x, y) => {
        const moves = [];
        for (let i = 1; i < 8; i++) {
            moves.push({ x: x + i, y: y + i }, { x: x - i, y: y - i }, { x: x + i, y: y - i }, { x: x - i, y: y + i });
        }
        return moves;
    },
    knight: (x, y) => {
        return [
            { x: x + 2, y: y + 1 },
            { x: x + 2, y: y - 1 },
            { x: x - 2, y: y + 1 },
            { x: x - 2, y: y - 1 },
            { x: x + 1, y: y + 2 },
            { x: x + 1, y: y - 2 },
            { x: x - 1, y: y + 2 },
            { x: x - 1, y: y - 2 },
        ];
    },
    queen: (x, y) => {
        return [...pieceMovePatterns.rook(x, y), ...pieceMovePatterns.bishop(x, y)];
    },
    king: (x, y) => {
        return [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 },
            { x: x + 1, y: y + 1 },
            { x: x - 1, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y + 1 },
        ];
    },
};

const isPathClear = (start, end, board) => {
    const deltaX = Math.sign(end.x - start.x);
    const deltaY = Math.sign(end.y - start.y);

    let x = start.x + deltaX;
    let y = start.y + deltaY;

    while (x !== end.x || y !== end.y) {
        if (board[y][x]) {
            return false; // Path is blocked
        }
        x += deltaX;
        y += deltaY;
    }

    return true; // Path is clear
};

const getLegalMoves = (piece, position, board) => {
    if (!piece) return [];

    const { type, color } = piece;
    const potentialMoves = pieceMovePatterns[type](position.x, position.y, color);

    const legalMoves = potentialMoves.filter(move => {
        // Ensure the move is within bounds
        if (move.x < 0 || move.x >= 8 || move.y < 0 || move.y >= 8) {
            return false;
        }

        const targetSquare = board[move.y][move.x];

        // Allow capturing opponent pieces
        if (targetSquare && targetSquare.color !== color) {
            return true;
        }

        // Prevent capturing your own pieces
        if (targetSquare && targetSquare.color === color) {
            return false;
        }

        // Prevent moving through other pieces (except for knights)
        if (type !== 'knight' && targetSquare === null) {
            const pathClear = isPathClear(position, move, board);
            if (!pathClear) {
                return false;
            }
        }

        return true;
    });

    return legalMoves;
};

const movePiece = (board, move) => {
    const { from, to } = move;
    const piece = from.piece;

    if (!piece) return board;

    const newBoard = board.map(row => row.map(square => ({ ...square })));

    newBoard[to.y][to.x].piece = piece;
    newBoard[from.y][from.x].piece = undefined;

    return newBoard;
};

export const getInitialBoard = () => {
    const board = [];

    for (let row = 0; row < 8; row++) {
        const boardRow = [];
        for (let col = 0; col < 8; col++) {
            let piece = null;

            // Place pawns
            if (row === 1) {
                piece = { type: 'pawn', color: 'black', image: '♟' };
            } else if (row === 6) {
                piece = { type: 'pawn', color: 'white', image: '♙' };
            }

            // Place other pieces
            if (row === 0 || row === 7) {
                const color = row === 0 ? 'black' : 'white';
                const images = color === 'black'
                    ? ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
                    : ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
                const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
                piece = { type: pieces[col], color, image: images[col] };
            }

            boardRow.push(piece);
        }
        board.push(boardRow);
    }

    return board;
};

module.exports = {
    getLegalMoves,
    movePiece,
    getInitialBoard
};