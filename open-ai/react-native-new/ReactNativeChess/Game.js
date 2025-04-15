import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Animated, Text } from 'react-native';
import Piece from './components/Piece'; // adjust the path if needed

const BOARD_SIZE = Dimensions.get('window').width;
const TILE_SIZE = BOARD_SIZE / 8;

const initialBoard = () => {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));

    const backRank = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

    // Black
    board[0] = backRank.map(piece => `b${piece}`);
    board[1] = Array(8).fill('bP');

    // White
    board[6] = Array(8).fill('wP');
    board[7] = backRank.map(piece => `w${piece}`);

    return board;
};

const Game = () => {
    const [board, setBoard] = useState(initialBoard());
    const [dragPiece, setDragPiece] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [position] = useState(new Animated.ValueXY());
    const [turn, setTurn] = useState('w');

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e, gesture) => {
        const x = Math.floor(gesture.x0 / TILE_SIZE);
        const y = Math.floor(gesture.y0 / TILE_SIZE);
        const piece = board[y][x];
        if (piece) {
            setDragPiece(piece);
            setDragStart({ x, y });
            position.setValue({ x: x * TILE_SIZE, y: y * TILE_SIZE });
        }
        },
        onPanResponderMove: Animated.event(
            [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gesture) => {
        if (!dragPiece || !dragStart) return;

        const toX = Math.floor(gesture.moveX / TILE_SIZE);
        const toY = Math.floor(gesture.moveY / TILE_SIZE);
        const fromX = dragStart.x;
        const fromY = dragStart.y;

        if (isValidMove(dragPiece, fromX, fromY, toX, toY, board)) {
            const newBoard = board.map(row => [...row]);
            newBoard[toY][toX] = dragPiece;
            newBoard[fromY][fromX] = null;
            setBoard(newBoard);
        }

        setDragPiece(null);
        setDragStart(null);
        position.setValue({ x: 0, y: 0 });
        setTurn(turn === 'w' ? 'b' : 'w'); // switch turn

        }
    });
    const cancelDrag = () => {
      setDragPiece(null);
      setDragStart(null);
      position.setValue({ x: 0, y: 0 });
    };

    const isValidMove = (piece, fromX, fromY, toX, toY, board) => {
        if (!inBounds(toX, toY)) return false;
        if (fromX === toX && fromY === toY) return false;

        const target = board[toY][toX];
        if (target && target[0] === piece[0]) return false; // can't capture own piece

        const dx = toX - fromX;
        const dy = toY - fromY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const type = piece[1];
        const color = piece[0];
        const direction = color === 'w' ? -1 : 1;

        switch (type) {
        case 'P':
            if (dx === 0 && dy === direction && !target) return true;
            if (dx === 0 && dy === 2 * direction && fromY === (color === 'w' ? 6 : 1) && !target && !board[fromY + direction][fromX]) return true;
            if (absDx === 1 && dy === direction && target) return true;
            return false;
        case 'R':
            if (dx !== 0 && dy !== 0) return false;
            return clearPath(fromX, fromY, toX, toY, board);
        case 'N':
            return (absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2);
        case 'B':
            if (absDx !== absDy) return false;
            return clearPath(fromX, fromY, toX, toY, board);
        case 'Q':
            if (dx === 0 || dy === 0 || absDx === absDy) return clearPath(fromX, fromY, toX, toY, board);
            return false;
        case 'K':
            return absDx <= 1 && absDy <= 1;
        default:
            return false;
        }
    };

    const clearPath = (fromX, fromY, toX, toY, board) => {
        const stepX = Math.sign(toX - fromX);
        const stepY = Math.sign(toY - fromY);
        let x = fromX + stepX;
        let y = fromY + stepY;
        while (x !== toX || y !== toY) {
        if (board[y][x]) return false;
        x += stepX;
        y += stepY;
        }
        return true;
    };

    const inBounds = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

    return (
        <View style={styles.board} {...panResponder.panHandlers}>
            {board.map((row, y) =>
                row.map((cell, x) => (
                <View key={`${x}-${y}`} style={[styles.tile, (x + y) % 2 === 0 ? styles.white : styles.black]}>
                    {cell && (!dragPiece || dragStart?.x !== x || dragStart?.y !== y) && (
                      <Text style={styles.piece}>{cell[1]}</Text>
                    )}
                </View>
                ))
            )}
            {dragPiece && (
                <Animated.View style={[styles.dragPiece, position.getLayout()]}>
                  <Text style={styles.piece}>{dragPiece[1]}</Text>
                </Animated.View>
            )}
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Turn: {turn === 'w' ? 'White' : 'Black'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    white: { backgroundColor: '#f0d9b5' },
    black: { backgroundColor: '#b58863' },
    piece: {
        fontSize: 32,
        color: '#000',
    },
    dragPiece: {
        position: 'absolute',
        zIndex: 1,
    },
});

export default Game;
