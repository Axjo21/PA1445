export interface SquareType {
    piece: PieceType | null;
}

export interface PieceType {
    type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
    color: 'white' | 'black';
    image: any; // Image source
    enPassantEligible?: boolean; // Optional property for pawns
}