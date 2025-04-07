import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';
import Piece from './Piece';
import { PieceType } from '../types';

interface SquareProps {
  position: string;
  piece: Piece;
  onSquarePress: (position: string) => void;
}

const Square = ({ position, piece, onSquarePress }: SquareProps) => {
  const handlePress = () => {
    onSquarePress(position);
  };

  return (
    <TouchableOpacity style={styles.square} onPress={handlePress}>
      <View style={styles.squareContent}>
        {piece && <Piece piece={piece} onDragEnd={(draggedPiece, position) => console.log(draggedPiece, position)} />}
      </View>
    </TouchableOpacity>
  );
};

export default Square;