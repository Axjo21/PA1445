const pieceImages = {
    white: {
        pawn: require('../assets/white-pawn.png'),
        rook: require('../assets/white-rook.png'),
        knight: require('../assets/white-knight.png'),
        bishop: require('../assets/white-bishop.png'),
        queen: require('../assets/white-queen.png'),
        king: require('../assets/white-king.png'),
    },
    black: {
        pawn: require('../assets/black-pawn.png'),
        rook: require('../assets/black-rook.png'),
        knight: require('../assets/black-knight.png'),
        bishop: require('../assets/black-bishop.png'),
        queen: require('../assets/black-queen.png'),
        king: require('../assets/black-king.png'),
    },
};

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';

export const getPieceImage = (type: PieceType, color: PieceColor) => {
    return pieceImages[color]?.[type] || null;
};