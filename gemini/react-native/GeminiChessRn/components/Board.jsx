import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

const Board = ({ board, onSquarePress, selectedPiece, possibleMoves }) => {
  // Function to check if a square is a possible move destination
  const isPossibleMove = (row, col) => {
    return possibleMoves.some(move => move[0] === row && move[1] === col);
  };

  return (
    <View style={styles.board}>
      {board.map((rowPieces, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {rowPieces.map((piece, colIndex) => {
            // Determine the square color (alternating pattern)
            const squareColor = (rowIndex + colIndex) % 2 === 0 ? '#F0D9B5' : '#B58863'; // Light/Dark wood colors
            // Check if this square is the currently selected one
            const isSelected = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex;

            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={piece}
                color={squareColor}
                onPress={() => onSquarePress(rowIndex, colIndex)}
                isSelected={isSelected}
                isPossibleMove={isPossibleMove(rowIndex, colIndex)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%', // Take full width available
    aspectRatio: 1, // Ensure the board is square overall
    flexDirection: 'column', // Rows stack vertically
    borderWidth: 1,
    borderColor: '#333',
  },
  row: {
    flex: 1, // Each row takes equal height
    flexDirection: 'row', // Squares arrange horizontally within a row
  },
});

export default Board;
