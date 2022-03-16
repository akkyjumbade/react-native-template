import React, { memo, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'
import darkTheme from '../themes/dark-theme'
import {StatusBar, Text} from "react-native";
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';

const ThemeContextProvider = ({ children, theme: providedTheme }) => {
   // get is dark mode from options
   const isDarkMode = useSelector(state => state.options.appearance_theme === 'dark')
   const themeSelected = useMemo(() => {
      if (isDarkMode) {
         return darkTheme
      }
      return theme
   }, [ isDarkMode ])
   if (!providedTheme) {
      return null
   }

   return (
      <React.Fragment>
         <ThemeProvider theme={themeSelected}>
            <NativeBaseProvider theme={extendTheme(themeSelected)}>
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
