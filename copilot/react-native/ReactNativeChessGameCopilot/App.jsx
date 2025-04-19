import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './components/Board';

const App = () => {
    const [board, setBoard] = useState(initializeBoard());
    const [currentPlayer, setCurrentPlayer] = useState('white');

    const handleMove = (from, to) => {
        const piece = board[from.row][from.col];

        if (!piece) {
            console.log("No piece at the selected square.");
            return;
        }

        // Get legal moves for the selected piece
        const legalMoves = getLegalMoves(piece, { row: from.row, col: from.col });

        // Check if the target square is a legal move
        const isLegalMove = legalMoves.some(
            (move) => move.row === to.row && move.col === to.col
        );

        if (!isLegalMove) {
            console.log("Illegal move.");
            return;
        }

        // Update the board state
        const newBoard = [...board];
        newBoard[to.row][to.col] = piece; // Move the piece to the target square
        newBoard[from.row][from.col] = null; // Clear the original square

        setBoard(newBoard);

        // Switch the current player
        setCurrentPlayer((prevPlayer) => (prevPlayer === "white" ? "black" : "white"));
    };

    return (
        <View style={styles.container}>
            <Board board={board} onMove={handleMove} currentPlayer={currentPlayer} />
        </View>
    );
};

const initializeBoard = () => {
    // Function to set up the initial state of the chessboard
    return [
        [
            { type: 'rook', color: 'black' },
            { type: 'knight', color: 'black' },
            { type: 'bishop', color: 'black' },
            { type: 'queen', color: 'black' },
            { type: 'king', color: 'black' },
            { type: 'bishop', color: 'black' },
            { type: 'knight', color: 'black' },
            { type: 'rook', color: 'black' },
        ],
        Array(8).fill({ type: 'pawn', color: 'black' }),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill(null),
        Array(8).fill({ type: 'pawn', color: 'white' }),
        [
            { type: 'rook', color: 'white' },
            { type: 'knight', color: 'white' },
            { type: 'bishop', color: 'white' },
            { type: 'queen', color: 'white' },
            { type: 'king', color: 'white' },
            { type: 'bishop', color: 'white' },
            { type: 'knight', color: 'white' },
            { type: 'rook', color: 'white' },
        ],
    ];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default App;