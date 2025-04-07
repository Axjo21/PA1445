// react_native_chess/Game.js
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';

const BOARD_SIZE = Dimensions.get('window').width;
const TILE_SIZE = BOARD_SIZE / 8;

const initialBoard = () => {
  const emptyRow = Array(8).fill(null);
  const board = Array(8).fill().map(() => [...emptyRow]);

  const setupRow = (color, row) => {
    board[row] = [
      `${color}R`, `${color}N`, `${color}B`, `${color}Q`, `${color}K`, `${color}B`, `${color}N`, `${color}R`
    ];
  };

  const setupPawns = (color, row) => {
    board[row] = Array(8).fill(`${color}P`);
  };

  setupRow('b', 0);
  setupPawns('b', 1);
  setupPawns('w', 6);
  setupRow('w', 7);

  return board;
};

const Game = () => {
  const [board, setBoard] = useState(initialBoard());
  const [dragPiece, setDragPiece] = useState(null);
  const [position, setPosition] = useState(new Animated.ValueXY());
  const [dragStart, setDragStart] = useState(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gesture) => {
      const x = Math.floor(gesture.x0 / TILE_SIZE);
      const y = Math.floor(gesture.y0 / TILE_SIZE);
      const piece = board[y][x];
      if (piece) {
        setDragPiece(piece);
        setDragStart({ x, y });
        setPosition(new Animated.ValueXY({
          x: x * TILE_SIZE,
          y: y * TILE_SIZE,
        }));
      }
    },
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      if (!dragPiece || !dragStart) return;
      const toX = Math.floor((gesture.moveX) / TILE_SIZE);
      const toY = Math.floor((gesture.moveY) / TILE_SIZE);
      const fromX = dragStart.x;
      const fromY = dragStart.y;

      if (isLegalMove(dragPiece, fromX, fromY, toX, toY, board)) {
        const newBoard = board.map(row => [...row]);
        newBoard[toY][toX] = dragPiece;
        newBoard[fromY][fromX] = null;
        setBoard(newBoard);
      }

      setDragPiece(null);
      setDragStart(null);
      setPosition(new Animated.ValueXY());
    },
  });

  const isLegalMove = (piece, fromX, fromY, toX, toY, board) => {
    if (fromX === toX && fromY === toY) return false;
    const target = board[toY][toX];
    if (target && target[0] === piece[0]) return false; // can't capture own piece
    return true; // stub logic - extend this for actual movement rules
  };

  return (
    <View style={styles.board} {...panResponder.panHandlers}>
      {board.map((row, y) =>
        row.map((cell, x) => (
          <View
            key={`${x}-${y}`}
            style={[styles.tile, (x + y) % 2 === 0 ? styles.white : styles.black]}
          >
            {cell && (!dragPiece || dragStart?.x !== x || dragStart?.y !== y) && (
              <View style={styles.piece}>
                <Animated.Text style={styles.pieceText}>{cell[1]}</Animated.Text>
              </View>
            )}
          </View>
        ))
      )}
      {dragPiece && (
        <Animated.View style={[styles.piece, styles.dragPiece, position.getLayout()]}> 
          <Animated.Text style={styles.pieceText}>{dragPiece[1]}</Animated.Text>
        </Animated.View>
      )}
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
  white: {
    backgroundColor: '#EEE',
  },
  black: {
    backgroundColor: '#555',
  },
  piece: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragPiece: {
    position: 'absolute',
    zIndex: 10,
  },
  pieceText: {
    fontSize: 32,
    color: '#000',
  },
});

export default Game;
