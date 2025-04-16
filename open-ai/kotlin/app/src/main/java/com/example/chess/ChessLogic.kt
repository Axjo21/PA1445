package com.example.chess

fun createInitialBoard(): Array<Array<Piece?>> {
    val board = Array(8) { arrayOfNulls<Piece>(8) }

    fun placeRow(row: Int, player: Player) {
        board[row][0] = Piece(PieceType.ROOK, player)
        board[row][1] = Piece(PieceType.KNIGHT, player)
        board[row][2] = Piece(PieceType.BISHOP, player)
        board[row][3] = Piece(PieceType.QUEEN, player)
        board[row][4] = Piece(PieceType.KING, player)
        board[row][5] = Piece(PieceType.BISHOP, player)
        board[row][6] = Piece(PieceType.KNIGHT, player)
        board[row][7] = Piece(PieceType.ROOK, player)
    }

    placeRow(0, Player.BLACK)
    placeRow(7, Player.WHITE)

    for (i in 0..7) {
        board[1][i] = Piece(PieceType.PAWN, Player.BLACK)
        board[6][i] = Piece(PieceType.PAWN, Player.WHITE)
    }

    return board
}

fun isValidMove(piece: Piece, from: Position, to: Position, board: Array<Array<Piece?>>): Boolean {
    val rowDiff = to.row - from.row
    val colDiff = to.col - from.col
    val target = board[to.row][to.col]

    if (target?.player == piece.player) return false

    return when (piece.type) {
        PieceType.PAWN -> {
            val dir = if (piece.player == Player.WHITE) -1 else 1
            val startRow = if (piece.player == Player.WHITE) 6 else 1
            if (colDiff == 0 && target == null) {
                if (rowDiff == dir) return true
                if (from.row == startRow && rowDiff == 2 * dir && board[from.row + dir][from.col] == null) return true
            } else if (kotlin.math.abs(colDiff) == 1 && rowDiff == dir && target != null) {
                return true
            }
            false
        }

        PieceType.ROOK -> {
            if (from.row == to.row) {
                val range = if (from.col < to.col) (from.col + 1 until to.col) else (to.col + 1 until from.col)
                range.all { board[from.row][it] == null }
            } else if (from.col == to.col) {
                val range = if (from.row < to.row) (from.row + 1 until to.row) else (to.row + 1 until from.row)
                range.all { board[it][from.col] == null }
            } else false
        }

        PieceType.KNIGHT -> {
            (kotlin.math.abs(rowDiff) == 2 && kotlin.math.abs(colDiff) == 1) ||
            (kotlin.math.abs(rowDiff) == 1 && kotlin.math.abs(colDiff) == 2)
        }

        PieceType.BISHOP -> {
            if (kotlin.math.abs(rowDiff) != kotlin.math.abs(colDiff)) return false
            val rowStep = if (rowDiff > 0) 1 else -1
            val colStep = if (colDiff > 0) 1 else -1
            var r = from.row + rowStep
            var c = from.col + colStep
            while (r != to.row && c != to.col) {
                if (board[r][c] != null) return false
                r += rowStep
                c += colStep
            }
            true
        }

        PieceType.QUEEN -> {
            isValidMove(Piece(PieceType.ROOK, piece.player), from, to, board) ||
            isValidMove(Piece(PieceType.BISHOP, piece.player), from, to, board)
        }

        PieceType.KING -> {
            kotlin.math.abs(rowDiff) <= 1 && kotlin.math.abs(colDiff) <= 1
        }
    }
}

fun getPieceSymbol(piece: Piece): String {
    return when (piece.type) {
        PieceType.PAWN -> "♙"
        PieceType.ROOK -> "♖"
        PieceType.KNIGHT -> "♘"
        PieceType.BISHOP -> "♗"
        PieceType.QUEEN -> "♕"
        PieceType.KING -> "♔"
    }.let { if (piece.player == Player.BLACK) it.lowercase() else it }
}
