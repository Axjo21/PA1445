import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ChessPiece from './ChessPiece';

const ChessSquare = ({
  row,
  col,
  piece,
  onPress,
  isHighlighted,
  isSelected,
}) => {
  const isLight = (row + col) % 2 === 0;
  const backgroundColor = isLight ? '#f0d9b5' : '#b58863';
  const highlightColor = isLight ? '#f7e3a8' : '#d7b373';

  return (
    <TouchableWithoutFeedback onPress={() => onPress(row, col)}>
      <View style={[
        styles.square,
        {
          backgroundColor: isHighlighted ? highlightColor : backgroundColor,
        }
      ]}>
        <ChessPiece piece={piece} isSelected={isSelected} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  square: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChessSquare;