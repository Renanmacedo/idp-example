import { createUnifiedTheme, palettes } from "@backstage/theme";
import { BackstageHeader } from './components';

export const overrideTheme = createUnifiedTheme({
    palette: {
        ...palettes.light
    },
    components: {
        ...BackstageHeader,
        BackstageSidebar: {
            styleOverrides: {
                drawer: ({ theme }) => ({
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.primary.contrastText,
                    boxShadow: theme.shadows[6]
                })
            }
        },
        BackstageSidebarItem: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.light
                }),
                open: ({ theme }) => ({
                    [theme.breakpoints.up('sm')]: {
                      width: 215,
                    },
                }),
                highlightable: ({ theme }) => ({
                    '&:hover':  {
                        backgroundColor: 'transparent',
                        color: theme.palette.primary.main
                    }
                }),
                selected: ({ theme }) => ({ 
                    '&$root': {
                        borderLeft: 'none',
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: '20em',
                        margin: 'auto',
                        color: theme.palette.primary.contrastText,
                        boxShadow: theme.shadows[4],
                      },
                      '&$closed': {
                        borderRadius: '0',
                        animate: 'width ease-in-out 500ms'
                      },
                })
            }
        }
    },
})
export const darkTheme = () => {};
export const ligthTheme = () => {};
