// No additional imports needed for this file
package com.example.chessgame

// ChessPiece.kt
data class ChessPiece(
    val type: PieceType,
    val color: PieceColor,
    var position: Position
) {
    enum class PieceType {
        PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING
    }

    enum class PieceColor {
        WHITE, BLACK
    }
}

data class Position(val x: Int, val y: Int)