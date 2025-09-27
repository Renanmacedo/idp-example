import { UnifiedThemeOptions } from "@backstage/theme";

type Components = UnifiedThemeOptions['components']
export const BackstageHeader:  Components  = {
    BackstageHeader: {
        styleOverrides: {
            header: ({ theme }) => ({
                backgroundImage: 'unset',
                boxShadow: 'unset',
                paddingBottom: theme.spacing(1)
            }),
            title: ({ theme }) => ({
                color: theme.palette.text.primary,
                fontSize: theme.typography.pxToRem(24)
            })
        }
    }
}