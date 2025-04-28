package com.example.chess.model

enum class PieceType { KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN }
enum class PieceColor { WHITE, BLACK }

data class Piece(
    val type: PieceType,
    val color: PieceColor
) {
    override fun toString(): String =
        when (type) {
            PieceType.KING   -> if (color == PieceColor.WHITE) "♔" else "♚"
            PieceType.QUEEN  -> if (color == PieceColor.WHITE) "♕" else "♛"
            PieceType.ROOK   -> if (color == PieceColor.WHITE) "♖" else "♜"
            PieceType.BISHOP -> if (color == PieceColor.WHITE) "♗" else "♝"
            PieceType.KNIGHT -> if (color == PieceColor.WHITE) "♘" else "♞"
            PieceType.PAWN   -> if (color == PieceColor.WHITE) "♙" else "♟"
        }
}