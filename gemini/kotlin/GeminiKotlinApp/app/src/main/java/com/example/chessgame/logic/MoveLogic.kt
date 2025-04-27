package com.example.chessgame.logic

import com.example.chessgame.data.Piece
import com.example.chessgame.data.PieceType
import com.example.chessgame.data.Player
import com.example.chessgame.data.Position

// Main function to get legal moves for a given piece
fun calculateLegalMoves(
    position: Position,
    piece: Piece,
    board: Map<Position, Piece>
): Set<Position> {
    return when (piece.type) {
        PieceType.PAWN -> getPawnMoves(position, piece.player, board)
        PieceType.ROOK -> getRookMoves(position, piece.player, board)
        PieceType.KNIGHT -> getKnightMoves(position, piece.player, board)
        PieceType.BISHOP -> getBishopMoves(position, piece.player, board)
        PieceType.QUEEN -> getQueenMoves(position, piece.player, board)
        PieceType.KING -> getKingMoves(position, piece.player, board)
    }
}

// --- Helper Functions for Specific Pieces ---

private fun getPawnMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>
): Set<Position> {
    val moves = mutableSetOf<Position>()
    val direction = if (player == Player.WHITE) 1 else -1 // White moves up (row increases), Black moves down
    val startRow = if (player == Player.WHITE) 1 else 6

    // 1. Move forward one square
    val oneStep = Position(position.row + direction, position.col)
    if (oneStep.isValid() && board[oneStep] == null) {
        moves.add(oneStep)
        // 2. Move forward two squares (only from starting row)
        if (position.row == startRow) {
            val twoSteps = Position(position.row + 2 * direction, position.col)
            if (twoSteps.isValid() && board[twoSteps] == null) {
                moves.add(twoSteps)
            }
        }
    }

    // 3. Capture diagonally
    val captureOffsets = listOf(-1, 1) // Left and right columns
    for (offset in captureOffsets) {
        val capturePos = Position(position.row + direction, position.col + offset)
        if (capturePos.isValid()) {
            val pieceAtCapture = board[capturePos]
            if (pieceAtCapture != null && pieceAtCapture.player != player) {
                moves.add(capturePos)
            }
        }
    }
    // Note: En passant is not implemented here

    return moves
}

private fun getRookMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>
): Set<Position> {
    return getSlidingMoves(position, player, board, listOf(Pair(0, 1), Pair(0, -1), Pair(1, 0), Pair(-1, 0)))
}

private fun getBishopMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>
): Set<Position> {
    return getSlidingMoves(position, player, board, listOf(Pair(1, 1), Pair(1, -1), Pair(-1, 1), Pair(-1, -1)))
}

private fun getQueenMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>
): Set<Position> {
    // Queen moves like a Rook and a Bishop combined
    return getRookMoves(position, player, board) + getBishopMoves(position, player, board)
}

private fun getKnightMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>
): Set<Position> {
    val moves = mutableSetOf<Position>()
    // All 8 possible L-shaped moves for a knight
    val offsets = listOf(
        Pair(1, 2), Pair(1, -2), Pair(-1, 2), Pair(-1, -2),
        Pair(2, 1), Pair(2, -1), Pair(-2, 1), Pair(-2, -1)
    )

    for ((dr, dc) in offsets) {
        val targetPos = Position(position.row + dr, position.col + dc)
        if (targetPos.isValid()) {
            val pieceAtTarget = board[targetPos]
            // Can move if the square is empty or contains an opponent's piece
            if (pieceAtTarget == null || pieceAtTarget.player != player) {
                moves.add(targetPos)
            }
        }
    }
    return moves
}

private fun getKingMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>
): Set<Position> {
    val moves = mutableSetOf<Position>()
    // King can move one square in any direction
    val offsets = listOf(
        Pair(0, 1), Pair(0, -1), Pair(1, 0), Pair(-1, 0), // Horizontal/Vertical
        Pair(1, 1), Pair(1, -1), Pair(-1, 1), Pair(-1, -1)  // Diagonal
    )

    for ((dr, dc) in offsets) {
        val targetPos = Position(position.row + dr, position.col + dc)
        if (targetPos.isValid()) {
            val pieceAtTarget = board[targetPos]
            // Can move if the square is empty or contains an opponent's piece
            if (pieceAtTarget == null || pieceAtTarget.player != player) {
                moves.add(targetPos)
            }
        }
    }
    // Note: Castling and Check detection are not implemented here
    return moves
}


// Helper function for sliding pieces (Rook, Bishop, Queen)
private fun getSlidingMoves(
    position: Position,
    player: Player,
    board: Map<Position, Piece>,
    directions: List<Pair<Int, Int>> // List of (row_change, col_change) for directions
): Set<Position> {
    val moves = mutableSetOf<Position>()

    for ((dr, dc) in directions) {
        var currentRow = position.row + dr
        var currentCol = position.col + dc

        while (currentRow in 0..7 && currentCol in 0..7) {
            val currentPos = Position(currentRow, currentCol)
            val pieceAtCurrent = board[currentPos]

            if (pieceAtCurrent == null) {
                // Empty square, add to moves and continue in this direction
                moves.add(currentPos)
            } else {
                // Square is occupied
                if (pieceAtCurrent.player != player) {
                    // Opponent's piece, can capture, add to moves but stop searching further
                    moves.add(currentPos)
                }
                // Own piece, cannot move here, stop searching further
                break // Stop searching in this direction
            }

            // Move to the next square in the same direction
            currentRow += dr
            currentCol += dc
        }
    }
    return moves
}
