package com.example.chess

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.chess.ui.theme.ChessTheme

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
    // Ensure the move is within bounds
    if (fromRow !in 0..7 || fromCol !in 0..7 || toRow !in 0..7 || toCol !in 0..7) return false

    val piece = board[fromRow][fromCol] ?: return false // Ensure there is a piece to move
    val target = board[toRow][toCol]

    // Ensure the target is either empty or an enemy piece
    if (target != null && piece.isWhite == target.isWhite) return false

    // Add specific piece movement rules here (e.g., pawns, rooks, knights, etc.)
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

data class ChessPiece(val symbol: String) {
    val isWhite: Boolean
        get() = symbol.uppercase() == symbol
}