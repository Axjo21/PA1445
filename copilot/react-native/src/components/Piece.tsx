import React from 'react';
import { View, Image, PanResponder } from 'react-native';
import { PieceType } from '../types';

interface PieceProps {
  piece: PieceType;
  onDragEnd: (piece: PieceType, position: { x: number; y: number }) => void;
}

const Piece: React.FC<PieceProps> = ({ piece, onDragEnd }) => {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Handle piece movement during drag
      },
      onPanResponderRelease: (evt, gestureState) => {
        const position = { x: gestureState.moveX, y: gestureState.moveY };
        onDragEnd(piece, position);
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={{ position: 'absolute', left: piece.position.x, top: piece.position.y }}
    >
      <Image source={piece.image} style={{ width: 50, height: 50 }} />
    </View>
  );
};

export default Piece;