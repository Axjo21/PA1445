import { getPieceImage } from './imageMapper';
import { SquareType, Piece, PieceType } from '../types/index';

// export type Piece = {
//     type: PieceType;
//     color: string;
//     image: string;
//     enPassantEligible?: boolean; // Optional property for en passant eligibility
// };

export const isValidMove = (
    piece: Piece,
    from: { row: number; col: number },
    to: { row: number; col: number },
    board: SquareType[][]
): boolean => {
    if (!piece) return false;

    // Example logic for pawn movement
    if (piece.type === 'pawn') {
        const direction = piece.color === 'white' ? -1 : 1;
        const isForwardMove = to.row === from.row + direction && to.col === from.col && !board[to.row][to.col].piece;
        const isCaptureMove = to.row === from.row + direction && Math.abs(to.col - from.col) === 1 && board[to.row][to.col].piece?.color !== piece.color;

        return isForwardMove || isCaptureMove;
    }

    // Logic for rook movement
    if (piece.type === 'rook') {
        const isStraightMove = from.row === to.row || from.col === to.col;
        return isStraightMove && isPathClear(board, from, to);
    }

    // Logic for knight movement
    if (piece.type === 'knight') {
        const rowDiff = Math.abs(from.row - to.row);
        const colDiff = Math.abs(from.col - to.col);
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    // Logic for bishop movement
    if (piece.type === 'bishop') {
        const isDiagonalMove = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
        return isDiagonalMove && isPathClear(board, from, to);
    }

    // Logic for queen movement
    if (piece.type === 'queen') {
        const isStraightMove = from.row === to.row || from.col === to.col;
        const isDiagonalMove = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
        return (isStraightMove || isDiagonalMove) && isPathClear(board, from, to);
    }

    // Logic for king movement
    if (piece.type === 'king') {
        const rowDiff = Math.abs(from.row - to.row);
        const colDiff = Math.abs(from.col - to.col);
        return rowDiff <= 1 && colDiff <= 1;
    }

    return false;
};

export const checkForCheckmate = (board: SquareType[][], currentPlayer: string): boolean => {
    // Check if the current player's king is in check and no valid moves exist
    const kingPosition = findKingPosition(board, currentPlayer);
    if (!kingPosition) return false;

    const isInCheck = isKingInCheck(board, kingPosition, currentPlayer);
    if (!isInCheck) return false;

    const hasValidMoves = hasAnyValidMove(board, currentPlayer);
    return !hasValidMoves;
};

export const handleCastling = (
    kingPosition: { row: number; col: number },
    rookPosition: { row: number; col: number },
    board: SquareType[][]
): void => {
    // Ensure castling conditions are met (king and rook haven't moved, no pieces in between, not in check)
    const isKingSide = rookPosition.col > kingPosition.col;
    const pathClear = isPathClear(board, kingPosition, rookPosition);
    const kingPiece = board[kingPosition.row][kingPosition.col].piece;
    if (!kingPiece) return;

    const notInCheck = !isKingInCheck(board, kingPosition, kingPiece.color);

    if (pathClear && notInCheck) {
        const newKingCol = isKingSide ? kingPosition.col + 2 : kingPosition.col - 2;
        const newRookCol = isKingSide ? kingPosition.col + 1 : kingPosition.col - 1;

        board[kingPosition.row][newKingCol].piece = kingPiece;
        board[kingPosition.row][newRookCol].piece = board[rookPosition.row][rookPosition.col].piece;

        board[kingPosition.row][kingPosition.col].piece = undefined;
        board[rookPosition.row][rookPosition.col].piece = undefined;
    }
};

export const handleEnPassant = (
    pawnPosition: { row: number; col: number },
    targetPosition: { row: number; col: number },
    board: SquareType[][]
): void => {
    const pawn = board[pawnPosition.row][pawnPosition.col].piece;
    if (
        pawn &&
        pawn.type === 'pawn' &&
        'enPassantEligible' in pawn &&
        pawn.enPassantEligible &&
        Math.abs(pawnPosition.col - targetPosition.col) === 1 &&
        !board[targetPosition.row][targetPosition.col].piece
    ) {
        const capturedPawnPosition = { row: pawnPosition.row, col: targetPosition.col };
        board[capturedPawnPosition.row][capturedPawnPosition.col].piece = undefined;
        board[targetPosition.row][targetPosition.col].piece = pawn;
        board[pawnPosition.row][pawnPosition.col].piece = undefined;
    }
};

export const promotePawn = (
    pawnPosition: { row: number; col: number },
    promotionType: string,
    board: SquareType[][]
): void => {
    const validPromotionTypes = ['queen', 'rook', 'bishop', 'knight'];
    if (!validPromotionTypes.includes(promotionType)) {
        throw new Error(`Invalid promotion type: ${promotionType}`);
    }

    const pawn = board[pawnPosition.row][pawnPosition.col].piece;
    if (pawn && pawn.type === 'pawn' && (pawnPosition.row === 0 || pawnPosition.row === 7)) {
        pawn.type = promotionType as PieceType;
        pawn.image = getPieceImage(pawn.type, pawn.color);
    }
};

const isPositionValid = (position: { row: number; col: number }) => {
    return position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8;
};

export const movePiece = (
    from: { row: number; col: number },
    to: { row: number; col: number },
    board: SquareType[][]
): SquareType[][] => {
    if (!isPositionValid(from) || !isPositionValid(to)) {
        throw new Error('Invalid position');
    }

    const piece = board[from.row][from.col].piece;
    if (!piece) {
        throw new Error('No piece at the source position');
    }

    if (isValidMove(piece, from, to, board)) {
        board[to.row][to.col].piece = piece;
        board[from.row][from.col].piece = undefined;

        // Handle special moves
        if (piece.type === 'pawn' && Math.abs(to.row - from.row) === 2) {
            // Mark pawn as eligible for en passant
            (piece as any).enPassantEligible = true; // Ensure enPassantEligible is added dynamically
        } else if (piece.type === 'king' && Math.abs(to.col - from.col) === 2) {
            // Handle castling
            const rookCol = to.col > from.col ? 7 : 0;
            const newRookCol = to.col > from.col ? to.col - 1 : to.col + 1;
            board[to.row][newRookCol].piece = board[to.row][rookCol].piece;
            board[to.row][rookCol].piece = undefined;
        }
    }
    return board; // Ensure the updated board is returned
};

const findKingPosition = (board: SquareType[][], currentPlayer: string): { row: number; col: number } | null => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col].piece;
            if (piece && piece.type === 'king' && piece.color === currentPlayer) {
                return { row, col };
            }
        }
    }
    return null;
};

