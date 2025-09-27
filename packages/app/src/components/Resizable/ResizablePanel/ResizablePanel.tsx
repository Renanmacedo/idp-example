import { makeStyles } from "@material-ui/core"
import { useResizable } from "../hooks/useResizable"
import { useRef } from "react"
import { ResizableHandle } from "./ResizableHandle"
import type { ResizableProps } from "../types"

const useStyles = makeStyles(( theme ) => ({
    resizablePanel: {
        position: 'relative',
        width: '100%',
    }
}))
export const ResizablePanel = ({ ...props }: ResizableProps) => {
    const ref = useRef(null);
    const { 
        initialWidth = 284,
        minWidth,
        maxWidth,
        position = 'horizontal',
        onResize,
    } = props;
    
    const { handleMouseDown } = useResizable({
        initialWidth,
        minWidth,
        maxWidth,
        position,
        onResize,
        ref
    });
    
    const classes = useStyles();
    
    return (
        <div 
            ref={ref} 
            className={classes.resizablePanel}            
        >
            <ResizableHandle mouseDown={handleMouseDown} position={position}/>
        </div>
    )
}