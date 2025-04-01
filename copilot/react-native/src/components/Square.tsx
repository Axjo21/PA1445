import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/styles';
import { Piece } from './Piece';

interface SquareProps {
  position: string;
  piece: string | null;
  onSquarePress: (position: string) => void;
}

const Square: React.FC<SquareProps> = ({ position, piece, onSquarePress }) => {
  const handlePress = () => {
    onSquarePress(position);
  };

  return (
    <TouchableOpacity style={styles.square} onPress={handlePress}>
      <View style={styles.squareContent}>
        {piece && <Piece type={piece} />}
      </View>
    </TouchableOpacity>
  );
};

export default Square;