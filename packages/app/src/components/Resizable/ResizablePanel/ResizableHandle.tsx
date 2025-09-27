import { styled } from "@material-ui/core";

const Handle = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
}))
export const ResizableHandle = ({ mouseDown, position }: { mouseDown: (e: React.MouseEvent) => void, position: 'vertical' |  'horizontal' }) => {
    const positionStyle = position === 'horizontal' ? { width: '100%', height: '10px', top: 0, bottom: 0, left: 0 } : { width: '10px', height: '100%', top: 0, bottom: 0, right: 0  };

    return (
        <Handle onMouseDown={mouseDown} style={{ 
            cursor: position === 'horizontal' ? 'row-resize' : 'col-resize',
            ...positionStyle,
        }}/>
    );
}