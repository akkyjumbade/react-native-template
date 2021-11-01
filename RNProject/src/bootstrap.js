import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import OfflineScreen from './screens/OfflineScreen'
import LoadingScreen from './screens/LoadingScreen'
import useAppMount from './hooks/useAppMount'
import ErrorBoundary from './components/errors/ErrorBoundary'
import { useIsConnected } from 'react-native-offline';
import './i18n'

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
         {isOnline === 'online' ? (
            <OfflineScreen />
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
