import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import Board from './components/Board';
import { getInitialBoard } from './components/initialBoard';
import { getValidMoves } from './components/moveLogic';

const App = () => {
    const [board, setBoard] = useState(getInitialBoard());
    const [selectedPiece, setSelectedPiece] = useState(null); // { row, col, piece }
    const [possibleMoves, setPossibleMoves] = useState([]); // Array of [row, col]
    const [currentPlayer, setCurrentPlayer] = useState('white'); // 'white' or 'black'

    // Memoize the square press handler to avoid unnecessary re-renders
    const handleSquarePress = useCallback((row, col) => {
        const piece = board[row][col];

        if (selectedPiece) {
            // 1. Check if the pressed square is a valid move destination
            const isValidMove = possibleMoves.some(
                move => move[0] === row && move[1] === col
            );

            if (isValidMove) {
                // --- Move the piece ---
                const newBoard = board.map(r => [...r]); // Create a deep copy

                // Place the selected piece in the new square
                newBoard[row][col] = selectedPiece.piece;
                // Empty the original square
                newBoard[selectedPiece.row][selectedPiece.col] = null;

                setBoard(newBoard);
                setSelectedPiece(null); // Clear selection
                setPossibleMoves([]);   // Clear possible moves
                setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white'); // Switch turns

            } else if (piece && piece.color === currentPlayer) {
                // 2. Selected another piece of the current player's color
                const newPossibleMoves = getValidMoves(board, row, col);
                setSelectedPiece({ row, col, piece });
                setPossibleMoves(newPossibleMoves);

            } else {
                // 3. Clicked an invalid square or opponent piece (not a capture)
                setSelectedPiece(null); // Deselect
                setPossibleMoves([]);
            }
        } else {
        // --- No piece currently selected ---
        if (piece && piece.color === currentPlayer) {
            // Select the piece if it belongs to the current player
            const newPossibleMoves = getValidMoves(board, row, col);
            setSelectedPiece({ row, col, piece });
            setPossibleMoves(newPossibleMoves);
        }
        // If clicked empty square or opponent piece, do nothing
        }
    }, [board, selectedPiece, possibleMoves, currentPlayer]); // Dependencies for useCallback

    // Function to reset the game
    const resetGame = () => {
        setBoard(getInitialBoard());
        setSelectedPiece(null);
        setPossibleMoves([]);
        setCurrentPlayer('white');
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>React Native Chess</Text>
        <Text style={styles.turnIndicator}>Current Turn: {currentPlayer.toUpperCase()}</Text>
        <View style={styles.boardContainer}>
            <Board
            board={board}
            onSquarePress={handleSquarePress}
            selectedPiece={selectedPiece}
            possibleMoves={possibleMoves}
            />
        </View>
        <Button title="Reset Game" onPress={resetGame} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee', // Light background for the whole screen
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    turnIndicator: {
        fontSize: 18,
        marginBottom: 10,
    },
    boardContainer: {
        width: '90%', // Adjust width as needed
        maxWidth: 400, // Max width to prevent it getting too large on tablets
        marginBottom: 20,
    },
});

export default App;
