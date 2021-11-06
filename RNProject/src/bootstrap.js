import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import OfflineScreen from './screens/OfflineScreen'
import LoadingScreen from './screens/LoadingScreen'
import useAppMount from './hooks/useAppMount'
import ErrorBoundary from './components/errors/ErrorBoundary'
import { useIsConnected } from 'react-native-offline';
import './i18n'
import Navigation from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import { useToggleTheme } from './providers/ThemeProvider'


const Bootstrap = (props) => {
   const isOnline = useIsConnected()
   const { status, } = useAppMount()
   const { theme } = useToggleTheme()
   console.log({ theme })
   if (!theme) {
      return null
   }
   return (
      <SafeAreaProvider>
         <ErrorBoundary>
            <ThemeProvider theme={theme}>
               {status === 'LOADING' || status === 'INIT' ? (
                  <LoadingScreen />
               ) : (
                  <Fragment>
                     {isOnline ? (
                        <Navigation />
                     ) : (
                        <OfflineScreen />
                     )}
                  </Fragment>
               )}
            </ThemeProvider>
         </ErrorBoundary>
      </SafeAreaProvider>
   )
}

Bootstrap.propTypes = {
   // prop: PropTypes.string
}

Bootstrap.defaultProps = {
   type: 'text'
}

export default Bootstrap
