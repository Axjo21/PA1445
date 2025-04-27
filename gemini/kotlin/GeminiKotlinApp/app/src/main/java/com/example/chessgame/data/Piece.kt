package com.example.chessgame.data

// Represents the two colors in chess
enum class Player {
    WHITE, BLACK
}

// Represents the different types of chess pieces
enum class PieceType {
    PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING
}

// Represents a single chess piece with its type and color
data class Piece(
    val type: PieceType,
    val player: Player
) {
    // Simple text representation for display (can be replaced with images later)
    val symbol: String = when (player) {
        Player.WHITE -> when (type) {
            PieceType.PAWN -> "♙"
            PieceType.ROOK -> "♖"
            PieceType.KNIGHT -> "♘"
            PieceType.BISHOP -> "♗"
            PieceType.QUEEN -> "♕"
            PieceType.KING -> "♔"
        }
        Player.BLACK -> when (type) {
            PieceType.PAWN -> "♟︎"
            PieceType.ROOK -> "♜"
            PieceType.KNIGHT -> "♞"
            PieceType.BISHOP -> "♝"
            PieceType.QUEEN -> "♛"
            PieceType.KING -> "♚"
        }
    }
}
