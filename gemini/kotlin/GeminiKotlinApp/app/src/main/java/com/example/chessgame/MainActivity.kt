package com.example.chessgame

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.chessgame.data.GameState
import com.example.chessgame.ui.ChessBoardView
import com.example.chessgame.ui.theme.ChessGameTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ChessGameTheme { // Apply your app's theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // Remember the game state across recompositions
                    val gameState = remember { GameState() }

                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("Current Turn: ${gameState.currentPlayer}")
                        ChessBoardView(
                            gameState = gameState,
                            onSquareClick = { position ->
                                // Handle the square click using the GameState's logic
                                gameState.selectSquare(position)
                            }
                        )
                    }
                }
            }
        }
    }
}

// Simple preview function
@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    ChessGameTheme {
        val gameState = remember { GameState() }
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("Current Turn: ${gameState.currentPlayer}")
            ChessBoardView(gameState = gameState, onSquareClick = { gameState.selectSquare(it) })
        }
    }
}
