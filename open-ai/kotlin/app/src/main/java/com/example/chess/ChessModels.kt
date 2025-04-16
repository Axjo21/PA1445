package com.example.chess

enum class PieceType { PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING }
enum class Player { WHITE, BLACK }

data class Piece(val type: PieceType, val player: Player)
data class Position(val row: Int, val col: Int)
