package com.example.chessgame.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.chessgame.data.GameState
import com.example.chessgame.data.Piece
import com.example.chessgame.data.Position

// Colors for the chessboard squares
val lightSquareColor = Color(0xFFF0D9B5)
val darkSquareColor = Color(0xFFB58863)
val selectedSquareColor = Color(0x806A9ED6) // Semi-transparent blue
val legalMoveIndicatorColor = Color(0x803A6A3A) // Semi-transparent dark green

@Composable
fun ChessBoardView(
    gameState: GameState,
    onSquareClick: (Position) -> Unit // Callback when a square is clicked
) {
    // We draw the board from top (row 7) to bottom (row 0)
    // because Column lays out items vertically downwards.
    Column {
        for (row in 7 downTo 0) {
            Row {
                for (col in 0..7) {
                    val position = Position(row, col)
                    val piece = gameState.board[position]
                    val isSelected = position == gameState.selectedPiecePosition
                    val isLegalMove = gameState.legalMoves.contains(position)

                    SquareView(
                        position = position,
                        piece = piece,
                        isSelected = isSelected,
                        isLegalMoveTarget = isLegalMove,
                        onClick = { onSquareClick(position) }
                    )
                }
            }
        }
    }
}

@Composable
fun SquareView(
    position: Position,
    piece: Piece?,
    isSelected: Boolean,
    isLegalMoveTarget: Boolean,
    onClick: () -> Unit
) {
    val squareColor = if ((position.row + position.col) % 2 == 0) darkSquareColor else lightSquareColor
    val indicationColor = when {
        isSelected -> selectedSquareColor
        isLegalMoveTarget && piece == null -> legalMoveIndicatorColor // Show dot for empty legal squares
        else -> Color.Transparent // No indication otherwise
    }
    val borderModifier = if (isLegalMoveTarget && piece != null) {
        Modifier.border(2.dp, legalMoveIndicatorColor) // Border for capturing moves
    } else {
        Modifier
    }


    Box(
        modifier = Modifier
            .size(48.dp) // Size of each square
            .background(squareColor)
            .then(borderModifier) // Apply border if needed
            .clickable(onClick = onClick) // Make the square clickable
            .padding(4.dp), // Padding inside the square
        contentAlignment = Alignment.Center
    ) {
        // Draw the indication layer (selection or legal move dot) underneath the piece
        Box(
            modifier = Modifier
                .matchParentSize()
                .background(indicationColor)
        )

        // Display the piece symbol if a piece exists on this square
        if (piece != null) {
            Text(
                text = piece.symbol,
                fontSize = 32.sp // Adjust size as needed
            )
        }
    }
}
