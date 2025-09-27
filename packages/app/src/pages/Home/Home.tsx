import { Content, InfoCard, PageWithHeader } from "@backstage/core-components"
import { Card, CardContent, Grid, styled, Typography } from "@material-ui/core";
import { ResizablePanel } from "../../components/Resizable/ResizablePanel/ResizablePanel";
import { useState } from "react";
import { Direction } from "../../components/Resizable/types";
import { Card as CardPermission } from "../../components/Card";
const WrapperContent = styled(Content)({
    height: '100%',
})
const WrapperCard = styled(InfoCard)({})

const initialWidth = 284;


export const Home = () => {
    const [size, setSize] = useState(initialWidth);
    const [height, setHeigth] = useState<string | number>(120);
    const [direction, setDirection] = useState<Direction>(null);

    return (
        <PageWithHeader themeId="home" title="Bem vindo, Renan" style={{ height: 'auto' }}>
            <WrapperContent>
                    <Typography variant="body1" gutterBottom>
                        Actions items
                    </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={3}>
                        <CardPermission>
                            
                        </CardPermission>
                        <Card>
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    Bem vindo ao Backstage
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    Bem vindo ao Backstage
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    Bem vindo ao Backstage
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="body1" component="p">
                                    Bem vindo ao Backstage
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                
                </Grid> { /* <!-- top cards --> */}
                <div style={{ display: 'flex'}}>

                    <div style={{ minHeight: 120, height: `${height}px`, display: 'grid', gridTemplateColumns: `${size}px 10px 284px`, marginTop: 10 }}>
                        <div>
                            <WrapperCard title="Card Title" >
                                Card about something important.
                            </WrapperCard>
                        </div>
                        <ResizablePanel onResize={(size, direction) => { 
                            setSize(size);
                            setDirection(direction);
                            console.log(`Resizing: ${size}px, Direction: ${direction}`);
                        }} position="vertical"/>
                        <div >
                            <WrapperCard title="Card Title">
                                Card about something important.
                            </WrapperCard>
                        </div>
                    </div>
                </div> 
                <ResizablePanel position="horizontal" initialWidth={120} onResize={(size, direction) => {
                    setHeigth(size);
                    console.log(`Resizing: ${size}px, Direction: ${direction}`);
                }}/>
                <div style={{ display: 'flex' }}>

                    <div style={{ minHeight: 120, height: `${height}px`, display: 'grid', gridTemplateColumns: `${size}px 10px 284px`, marginTop: 10 }}>
                        
                            <WrapperCard title="Card Title" >
                                Card about something important.
                            </WrapperCard>
                        <ResizablePanel onResize={(size, direction) => { 
                            setSize(size);
                            setDirection(direction);
                            console.log(`Resizing: ${size}px, Direction: ${direction}`);
                        }} position="horizontal"/>
                        
                            <WrapperCard title="Card Title">
                                Card about something important.
                            </WrapperCard>
                        
                    </div>
                </div>
            </WrapperContent>

        </PageWithHeader>
    );
}