package com.example.chessapp.model

data class ChessPiece(val symbol: String) {
    val isWhite: Boolean
        get() = symbol.uppercase() == symbol
}


fun createInitialBoard(): Array<Array<ChessPiece?>> {
    return arrayOf(
        arrayOf(
            ChessPiece("♜"), ChessPiece("♞"), ChessPiece("♝"), ChessPiece("♛"),
            ChessPiece("♚"), ChessPiece("♝"), ChessPiece("♞"), ChessPiece("♜")
        ),
        Array(8) { ChessPiece("♟") },
        Array(8) { null },
        Array(8) { null },
        Array(8) { null },
        Array(8) { null },
        Array(8) { ChessPiece("♙") },
        arrayOf(
            ChessPiece("♖"), ChessPiece("♘"), ChessPiece("♗"), ChessPiece("♕"),
            ChessPiece("♔"), ChessPiece("♗"), ChessPiece("♘"), ChessPiece("♖")
        )
    )
}