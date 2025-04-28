import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PIECE_TYPES, COLORS } from '../utils/constants';

const ChessPiece = ({ piece, isSelected }) => {
  if (!piece) return null;

  const pieceType = piece.toLowerCase();
  const isWhite = piece === piece.toUpperCase();
  const color = isWhite ? COLORS.WHITE : COLORS.BLACK;

  const getPieceSymbol = () => {
    switch (pieceType) {
      case PIECE_TYPES.KING: return isWhite ? '♔' : '♚';
      case PIECE_TYPES.QUEEN: return isWhite ? '♕' : '♛';
      case PIECE_TYPES.ROOK: return isWhite ? '♖' : '♜';
      case PIECE_TYPES.BISHOP: return isWhite ? '♗' : '♝';
      case PIECE_TYPES.KNIGHT: return isWhite ? '♘' : '♞';
      case PIECE_TYPES.PAWN: return isWhite ? '♙' : '♟';
      default: return '';
    }
  };

  return (
    <View style={[styles.piece, isSelected && styles.selected]}>
      <Text style={[styles.pieceText, { color: isWhite ? '#fff' : '#000' }]}>
        {getPieceSymbol()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieceText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    borderRadius: 50,
  },
});

export default ChessPiece;