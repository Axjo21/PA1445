package com.example.chessgame

import kotlin.math.abs

// MoveValidator.kt
object MoveValidator {
    fun isValidMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        // Check if the position is within bounds
        if (toPosition.x !in 0..7 || toPosition.y !in 0..7) return false
        
        // Check if the piece is moving to its current position
        if (piece.position == toPosition) return false
        
        return when (piece.type) {
            ChessPiece.PieceType.PAWN -> isValidPawnMove(piece, toPosition, game)
            ChessPiece.PieceType.ROOK -> isValidRookMove(piece, toPosition, game)
            ChessPiece.PieceType.KNIGHT -> isValidKnightMove(piece, toPosition, game)
            ChessPiece.PieceType.BISHOP -> isValidBishopMove(piece, toPosition, game)
            ChessPiece.PieceType.QUEEN -> isValidQueenMove(piece, toPosition, game)
            ChessPiece.PieceType.KING -> isValidKingMove(piece, toPosition, game)
        }
    }
    
    private fun isValidPawnMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        val direction = if (piece.color == ChessPiece.PieceColor.WHITE) -1 else 1
        val startRow = if (piece.color == ChessPiece.PieceColor.WHITE) 6 else 1
        
        // Move forward one square
        if (toPosition.x == piece.position.x && toPosition.y == piece.position.y + direction) {
            return game.getPieceAt(toPosition) == null
        }
        
        // Move forward two squares from starting position
        if (toPosition.x == piece.position.x && piece.position.y == startRow && 
            toPosition.y == piece.position.y + 2 * direction) {
            val intermediatePos = Position(toPosition.x, piece.position.y + direction)
            return game.getPieceAt(toPosition) == null && game.getPieceAt(intermediatePos) == null
        }
        
        // Capture diagonally
        if (Math.abs(toPosition.x - piece.position.x) == 1 && 
            toPosition.y == piece.position.y + direction) {
            val targetPiece = game.getPieceAt(toPosition)
            return targetPiece != null && targetPiece.color != piece.color
        }
        
        return false
    }
    
    private fun isValidRookMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        // Must move in straight line
        if (piece.position.x != toPosition.x && piece.position.y != toPosition.y) {
            return false
        }
        
        // Check if path is clear
        if (piece.position.x == toPosition.x) {
            // Vertical move
            val yRange = if (piece.position.y < toPosition.y) {
                (piece.position.y + 1) until toPosition.y
            } else {
                (toPosition.y + 1) until piece.position.y
            }
            
            for (y in yRange) {
                if (game.getPieceAt(Position(piece.position.x, y)) != null) {
                    return false
                }
            }
        } else {
            // Horizontal move
            val xRange = if (piece.position.x < toPosition.x) {
                (piece.position.x + 1) until toPosition.x
            } else {
                (toPosition.x + 1) until piece.position.x
            }
            
            for (x in xRange) {
                if (game.getPieceAt(Position(x, piece.position.y)) != null) {
                    return false
                }
            }
        }
        
        // Check if destination is empty or has opponent's piece
        val targetPiece = game.getPieceAt(toPosition)
        return targetPiece == null || targetPiece.color != piece.color
    }
    
    private fun isValidKnightMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        val dx = Math.abs(toPosition.x - piece.position.x)
        val dy = Math.abs(toPosition.y - piece.position.y)
        
        // Knight moves in L-shape
        if (!((dx == 1 && dy == 2) || (dx == 2 && dy == 1))) {
            return false
        }
        
        // Check if destination is empty or has opponent's piece
        val targetPiece = game.getPieceAt(toPosition)
        return targetPiece == null || targetPiece.color != piece.color
    }
    
    private fun isValidBishopMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        val dx = toPosition.x - piece.position.x
        val dy = toPosition.y - piece.position.y
        
        // Must move diagonally
        if (Math.abs(dx) != Math.abs(dy)) {
            return false
        }
        
        // Check if path is clear
        val xStep = if (dx > 0) 1 else -1
        val yStep = if (dy > 0) 1 else -1
        var x = piece.position.x + xStep
        var y = piece.position.y + yStep
        
        while (x != toPosition.x && y != toPosition.y) {
            if (game.getPieceAt(Position(x, y)) != null) {
                return false
            }
            x += xStep
            y += yStep
        }
        
        // Check if destination is empty or has opponent's piece
        val targetPiece = game.getPieceAt(toPosition)
        return targetPiece == null || targetPiece.color != piece.color
    }
    
    private fun isValidQueenMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        // Queen combines rook and bishop moves
        return isValidRookMove(piece, toPosition, game) || isValidBishopMove(piece, toPosition, game)
    }
    
    private fun isValidKingMove(piece: ChessPiece, toPosition: Position, game: ChessGame): Boolean {
        val dx = Math.abs(toPosition.x - piece.position.x)
        val dy = Math.abs(toPosition.y - piece.position.y)
        
        // King moves one square in any direction
        if (dx > 1 || dy > 1) {
            return false
        }
        
        // Check if destination is empty or has opponent's piece
        val targetPiece = game.getPieceAt(toPosition)
        return targetPiece == null || targetPiece.color != piece.color
    }
}