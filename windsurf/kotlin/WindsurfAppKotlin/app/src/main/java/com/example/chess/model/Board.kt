package com.example.chess.model

import com.example.chess.util.Coords

/** 8×8 board; squares without a piece contain null */
typealias Squares = Array<Array<Piece?>>

class Board {

    var currentPlayer = PieceColor.WHITE
        private set

    private var squares: Squares = createStartPosition()

    fun at(c: Coords): Piece? = squares[c.row][c.col]

    /** Attempt to move; returns true if the move was legal and performed. */
    fun tryMove(from: Coords, to: Coords): Boolean {
        val piece = at(from) ?: return false
        if (piece.color != currentPlayer) return false
        if (!MoveRules.isLegal(this, piece, from, to)) return false

        // perform move
        squares[to.row][to.col] = piece
        squares[from.row][from.col] = null
        currentPlayer = currentPlayer.opposite()
        return true
    }

    fun allSquares(): Squares = squares.map { it.clone() }.toTypedArray()

    private fun createStartPosition(): Squares = arrayOf(
        arrayOf(                              // row 0 – Black back rank
            Piece(PieceType.ROOK,   PieceColor.BLACK),
            Piece(PieceType.KNIGHT, PieceColor.BLACK),
            Piece(PieceType.BISHOP, PieceColor.BLACK),
            Piece(PieceType.QUEEN,  PieceColor.BLACK),
            Piece(PieceType.KING,   PieceColor.BLACK),
            Piece(PieceType.BISHOP, PieceColor.BLACK),
            Piece(PieceType.KNIGHT, PieceColor.BLACK),
            Piece(PieceType.ROOK,   PieceColor.BLACK)
        ),
        Array(8) { Piece(PieceType.PAWN, PieceColor.BLACK) },   // row 1 – Black pawns
        Array(8) { null },                                      // rows 2-5 empty
        Array(8) { null },
        Array(8) { null },
        Array(8) { null },
        Array(8) { Piece(PieceType.PAWN, PieceColor.WHITE) },   // row 6 – White pawns
        arrayOf(                              // row 7 – White back rank
            Piece(PieceType.ROOK,   PieceColor.WHITE),
            Piece(PieceType.KNIGHT, PieceColor.WHITE),
            Piece(PieceType.BISHOP, PieceColor.WHITE),
            Piece(PieceType.QUEEN,  PieceColor.WHITE),
            Piece(PieceType.KING,   PieceColor.WHITE),
            Piece(PieceType.BISHOP, PieceColor.WHITE),
            Piece(PieceType.KNIGHT, PieceColor.WHITE),
            Piece(PieceType.ROOK,   PieceColor.WHITE)
        )
    )

    private fun PieceColor.opposite() =
        if (this == PieceColor.WHITE) PieceColor.BLACK else PieceColor.WHITE
}