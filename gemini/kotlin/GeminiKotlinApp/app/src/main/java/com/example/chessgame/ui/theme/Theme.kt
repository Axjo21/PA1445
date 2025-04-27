package com.example.chessgame.ui.theme // Make sure this package name is correct

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import androidx.compose.material3.Typography // added by me

// Define the ColorScheme for dark theme using the colors from Color.kt
private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80
    // You can override other default colors here as well
    // background = Color(0xFF1C1B1F),
    // surface = Color(0xFF1C1B1F),
    // onPrimary = Color.Black,
    // onSecondary = Color.Black,
    // onTertiary = Color.Black,
    // onBackground = Color(0xFFFFFBFE),
    // onSurface = Color(0xFFFFFBFE),
)

// Define the ColorScheme for light theme using the colors from Color.kt
private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40
    // You can override other default colors here as well
    // background = Color(0xFFFFFBFE),
    // surface = Color(0xFFFFFBFE),
    // onPrimary = Color.White,
    // onSecondary = Color.White,
    // onTertiary = Color.White,
    // onBackground = Color(0xFF1C1B1F),
    // onSurface = Color(0xFF1C1B1F),
)

@Composable
fun ChessGameTheme( // Rename this function if your theme has a different name
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        // Use dynamic colors if available and enabled
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        // Otherwise, use the predefined dark or light color scheme
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    // Set status bar color and appearance
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb() // Or another color like background
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    // Apply the MaterialTheme
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(), // Assumes you have a Typography.kt file defined
        content = content
    )
}
