import React, {Fragment, memo, useEffect, useState} from 'react'
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
import RNBootSplash from "react-native-bootsplash";
import {useIsConnected} from "react-native-offline";
import { registerPushNotificationChannels } from './services/PushNotificationService'
import { notificationChannels } from './config'
import LocaleContextProvider from './providers/LocaleProvider'
import GeoLocationProvider from './providers/GeoLocationProvider'
import DevicePermissionsProvider from './providers/DevicePermissionsProvider'


const Bootstrap = () => {
   const isOnline = useIsConnected()
   const [status, setStatus] = useState('INIT')

   useEffect(() => {
      if (isOnline) {
         setStatus('READY')
      }
      RNBootSplash.hide({ fade: true });
      registerPushNotificationChannels(notificationChannels)
   }, [ isOnline ])

   return (
      <SafeAreaProvider >
         {/* <StatusBar translucent={true} /> */}
         <ErrorBoundary>
            <DevicePermissionsProvider>
               <LocaleContextProvider>
                  <GeoLocationProvider>
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
                  </GeoLocationProvider>
               </LocaleContextProvider>
            </DevicePermissionsProvider>
         </ErrorBoundary>
      </SafeAreaProvider>
   )
}

Bootstrap.propTypes = {

}

Bootstrap.defaultProps = {

}

export default memo(Bootstrap)
