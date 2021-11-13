import React, { memo } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'
import {StatusBar} from "react-native";

const ThemeContextProvider = ({ children, theme: providedTheme }) => {
   return (
      <React.StrictMode>
         <StatusBar
            animated={true}
            backgroundColor={providedTheme.colors?.primary ?? 'black'}
            hidden={false}
            barStyle={'dark-content'}
            showHideTransition={'fade'}
         />
         <ThemeProvider theme={providedTheme}>
            {children}
         </ThemeProvider>
      </React.StrictMode>
   )
}

ThemeContextProvider.defaultProps = {
   theme,
}

export default memo(ThemeContextProvider)
