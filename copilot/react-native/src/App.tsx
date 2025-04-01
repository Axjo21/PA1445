import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Board from './components/Board';
import { initialBoardState } from './utils/chessLogic';

const App = () => {
  const [board, setBoard] = useState(initialBoardState);

  const handleMove = (from: string, to: string) => {
    // Logic to update the board state based on the move
    // This will involve validating the move and updating the state
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Board board={board} onMove={handleMove} />
    </SafeAreaView>
  );
};

export default App;