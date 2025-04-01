# React Native Chess Game

This project is a fully functioning chess game built with React Native. It implements all chess rules, drag-and-drop functionality, dynamic board updates, and features an appealing UI with animations.

## Features

- **Complete Chess Rules**: The game adheres to all standard chess rules, including special moves like castling, en passant, and pawn promotion.
- **Drag-and-Drop Functionality**: Players can easily move pieces around the board using intuitive drag-and-drop gestures.
- **Dynamic Board Updates**: The chessboard updates in real-time as pieces are moved, providing immediate feedback to players.
- **Appealing UI**: The game features a visually appealing user interface with custom fonts and animations to enhance the gaming experience.

## Project Structure

```
react-native-chess-game
├── src
│   ├── components
│   │   ├── Board.tsx
│   │   ├── Square.tsx
│   │   └── Piece.tsx
│   ├── utils
│   │   ├── chessLogic.ts
│   │   └── dragAndDrop.ts
│   ├── styles
│   │   └── styles.ts
│   ├── App.tsx
│   └── types
│       └── index.ts
├── assets
│   └── fonts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-native-chess-game.git
   ```
2. Navigate to the project directory:
   ```
   cd react-native-chess-game
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Game

To start the game, run the following command:
```
npm start
```
This will launch the Metro bundler. You can then run the app on an emulator or a physical device.

## Usage

Once the game is running, you can start playing by dragging and dropping pieces on the board. The game will enforce all chess rules and provide feedback on valid and invalid moves.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.