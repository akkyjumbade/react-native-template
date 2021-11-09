import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'

const ThemeContextProvider = ({ children, theme: providedTheme }) => {
   return (
      <Fragment>
         <ThemeProvider theme={providedTheme}>
            {children}
         </ThemeProvider>
      </Fragment>
   )
}

ThemeContextProvider.defaultProps = {
   theme,
}

export default ThemeContextProvider
