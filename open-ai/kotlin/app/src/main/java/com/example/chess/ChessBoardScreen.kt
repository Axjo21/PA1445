package com.example.chess

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.layout.fillMaxSize

@Composable
fun ChessBoardScreen() {
    var board by remember { mutableStateOf(createInitialBoard()) }
    var selected by remember { mutableStateOf<Position?>(null) }
    var currentPlayer by remember { mutableStateOf(Player.WHITE) }

    Column {
        for (row in 0..7) {
            Row {
                for (col in 0..7) {
                    val piece = board[row][col]
                    val isLight = (row + col) % 2 == 0
                    val backgroundColor = if (isLight) Color(0xFFEEEED2) else Color(0xFF769656)

                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .background(backgroundColor)
                            .clickable {
                                val pos = Position(row, col)
                                if (selected == null && piece?.player == currentPlayer) {
                                    selected = pos
                                } else if (selected != null) {
                                    val movingPiece = board[selected!!.row][selected!!.col]
                                    if (movingPiece != null && isValidMove(movingPiece, selected!!, pos, board)) {
                                        val newBoard = board.map { it.clone() }.toTypedArray()
                                        newBoard[pos.row][pos.col] = movingPiece
                                        newBoard[selected!!.row][selected!!.col] = null
                                        board = newBoard
                                        currentPlayer = if (currentPlayer == Player.WHITE) Player.BLACK else Player.WHITE
                                    }
                                    selected = null
                                }
                            }
                    ) {
                        if (piece != null) {
                            Text(
                                text = getPieceSymbol(piece),
                                modifier = Modifier.padding(8.dp),
                                color = if (piece.player == Player.WHITE) Color.Black else Color.White
                            )
                        }
                    }
                }
            }
        }
    }
}
