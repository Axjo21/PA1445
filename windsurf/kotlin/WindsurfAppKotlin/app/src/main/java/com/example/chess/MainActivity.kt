package com.example.chess

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.example.chess.model.Board
import com.example.chess.ui.ChessBoard

class MainActivity : ComponentActivity() {
    private val board = Board()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { ChessApp(board) }
    }
}

@Composable
fun ChessApp(board: Board) {
    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            ChessBoard(board)
        }
    }
}