package com.example.chessApp.model

data class ChessPiece(val symbol: String) {
    val isWhite: Boolean
        get() = symbol.uppercase() == symbol
}

fun createInitialBoard(): Array<Array<ChessPiece?>> {
    return arrayOf(
        arrayOf(
            ChessPiece("R"), ChessPiece("N"), ChessPiece("B"), ChessPiece("Q"),
            ChessPiece("K"), ChessPiece("B"), ChessPiece("N"), ChessPiece("R")
        ),
        Array(8) { ChessPiece("P") },
        Array(8) { null },
        Array(8) { null },
        Array(8) { null },
        Array(8) { null },
        Array(8) { ChessPiece("p") },
        arrayOf(
            ChessPiece("r"), ChessPiece("n"), ChessPiece("b"), ChessPiece("q"),
            ChessPiece("k"), ChessPiece("b"), ChessPiece("n"), ChessPiece("r")
        )
    )
}

fun isValidMove(board: Array<Array<ChessPiece?>>, fromRow: Int, fromCol: Int, toRow: Int, toCol: Int): Boolean {
    val piece = board[fromRow][fromCol] ?: return false
    val target = board[toRow][toCol]
    if (target != null && piece.isWhite == target.isWhite) return false
    // Add specific piece movement rules here
    return true
}

fun movePiece(
    board: Array<Array<ChessPiece?>>,
    fromRow: Int,
    fromCol: Int,
    toRow: Int,
    toCol: Int
): Array<Array<ChessPiece?>> {
    val newBoard = board.map { it.copyOf() }.toTypedArray()
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol]
    newBoard[fromRow][fromCol] = null
    return newBoard
}