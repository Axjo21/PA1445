import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { pieceSymbols } from './initialBoard'; // Import symbols

const Square = ({ piece, color, onPress, isSelected, isPossibleMove }) => {
  // Determine the background color based on the square's position and state
  const backgroundColor = isSelected
    ? '#6fA8FF' // Blueish for selected square
    : isPossibleMove
    ? '#a8d8a8' // Greenish for possible moves
    : color;    // Default light/dark square color

  // Get the Unicode symbol for the piece, if any
  const symbol = piece ? pieceSymbols[piece.color][piece.type] : '';

  return (
    <TouchableOpacity
      style={[styles.square, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7} // Visual feedback on press
    >
      <Text style={styles.pieceText}>{symbol}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    flex: 1, // Each square takes equal space in a row/column
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1, // Make sure squares are actually square
  },
  pieceText: {
    fontSize: 30, // Adjust size as needed
    // Consider adding color based on piece.color if needed
  },
});

export default Square;
