import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import OfflineScreen from './screens/OfflineScreen'
import LoadingScreen from './screens/LoadingScreen'
import useAppMount from './hooks/useAppMount'
import ErrorBoundary from './components/errors/ErrorBoundary'
// import { useIsConnected } from 'react-native-offline';
import './i18n'
import Navigation from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'


const Bootstrap = (props) => {
   const isOnline = true
   const status = 'READY'

   return (
      <SafeAreaProvider >
         {/* <StatusBar translucent={true} /> */}
         <ErrorBoundary>
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

export default memo(Bootstrap)
