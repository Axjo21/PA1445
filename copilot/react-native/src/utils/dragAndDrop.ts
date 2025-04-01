import { PieceType, SquareType } from '../types';

export const onDragStart = (event: React.DragEvent<HTMLDivElement>, piece: PieceType) => {
    event.dataTransfer.setData('piece', JSON.stringify(piece));
};

export const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
};

export const onDrop = (event: React.DragEvent<HTMLDivElement>, targetSquare: SquareType, movePiece: (piece: PieceType, target: SquareType) => void) => {
    event.preventDefault();
    const pieceData = event.dataTransfer.getData('piece');
    const piece: PieceType = JSON.parse(pieceData);

    movePiece(piece, targetSquare);
};