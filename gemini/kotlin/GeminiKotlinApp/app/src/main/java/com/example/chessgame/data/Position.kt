package com.example.chessgame.data

// Represents a position on the chessboard (row, column)
// Row 0 is the bottom row (White's side), Row 7 is the top row (Black's side)
// Column 0 is the leftmost column (a-file), Column 7 is the rightmost column (h-file)
data class Position(val row: Int, val col: Int) {
    // Helper to check if a position is within the board boundaries
    fun isValid(): Boolean {
        return row in 0..7 && col in 0..7
    }
}
