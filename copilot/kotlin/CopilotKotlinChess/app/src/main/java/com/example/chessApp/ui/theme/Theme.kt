package com.example.chessApp.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

@Composable
fun ChessTheme(content: @Composable () -> Unit) {
    MaterialTheme {
        content()
    }
}