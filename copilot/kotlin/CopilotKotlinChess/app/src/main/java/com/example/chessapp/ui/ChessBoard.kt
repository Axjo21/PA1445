package com.example.chessapp.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.TextStyle
import com.example.chessapp.model.ChessPiece
import com.example.chessapp.model.createInitialBoard
import com.example.chessapp.model.isValidMove
import com.example.chessapp.model.movePiece

@Composable
fun ChessBoard() {
    val board = remember { mutableStateOf(createInitialBoard()) }
    val selectedCell = remember { mutableStateOf<Pair<Int, Int>?>(null) }
    val currentPlayer = remember { mutableStateOf(true) } // true = white's turn, false = black's turn

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        for (row in 0..7) {
            Row {
                for (col in 0..7) {
                    val cell = board.value[row][col]
                    val isSelected = selectedCell.value == Pair(row, col)
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .background(
                                if (isSelected) Color.Yellow
                                else if ((row + col) % 2 == 0) Color(0xFFD3D3D3) // Light Gray
                                else Color(0xFF228B22) // Green
                            )
                            .clickable {
                                if (selectedCell.value == null && cell != null && cell.isWhite == currentPlayer.value) {
                                    // Select a piece if it's the current player's turn
                                    selectedCell.value = Pair(row, col)
                                } else if (selectedCell.value != null) {
                                    val (selectedRow, selectedCol) = selectedCell.value!!
                                    if (isValidMove(board.value, selectedRow, selectedCol, row, col)) {
                                        board.value = movePiece(board.value, selectedRow, selectedCol, row, col)
                                        currentPlayer.value = !currentPlayer.value // Switch turn
                                    }
                                    selectedCell.value = null // Reset selection
                                }
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = cell?.symbol ?: "",
                            style = TextStyle(fontSize = 24.sp)
                        )
                    }
                }
            }
        }
    }
}