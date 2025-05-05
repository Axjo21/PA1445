package com.example.chessapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material3.Text
import com.example.chessapp.ui.theme.ChessTheme
import com.example.chessapp.model.createInitialBoard
import com.example.chessapp.model.isValidMove
import com.example.chessapp.model.movePiece

class ChessGame : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ChessTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ChessBoard()
                }
            }
        }
    }
}

@Composable
fun ChessBoard() {
    val board = remember { mutableStateOf(createInitialBoard()) }
    val selectedCell = remember { mutableStateOf<Pair<Int, Int>?>(null) }

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
                                else if ((row + col) % 2 == 0) Color.LightGray else Color.DarkGray
                            )
                            .clickable {
                                if (selectedCell.value == null && cell != null) {
                                    selectedCell.value = Pair(row, col)
                                } else if (selectedCell.value != null) {
                                    val (selectedRow, selectedCol) = selectedCell.value!!
                                    if (isValidMove(board.value, selectedRow, selectedCol, row, col)) {
                                        board.value = movePiece(board.value, selectedRow, selectedCol, row, col)
                                    }
                                    selectedCell.value = null
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
