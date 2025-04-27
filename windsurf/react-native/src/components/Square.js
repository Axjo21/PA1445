import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function Square({ row, col, piece, selected, onSelect }) {
  const isDark = (row + col) % 2 === 1;
  const backgroundColor = selected ? '#fce803' : isDark ? '#769656' : '#eeeed2';

  const pieceSymbols = {
    pawn: '♟',
    rook: '♜',
    knight: '♞',
    bishop: '♝',
    queen: '♛',
    king: '♚',
  };

  return (
    <TouchableOpacity style={[styles.square, { backgroundColor }]} onPress={() => onSelect(row, col)}>
      {piece && (
        <Text style={[styles.piece, { color: piece.color === 'white' ? '#fff' : '#000' }]}> 
          {pieceSymbols[piece.type]}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piece: {
    fontSize: 28,
  },
});
