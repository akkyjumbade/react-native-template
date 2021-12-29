import React, { memo } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'
import {StatusBar} from "react-native";
import { extendTheme, NativeBaseProvider } from 'native-base';

const ThemeContextProvider = ({ children, theme: providedTheme }) => {
   if (!providedTheme) {
      return null
   }
   return (
      <React.Fragment>
         <StatusBar
            animated={true}
            backgroundColor={providedTheme.colors?.primary ?? 'black'}
            hidden={false}
            barStyle={'dark-content'}
            showHideTransition={'fade'}
         />
         <ThemeProvider theme={providedTheme}>
            <NativeBaseProvider theme={extendTheme(providedTheme)}>
               {children}
            </NativeBaseProvider>
         </ThemeProvider>
      </React.Fragment>
   )
}

ThemeContextProvider.defaultProps = {
   theme,
}

export default memo(ThemeContextProvider)
