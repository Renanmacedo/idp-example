import { useCallback, useEffect, useRef as useReactRef, useState } from 'react';
import type { Direction, ResizableProps } from '../types';

export function useResizable({
  initialWidth = 300,
  minWidth = 100,
  maxWidth = 800,
  minHeight = 120,
  maxHeight = 600,
  position = 'horizontal',
  onResize,
  ref,
}: ResizableProps & {ref: React.RefObject<HTMLElement>}) {
  const [size, setSize] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [direction, setDirection] = useState<Direction>(null);
  const initialMousePosRef = useReactRef<{ x: number, y: number } | null>(null);
  const previousPosRef = useReactRef<{ x: number, y: number } | null>(null);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !ref.current || !initialMousePosRef.current) return;
    
    let delta: number;
    let currentDirection: Direction = null;
    
    if (position === 'horizontal') { 
            
      delta = e.clientY - initialMousePosRef.current.y;      
      if (previousPosRef.current) {
        if (e.clientY > previousPosRef.current.y) {
          currentDirection = 'down';
        } else if (e.clientY < previousPosRef.current.y) {
          currentDirection = 'up';
        }
      }
      
      initialMousePosRef.current.y = e.clientY;
      
    } else {

      delta = e.clientX - initialMousePosRef.current.x;      
      if (previousPosRef.current) {
        if (e.clientX > previousPosRef.current.x) {
          currentDirection = 'right';
        } else if (e.clientX < previousPosRef.current.x) {
          currentDirection = 'left';
        }
      }
      initialMousePosRef.current.x = e.clientX;
    }
    
    previousPosRef.current = { x: e.clientX, y: e.clientY };
    
    if (currentDirection !== direction) {
      setDirection(currentDirection);
    }
    
    const newSize =  position === "horizontal"  ? Math.max(minHeight, Math.min(size + delta, maxHeight)) : Math.max(minWidth, Math.min(size + delta, maxWidth)); // 

    setSize(newSize);
    
    
    if (onResize) {
      onResize(newSize, currentDirection);
    }
  }, [isResizing, ref, minWidth, maxWidth, position, onResize, size, initialMousePosRef, direction]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    initialMousePosRef.current = null;
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);
  

  const handleMouseDown = useCallback((e: React.MouseEvent | MouseEvent) => {
    e.preventDefault();

    const initialPosition = {
      x: e.clientX,
      y: e.clientY
    };
    
    initialMousePosRef.current = initialPosition;
    previousPosRef.current = initialPosition;
    
    setDirection(null);
    
    
    setIsResizing(true);
    
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    handleMouseDown,
    size,
    isResizing,
    direction,
  };
}
