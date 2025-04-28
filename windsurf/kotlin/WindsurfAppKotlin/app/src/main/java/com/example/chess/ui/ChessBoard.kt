package com.example.chess.ui

import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.chess.model.Board
import com.example.chess.util.Coords

@Composable
fun ChessBoard(board: Board) {
    var selected by remember { mutableStateOf<Coords?>(null) }
    val squares = board.allSquares()   // snapshot for this recomposition

    Column {
        for (row in 0 until 8) {
            Row(Modifier.weight(1f)) {
                for (col in 0 until 8) {
                    Square(
                        modifier = Modifier.weight(1f),
                        coords = Coords(row, col),
                        piece = squares[row][col],
                        isSelected = selected == Coords(row, col),
                        onClick = { coords ->
                            if (selected == null) {
                                if (board.at(coords) != null) selected = coords
                            } else {
                                if (board.tryMove(selected!!, coords)) {
                                    // move succeeded, prepare next turn
                                }
                                selected = null
                            }
                        }
                    )
                }
            }
        }
    }
}