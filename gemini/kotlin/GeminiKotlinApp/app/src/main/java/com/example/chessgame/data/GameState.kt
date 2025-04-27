package com.example.chessgame.data

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue

import com.example.chessgame.logic.calculateLegalMoves



class GameState {
    // Using a MutableMap to store the pieces on the board.
    // The key is the Position, and the value is the Piece.
    // This makes it easy to find, add, or remove pieces.
    var board by mutableStateOf(initialBoardSetup())
        private set // Only GameState can change the board directly

    // Whose turn it is currently
    var currentPlayer by mutableStateOf(Player.WHITE)
        private set

    // Which piece is currently selected by the user (null if none)
    var selectedPiecePosition by mutableStateOf<Position?>(null)
        private set

    // List of valid moves for the selected piece
    var legalMoves by mutableStateOf<Set<Position>>(emptySet())
        private set

    // Function to handle selecting a square
    fun selectSquare(position: Position) {
        val pieceAtSelectedSquare = board[position]
        val currentSelectedPos = selectedPiecePosition

        if (currentSelectedPos == null) {
            // 1. No piece selected yet: Select the piece if it belongs to the current player
            if (pieceAtSelectedSquare != null && pieceAtSelectedSquare.player == currentPlayer) {
                selectedPiecePosition = position
                // Calculate and store legal moves for the selected piece
                legalMoves = calculateLegalMoves(position, pieceAtSelectedSquare, board)
            }
        } else {
            // 2. A piece is already selected
            if (position == currentSelectedPos) {
                // Deselect if the same square is clicked again
                deselectPiece()
            } else if (legalMoves.contains(position)) {
                // Move the piece if the clicked square is a legal move
                movePiece(currentSelectedPos, position)
                // Switch turns after moving
                switchTurn()
                deselectPiece() // Deselect after moving
            } else {
                // Clicked on a different square that is not a legal move
                val pieceAtNewSquare = board[position]
                if (pieceAtNewSquare != null && pieceAtNewSquare.player == currentPlayer) {
                    // If it's another piece of the same player, select the new piece
                    selectedPiecePosition = position
                    legalMoves = calculateLegalMoves(position, pieceAtNewSquare, board)
                } else {
                    // Otherwise, just deselect the current piece
                    deselectPiece()
                }
            }
        }
    }

    // Helper to deselect piece and clear legal moves
    private fun deselectPiece() {
        selectedPiecePosition = null
        legalMoves = emptySet()
    }

    // Function to move a piece from 'from' position to 'to' position
    private fun movePiece(from: Position, to: Position) {
        val piece = board[from] ?: return // Should not happen if logic is correct
        val updatedBoard = board.toMutableMap() // Create a mutable copy
        updatedBoard.remove(from) // Remove piece from original position
        updatedBoard[to] = piece // Place piece in the new position
        board = updatedBoard // Update the state
    }

    // Function to switch the current player
    private fun switchTurn() {
        currentPlayer = if (currentPlayer == Player.WHITE) Player.BLACK else Player.WHITE
    }

    // Initial setup of the chessboard
    companion object {
        fun initialBoardSetup(): Map<Position, Piece> {
            val board = mutableMapOf<Position, Piece>()

            // Add Pawns
            for (col in 0..7) {
                board[Position(1, col)] = Piece(PieceType.PAWN, Player.WHITE)
                board[Position(6, col)] = Piece(PieceType.PAWN, Player.BLACK)
            }

            // Add Rooks
            board[Position(0, 0)] = Piece(PieceType.ROOK, Player.WHITE)
            board[Position(0, 7)] = Piece(PieceType.ROOK, Player.WHITE)
            board[Position(7, 0)] = Piece(PieceType.ROOK, Player.BLACK)
            board[Position(7, 7)] = Piece(PieceType.ROOK, Player.BLACK)

            // Add Knights
            board[Position(0, 1)] = Piece(PieceType.KNIGHT, Player.WHITE)
            board[Position(0, 6)] = Piece(PieceType.KNIGHT, Player.WHITE)
            board[Position(7, 1)] = Piece(PieceType.KNIGHT, Player.BLACK)
            board[Position(7, 6)] = Piece(PieceType.KNIGHT, Player.BLACK)

            // Add Bishops
            board[Position(0, 2)] = Piece(PieceType.BISHOP, Player.WHITE)
            board[Position(0, 5)] = Piece(PieceType.BISHOP, Player.WHITE)
            board[Position(7, 2)] = Piece(PieceType.BISHOP, Player.BLACK)
            board[Position(7, 5)] = Piece(PieceType.BISHOP, Player.BLACK)

            // Add Queens
            board[Position(0, 3)] = Piece(PieceType.QUEEN, Player.WHITE)
            board[Position(7, 3)] = Piece(PieceType.QUEEN, Player.BLACK)

            // Add Kings
            board[Position(0, 4)] = Piece(PieceType.KING, Player.WHITE)
            board[Position(7, 4)] = Piece(PieceType.KING, Player.BLACK)

            return board.toMap() // Return an immutable map
        }
    }
}
