import React, { useContext, useState } from 'react'
import {default as defaultTheme} from '../style/theme'
import themeDark from '../style/themeDark'

export const themes = {
   default: defaultTheme,
   dark: themeDark
}
export const ThemeContext = React.createContext()

export default function ThemeProvider({ children }) {
   const [ selectedTheme, setSelectedTheme ] = useState('default')
   function toggleTheme() {
      setSelectedTheme(prev => prev === 'default' ? 'dark' : 'default')
   }
   return (
      <ThemeContext.Provider value={{ theme: themes[selectedTheme], toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}


export const useToggleTheme = () => {
   const { toggleTheme, theme } = useContext(ThemeContext)
   return { toggleTheme, theme }
}
