package com.example.chess.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// Define your color scheme here (optional, you can modify as per your design)
private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF6200EE), // Example primary color
    secondary = Color(0xFF03DAC6) // Example secondary color
    // Add more colors as needed
)

// Define the typography (optional, can be customized)
private val Typography = androidx.compose.material3.Typography(
    // Define custom typography here if needed
)

@Composable
fun ChessGameTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme, // Use the defined color scheme
        typography = Typography,         // Use the defined typography
        content = content                // Apply the theme to the content
    )
}
