package com.example.chessApp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.example.chessApp.ui.ChessBoard
import com.example.chessApp.ui.theme.ChessTheme

class ChessGameActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ChessTheme {
                ChessBoard()
            }
        }
    }
}