package com.example.chess.model

import com.example.chess.util.Coords
import kotlin.math.abs

object MoveRules {

    /** Entry point – decides whether [piece] can legally move from [from] to [to] */
    fun isLegal(board: Board, piece: Piece, from: Coords, to: Coords): Boolean {
        if (from == to) return false
        if (board.at(to)?.color == piece.color) return false // can’t capture own

        return when (piece.type) {
            PieceType.PAWN   -> pawn(board, piece, from, to)
            PieceType.KNIGHT -> knight(from, to)
            PieceType.BISHOP -> bishop(board, from, to)
            PieceType.ROOK   -> rook(board, from, to)
            PieceType.QUEEN  -> queen(board, from, to)
            PieceType.KING   -> king(from, to)
        }
    }

    // --- individual pieces ----------------------------------------------------

    private fun pawn(board: Board, piece: Piece, from: Coords, to: Coords): Boolean {
        val dir = if (piece.color == PieceColor.WHITE) -1 else 1
        val startRow = if (piece.color == PieceColor.WHITE) 6 else 1

        val rowDiff = to.row - from.row
        val colDiff = abs(to.col - from.col)

        // move forward
        if (colDiff == 0) {
            if (rowDiff == dir && board.at(to) == null) return true
            if (from.row == startRow && rowDiff == 2 * dir &&
                board.at(to) == null && board.at(Coords(from.row + dir, from.col)) == null
            ) return true
        }
        // capture
        if (colDiff == 1 && rowDiff == dir && board.at(to) != null) return true

        return false
    }

    private fun knight(from: Coords, to: Coords): Boolean =
        (abs(from.row - to.row) == 2 && abs(from.col - to.col) == 1) ||
        (abs(from.row - to.row) == 1 && abs(from.col - to.col) == 2)

    private fun bishop(board: Board, from: Coords, to: Coords): Boolean =
        abs(from.row - to.row) == abs(from.col - to.col) &&
        pathClear(board, from, to)

    private fun rook(board: Board, from: Coords, to: Coords): Boolean =
        (from.row == to.row || from.col == to.col) &&
        pathClear(board, from, to)

    private fun queen(board: Board, from: Coords, to: Coords): Boolean =
        bishop(board, from, to) || rook(board, from, to)

    private fun king(from: Coords, to: Coords): Boolean =
        abs(from.row - to.row) <= 1 && abs(from.col - to.col) <= 1

    // --- helpers --------------------------------------------------------------

    /** true if every square *between* from and to is empty (exclusive) */
    private fun pathClear(board: Board, from: Coords, to: Coords): Boolean {
        var r = from.row + sign(to.row - from.row)
        var c = from.col + sign(to.col - from.col)
        while (r != to.row || c != to.col) {
            if (board.at(Coords(r, c)) != null) return false
            r += sign(to.row - from.row)
            c += sign(to.col - from.col)
        }
        return true
    }

    private fun sign(v: Int): Int = when {
        v > 0  -> 1
        v < 0  -> -1
        else   -> 0
    }
}