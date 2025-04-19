import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Piece = ({ type, color }) => {
    const pieceImage = require(`../assets/${color}-${type}.png`);

    return (
        <View style={styles.container}>
            <Image source={pieceImage} style={styles.piece} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    piece: {
        width: '100%',
        height: '100%',
    },
});

export default Piece;