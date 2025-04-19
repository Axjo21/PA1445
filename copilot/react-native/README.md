# React Native Chess Game

This project is a simple chess game built with React Native. It implements the basic logic for all chess rules and legal moves of all pieces, excluding castling, en passant, pawn promotion, and checkmate detection for now.

## Project Structure

```
react-native-chess-game
├── src
│   ├── components
│   │   ├── Board.tsx        # Renders the chessboard and manages game state
│   │   ├── Square.tsx       # Represents an individual square on the chessboard
│   │   └── Piece.tsx        # Represents a chess piece
│   ├── utils
│   │   └── chessLogic.ts    # Contains chess logic for legal moves and board updates
│   ├── App.tsx              # Main entry point of the application
│   └── types
│       └── index.ts         # TypeScript types and interfaces
├── assets
│   └── README.md            # Information about assets used in the project
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd react-native-chess-game
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   - For Android:
     ```
     npm run android
     ```
   - For iOS:
     ```
     npm run ios
     ```

## Usage

Once the application is running, you will see a chessboard where you can interact with the pieces. Click on a piece to select it, and then click on a valid square to move it according to the rules of chess.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.