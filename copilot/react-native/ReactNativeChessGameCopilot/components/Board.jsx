import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Square from './Square';
import { getInitialBoard, getLegalMoves } from '../utils/chessLogic';

const Board = () => {
    const [board, setBoard] = useState(getInitialBoard());
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [legalMoves, setLegalMoves] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('white');

    const handleSquarePress = (row, col) => {
        const piece = board[row][col];

        // Ensure the selected piece belongs to the current player
        if (piece && piece.color !== currentPlayer) {
            console.log(`It's ${currentPlayer}'s turn.`);
            return;
        }

        if (selectedSquare) {
            const selectedPiece = board[selectedSquare.row][selectedSquare.col];
            const moves = getLegalMoves(selectedPiece, { x: selectedSquare.col, y: selectedSquare.row }, board);
            const isLegalMove = moves.some(move => move.x === col && move.y === row);

            if (isLegalMove) {
                const newBoard = board.map(row => [...row]); // Create a deep copy of the board
                newBoard[row][col] = selectedPiece; // Move the piece
                newBoard[selectedSquare.row][selectedSquare.col] = null; // Clear the original square
                setBoard(newBoard);
                setSelectedSquare(null);
                setLegalMoves([]);

                // Switch to the other player
                setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
            } else {
                console.log('Invalid move');
                setSelectedSquare(null);
                setLegalMoves([]);
            }
        } else if (piece) {
            setSelectedSquare({ row, col });
            setLegalMoves(getLegalMoves(piece, { x: col, y: row }, board));
        }
    };

    return (
        <View>
            <Text style={styles.currentPlayer}>Current Player: {currentPlayer}</Text>
            <View style={styles.board}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((square, colIndex) => (
                            <Square
                                key={colIndex}
                                row={rowIndex}
                                col={colIndex}
                                piece={square}
                                isSelected={selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex}
                                legalMove={legalMoves.some(move => move.row === rowIndex && move.col === colIndex)}
                                onPress={() => handleSquarePress(rowIndex, colIndex)}
                                style={(rowIndex + colIndex) % 2 === 0 ? styles.lightSquare : styles.darkSquare}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        flexDirection: 'column',
        width: '100%',
        aspectRatio: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
    },
    currentPlayer: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    lightSquare: {
        backgroundColor: '#f0d9b5',
        flex: 1,
        aspectRatio: 1,
    },
    darkSquare: {
        backgroundColor: '#b58863',
        flex: 1,
        aspectRatio: 1,
    },
});

export default Board;