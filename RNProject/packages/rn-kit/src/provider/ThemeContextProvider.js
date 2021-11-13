import React, { Fragment, memo } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'

const ThemeContextProvider = ({ children, theme: providedTheme }) => {
   return (
      <React.StrictMode>
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
