package com.example.chessapp.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import com.example.chessapp.model.ChessPiece
import com.example.chessapp.model.createInitialBoard
import com.example.chessapp.model.isValidMove
import com.example.chessapp.model.movePiece

@Composable
fun ChessBoard() {
    val board = remember { mutableStateOf(createInitialBoard()) }
    val draggedPiece = remember { mutableStateOf<ChessPiece?>(null) }
    val draggedPosition = remember { mutableStateOf(Offset.Zero) }
    val selectedCell = remember { mutableStateOf<Pair<Int, Int>?>(null) }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Column {
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
                                .pointerInput(Unit) {
                                    detectDragGestures(
                                        onDragStart = {
                                            if (cell != null) {
                                                draggedPiece.value = cell
                                                selectedCell.value = Pair(row, col)
                                            }
                                        },
                                        onDrag = { change, dragAmount ->
                                            change.consume()
                                            draggedPosition.value += dragAmount
                                        },
                                        onDragEnd = {
                                            val (fromRow, fromCol) = selectedCell.value ?: return@detectDragGestures
                                            val toRow = (draggedPosition.value.y / 50).toInt().coerceIn(0, 7)
                                            val toCol = (draggedPosition.value.x / 50).toInt().coerceIn(0, 7)
                                            if (isValidMove(board.value, fromRow, fromCol, toRow, toCol)) {
                                                board.value = movePiece(board.value, fromRow, fromCol, toRow, toCol)
                                            }
                                            draggedPiece.value = null
                                            draggedPosition.value = Offset.Zero
                                            selectedCell.value = null
                                        }
                                    )
                                },
                            contentAlignment = Alignment.Center
                        ) {
                            Text(text = cell?.symbol ?: "")
                        }
                    }
                }
            }
        }

        draggedPiece.value?.let { piece ->
            Box(
                modifier = Modifier
                    .offset { draggedPosition.value.toIntOffset() }
                    .size(50.dp)
                    .background(Color.Red),
                contentAlignment = Alignment.Center
            ) {
                Text(text = piece.symbol)
            }
        }
    }
}

fun Offset.toIntOffset() = androidx.compose.ui.unit.IntOffset(x.toInt(), y.toInt())