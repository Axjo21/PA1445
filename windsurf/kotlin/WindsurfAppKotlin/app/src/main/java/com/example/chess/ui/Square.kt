package com.example.chess.ui

//import androidx.compose.ui.graphics.compositeOver
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.sp
import com.example.chess.model.Piece
import com.example.chess.util.Coords

@Composable
fun Square(
    modifier: Modifier,
    coords: Coords,
    piece: Piece?,
    isSelected: Boolean,
    onClick: (Coords) -> Unit
) {
    val light = Color(0xFFEEEED2)
    val dark  = Color(0xFF769656)
    val selectedTint = Color.Yellow.copy(alpha = 0.4f)

    val baseColor = if ((coords.row + coords.col) % 2 == 0) light else dark
    val squareColor = if (isSelected) selectedTint else baseColor

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(squareColor)
            .clickable { onClick(coords) },
        contentAlignment = Alignment.Center
    ) {
        Text(text = piece?.toString() ?: "", fontSize = 30.sp)
    }
}