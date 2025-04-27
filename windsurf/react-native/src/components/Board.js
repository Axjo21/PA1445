import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';
import { initialBoard, getPossibleMoves } from '../gameLogic';

export default function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState('white');

  function handleSelect(row, col) {
    const piece = board[row][col];
    // If selecting own piece
    if (piece && piece.color === turn) {
      setSelected({ row, col });
      return;
    }

    // If moving to empty square or capturing
    if (selected) {
      const from = selected;
      const moves = getPossibleMoves(board, from.row, from.col);
      const legal = moves.some(m => m.row === row && m.col === col);
      if (legal) {
        const newBoard = board.map(r => r.slice());
        newBoard[row][col] = { ...board[from.row][from.col] };
        newBoard[from.row][from.col] = null;
        setBoard(newBoard);
        setSelected(null);
        setTurn(turn === 'white' ? 'black' : 'white');
      }
    }
  }

  return (
    <View style={styles.board}>
      {board.map((rowArr, row) => (
        <View key={row} style={styles.row}>
          {rowArr.map((piece, col) => (
            <Square
              key={col}
              piece={piece}
              row={row}
              col={col}
              selected={selected && selected.row === row && selected.col === col}
              onSelect={handleSelect}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 320,
    height: 320,
    backgroundColor: '#000',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
