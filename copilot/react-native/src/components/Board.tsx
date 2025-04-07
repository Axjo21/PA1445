import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';
import { initializeBoard, movePiece } from '../utils/chessLogic';
import { PieceType, SquareType } from '../types';

const Board = () => {
    const [board, setBoard] = useState<SquareType[][]>(initializeBoard());
    const [selectedPiece, setSelectedPiece] = useState<PieceType | null>(null);
    const [selectedSquare, setSelectedSquare] = useState<number[]>([]);

    const handleSquarePress = (row: number, col: number) => {
        const piece = board[row][col].piece;
        if (selectedPiece) {
            const newBoard = movePiece(
                { row: selectedSquare[0], col: selectedSquare[1] }, // From position
                { row, col }, // To position
                board
            );
            setBoard(newBoard);
            setSelectedPiece(null);
            setSelectedSquare([]);
        } else if (piece) {
            setSelectedPiece(piece);
            setSelectedSquare([row, col]);
        }
    };

    return (
        <View style={styles.board}>
            {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((square, colIndex) => (
                        <Square
                            key={colIndex}
                            piece={square.piece}
                            onPress={() => handleSquarePress(rowIndex, colIndex)}
                            isSelected={selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0d9b5',
    },
    row: {
        flexDirection: 'row',
    },
});

export default Board;