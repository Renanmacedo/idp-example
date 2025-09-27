export type Direction = 'left' | 'right' | 'up' | 'down' | null;
export type ResizableProps = { 
    initialWidth?: number;    
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    position?: 'vertical' | 'horizontal';
    onResize?: (size: number, direction: Direction) => void;
}