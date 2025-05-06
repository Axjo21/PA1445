package com.example.chessapp.model


fun isValidMove(
    board: Array<Array<ChessPiece?>>,
    fromRow: Int,
    fromCol: Int,
    toRow: Int,
    toCol: Int
): Boolean {
    val piece = board[fromRow][fromCol] ?: return false
    val target = board[toRow][toCol]

    // Ensure the move is within bounds
    if (toRow !in 0..7 || toCol !in 0..7) return false

    // Prevent capturing your own pieces
    if (target != null && piece.isWhite == target.isWhite) return false

    // Add specific piece movement rules here (e.g., pawns, rooks, knights, etc.)
    // For now, allow all moves for simplicity
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