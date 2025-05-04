// components/Piece.js
import React from 'react';
import { Text, Pressable } from 'react-native';

const pieceSymbols = {
  wp: '♙', bp: '♟︎',
  wr: '♖', br: '♜',
  wn: '♘', bn: '♞',
  wb: '♗', bb: '♝',
  wq: '♕', bq: '♛',
  wk: '♔', bk: '♚',
};


const Piece = ({ piece, position, onPress }) => {
  const symbol = pieceSymbols[piece];

  return (
    <Pressable onPress={() => onPress(position)}>
      <Text style={{ fontSize: 24 }}>{symbol}</Text>
    </Pressable>
  );
};

export default Piece;
