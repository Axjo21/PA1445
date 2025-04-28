import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ChessSquare from './ChessSquare';
import { INITIAL_BOARD, COLORS } from '../utils/constants';
import { isValidMove, getPieceColor } from '../utils/chessLogic';

const ChessBoard = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(COLORS.WHITE);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquarePress = (row, col) => {
    const piece = board[row][col];

    // If no piece is selected and this square has a piece of current player's color
    if (!selectedSquare && piece && getPieceColor(piece) === currentPlayer) {
      setSelectedSquare({ row, col });
      calculateValidMoves(row, col);
      return;
    }

    // If we have a selected piece and this is a valid move
    if (selectedSquare && validMoves.some(move => move.row === row && move.col === col)) {
      // Make the move
      const newBoard = [...board];
      newBoard[row][col] = newBoard[selectedSquare.row][selectedSquare.col];
      newBoard[selectedSquare.row][selectedSquare.col] = '';
      setBoard(newBoard);

      // Switch player
      setCurrentPlayer(currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
    }

    // Reset selection
    setSelectedSquare(null);
    setValidMoves([]);
  };

  const calculateValidMoves = (fromRow, fromCol) => {
    const moves = [];
    for (let toRow = 0; toRow < 8; toRow++) {
      for (let toCol = 0; toCol < 8; toCol++) {
        if (isValidMove(board, { row: fromRow, col: fromCol }, { row: toRow, col: toCol })) {
          moves.push({ row: toRow, col: toCol });
        }
      }
    }
    setValidMoves(moves);
  };

  const isHighlighted = (row, col) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const isSelected = (row, col) => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((piece, colIndex) => (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              piece={piece}
              onPress={handleSquarePress}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              isSelected={isSelected(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ChessBoard;