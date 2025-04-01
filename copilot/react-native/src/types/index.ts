export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type ColorType = 'white' | 'black';

export interface Piece {
    type: PieceType;
    color: ColorType;
}

export interface SquareType {
    x: number;
    y: number;
    piece?: Piece;
}

export interface MoveType {
    from: SquareType;
    to: SquareType;
}