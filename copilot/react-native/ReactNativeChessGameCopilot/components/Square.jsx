import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ piece, isSelected, legalMove, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[style, isSelected && styles.selected, legalMove && styles.legalMove]}
            onPress={onPress}
        >
            {piece && <Text style={styles.piece}>{piece.type[0].toUpperCase()}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    selected: {
        borderWidth: 2,
        borderColor: 'blue',
    },
    legalMove: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
    },
    piece: {
        fontSize: 24,
        textAlign: 'center',
    },
});

export default Square;