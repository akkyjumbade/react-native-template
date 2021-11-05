import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import OfflineScreen from './screens/OfflineScreen'
import LoadingScreen from './screens/LoadingScreen'
import useAppMount from './hooks/useAppMount'
import ErrorBoundary from './components/errors/ErrorBoundary'
import { useIsConnected } from 'react-native-offline';
import './i18n'
import Navigation from './navigation'
import { Text } from 'react-native'

const Bootstrap = (props) => {
   const isOnline = useIsConnected()
   const { status, } = useAppMount()

   if (status === 'LOADING' || status === 'INIT') {
      // render loading screen
      return (
         <ErrorBoundary>
            <LoadingScreen />
         </ErrorBoundary>
      )
   }
   return (
      <ErrorBoundary>
         {isOnline ? (
            <Navigation />
         ) : (
            <OfflineScreen />
         )}
      </ErrorBoundary>
   )
}

Bootstrap.propTypes = {
   // prop: PropTypes.string
}

Bootstrap.defaultProps = {
   type: 'text'
}

export default Bootstrap
