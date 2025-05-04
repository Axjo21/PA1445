// components/Board.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Piece from './Piece';

const Board = ({ board, onPiecePress }) => {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          return (
            <View
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.square,
                { backgroundColor: isDark ? '#769656' : '#eeeed2' },
              ]}
            >
              {piece && (
                <Piece
                  piece={piece}
                  position={{ row: rowIndex, col: colIndex }}
                  onPress={onPiecePress}
                />
              )}
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
    height: 320,
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Board;
