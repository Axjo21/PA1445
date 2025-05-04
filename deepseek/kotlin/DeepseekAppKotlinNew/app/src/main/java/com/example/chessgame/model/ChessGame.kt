package com.example.chessgame

import com.example.chessgame.MoveValidator.isValidMove

// ChessGame.kt
class ChessGame {
    private val board = Array(8) { arrayOfNulls<ChessPiece>(8) }
    private var currentTurn = ChessPiece.PieceColor.WHITE
    private var selectedPiece: ChessPiece? = null

    init {
        initializeBoard()
    }

    private fun initializeBoard() {
        // Initialize pawns
        for (x in 0..7) {
            board[1][x] = ChessPiece(ChessPiece.PieceType.PAWN, ChessPiece.PieceColor.BLACK, Position(x, 1))
            board[6][x] = ChessPiece(ChessPiece.PieceType.PAWN, ChessPiece.PieceColor.WHITE, Position(x, 6))
        }

        // Initialize rooks
        board[0][0] = ChessPiece(ChessPiece.PieceType.ROOK, ChessPiece.PieceColor.BLACK, Position(0, 0))
        board[0][7] = ChessPiece(ChessPiece.PieceType.ROOK, ChessPiece.PieceColor.BLACK, Position(7, 0))
        board[7][0] = ChessPiece(ChessPiece.PieceType.ROOK, ChessPiece.PieceColor.WHITE, Position(0, 7))
        board[7][7] = ChessPiece(ChessPiece.PieceType.ROOK, ChessPiece.PieceColor.WHITE, Position(7, 7))

        // Initialize knights
        board[0][1] = ChessPiece(ChessPiece.PieceType.KNIGHT, ChessPiece.PieceColor.BLACK, Position(1, 0))
        board[0][6] = ChessPiece(ChessPiece.PieceType.KNIGHT, ChessPiece.PieceColor.BLACK, Position(6, 0))
        board[7][1] = ChessPiece(ChessPiece.PieceType.KNIGHT, ChessPiece.PieceColor.WHITE, Position(1, 7))
        board[7][6] = ChessPiece(ChessPiece.PieceType.KNIGHT, ChessPiece.PieceColor.WHITE, Position(6, 7))

        // Initialize bishops
        board[0][2] = ChessPiece(ChessPiece.PieceType.BISHOP, ChessPiece.PieceColor.BLACK, Position(2, 0))
        board[0][5] = ChessPiece(ChessPiece.PieceType.BISHOP, ChessPiece.PieceColor.BLACK, Position(5, 0))
        board[7][2] = ChessPiece(ChessPiece.PieceType.BISHOP, ChessPiece.PieceColor.WHITE, Position(2, 7))
        board[7][5] = ChessPiece(ChessPiece.PieceType.BISHOP, ChessPiece.PieceColor.WHITE, Position(5, 7))

        // Initialize queens
        board[0][3] = ChessPiece(ChessPiece.PieceType.QUEEN, ChessPiece.PieceColor.BLACK, Position(3, 0))
        board[7][3] = ChessPiece(ChessPiece.PieceType.QUEEN, ChessPiece.PieceColor.WHITE, Position(3, 7))

        // Initialize kings
        board[0][4] = ChessPiece(ChessPiece.PieceType.KING, ChessPiece.PieceColor.BLACK, Position(4, 0))
        board[7][4] = ChessPiece(ChessPiece.PieceType.KING, ChessPiece.PieceColor.WHITE, Position(4, 7))
    }

    fun getPieceAt(position: Position): ChessPiece? {
        if (position.x !in 0..7 || position.y !in 0..7) return null
        return board[position.y][position.x]
    }

    fun selectPiece(position: Position): Boolean {
        val piece = getPieceAt(position) ?: return false
        if (piece.color != currentTurn) return false
        selectedPiece = piece
        return true
    }

    fun moveSelectedPiece(toPosition: Position): Boolean {
        val piece = selectedPiece ?: return false

        // Check if move is valid for this piece type
        if (!isValidMove(piece, toPosition, this)) {
            return false
        }

        // Execute the move
        board[piece.position.y][piece.position.x] = null
        board[toPosition.y][toPosition.x] = piece
        piece.position = toPosition

        // Switch turns
        currentTurn = if (currentTurn == ChessPiece.PieceColor.WHITE)
            ChessPiece.PieceColor.BLACK
        else
            ChessPiece.PieceColor.WHITE

        selectedPiece = null
        return true
    }

    fun getBoardState(): Array<Array<ChessPiece?>> {
        return board
    }

    fun getCurrentTurn(): ChessPiece.PieceColor {
        return currentTurn
    }
}