package com.example.chessgame

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.dp
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import com.example.chessgame.ui.theme.ChessLightTile
import com.example.chessgame.ui.theme.ChessDarkTile
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.ui.text.capitalize
import androidx.compose.ui.text.intl.Locale

// ChessBoard.kt
@Composable
fun ChessBoard() {
    val game = remember { ChessGame() }
    var boardState by remember { mutableStateOf(game.getBoardState()) }
    var selectedPosition by remember { mutableStateOf<Position?>(null) }
    val squareSize = LocalConfiguration.current.screenWidthDp.dp / 8

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.LightGray),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Current turn: ${
                game.getCurrentTurn().name
                    .lowercase()
                    .replaceFirstChar { it.uppercase() }  // Fixed deprecated capitalize()
            }",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(16.dp)
        )

        Box(
            modifier = Modifier
                .border(2.dp, Color.Black)
        ) {
            // Draw chess board squares
            Canvas(modifier = Modifier.size(squareSize * 8)) {
                for (y in 0..7) {
                    for (x in 0..7) {
                        val isLightSquare = (x + y) % 2 == 0
                        drawRect(
                            color = if (isLightSquare) ChessLightTile else ChessDarkTile,
                            topLeft = Offset(x * squareSize.toPx(), y * squareSize.toPx()),
                            size = Size(squareSize.toPx(), squareSize.toPx())
                        )
                    }
                }
            }

            // Render pieces
            Box(modifier = Modifier.size(squareSize * 8)) {
                for (y in 0..7) {
                    for (x in 0..7) {
                        val position = Position(x, y)
                        val isSelected = selectedPosition == position
                        val piece = boardState[y][x]

                        Box(
                            modifier = Modifier
                                .offset(
                                    x = squareSize * x,
                                    y = squareSize * y
                                )
                                .size(squareSize)
                                .background(
                                    if (isSelected) Color.Green.copy(alpha = 0.5f)
                                    else Color.Transparent
                                )
                                .clickable {
                                    if (piece != null && piece.color == game.getCurrentTurn()) {
                                        selectedPosition = position
                                        game.selectPiece(position)
                                    } else {
                                        if (selectedPosition != null) {
                                            if (game.moveSelectedPiece(position)) {
                                                boardState = game.getBoardState()
                                            }
                                            selectedPosition = null
                                        }
                                    }
                                }
                        ) {
                            piece?.let {
                                ChessPiece(piece = it)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ChessPiece(piece: ChessPiece) {
    val pieceSymbol = when (piece.type) {
        ChessPiece.PieceType.PAWN -> if (piece.color == ChessPiece.PieceColor.WHITE) "♙" else "♟"
        ChessPiece.PieceType.ROOK -> if (piece.color == ChessPiece.PieceColor.WHITE) "♖" else "♜"
        ChessPiece.PieceType.KNIGHT -> if (piece.color == ChessPiece.PieceColor.WHITE) "♘" else "♞"
        ChessPiece.PieceType.BISHOP -> if (piece.color == ChessPiece.PieceColor.WHITE) "♗" else "♝"
        ChessPiece.PieceType.QUEEN -> if (piece.color == ChessPiece.PieceColor.WHITE) "♕" else "♛"
        ChessPiece.PieceType.KING -> if (piece.color == ChessPiece.PieceColor.WHITE) "♔" else "♚"
    }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = pieceSymbol,
            style = MaterialTheme.typography.displayLarge,
            color = if (piece.color == ChessPiece.PieceColor.WHITE) Color.White else Color.Black
        )
    }
}