const isKingInCheck = (board: SquareType[][], kingPosition: { row: number; col: number }, currentPlayer: string): boolean => {
    // Check if any opponent piece can attack the king's position
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col].piece;
            if (piece && piece.color !== currentPlayer) {
                if (isValidMove(piece, { row, col }, kingPosition, board)) {
                    return true;
                }
            }
        }
    }
    return false;
};

const hasAnyValidMove = (board: SquareType[][], currentPlayer: string): boolean => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col].piece;
            if (piece && piece.color === currentPlayer) {
                for (let targetRow = 0; targetRow < 8; targetRow++) {
                    for (let targetCol = 0; targetCol < 8; targetCol++) {
                        if (isValidMove(piece, { row, col }, { row: targetRow, col: targetCol }, board)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
};

const isPathClear = (board: SquareType[][], from: { row: number; col: number }, to: { row: number; col: number }): boolean => {
    if (from.row === to.row && from.col === to.col) {
        return true; // No path to check if the positions are the same
    }

    const rowStep = from.row === to.row ? 0 : from.row < to.row ? 1 : -1;
    const colStep = from.col === to.col ? 0 : from.col < to.col ? 1 : -1;

    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;

    while (currentRow !== to.row || currentCol !== to.col) {
        if (board[currentRow][currentCol].piece) {
            return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
    }

    return true;
};

export const initializeBoard = (): SquareType[][] => {
    const board: SquareType[][] = [];

    for (let row = 0; row < 8; row++) {
        const boardRow: SquareType[] = [];
        for (let col = 0; col < 8; col++) {
            let piece: Piece | undefined = undefined;

            // Place pawns
            if (row === 1) {
                piece = { type: 'pawn', color: 'black', image: getPieceImage('pawn', 'black'), position: { "x": row, "y":  col } };
            } else if (row === 6) {
                piece = { type: 'pawn', color: 'white', image: getPieceImage('pawn', 'white'), position: { "x": row, "y":  col } };
            }

            
            // Place other pieces
            if (row === 0 || row === 7) {
                const color = row === 0 ? 'black' : 'white';
                const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
                piece = { type: pieces[col] as PieceType, color, image: getPieceImage(pieces[col] as PieceType , color), position: { "x": row, "y":  col } };
            }

            boardRow.push({ piece: piece, "x": row, "y":  col });
        }
        board.push(boardRow);
    }

    return board;
};