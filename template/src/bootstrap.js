import React, { Fragment, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { connect, Provider, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import Navigation from './navigation/Navigation'
import store from './store'
import style from './style/style'
import useAppMount from './utils/useAppMount'
import { QueryClient, QueryClientProvider, } from 'react-query'

import { Host, } from 'react-native-portalize';
import { useIsConnected } from 'react-native-offline';
import { themes } from './style'
import { defaultQueryFn } from './utils/http'
import RNBootSplash from "react-native-bootsplash";


const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         queryFn: defaultQueryFn
      }
   }
})

const Bootstrap = (props) => {
   const { status, setOfflineMode } = useAppMount()
   const isOnline = useIsConnected()
   const { selectedTheme } = props

   useEffect(() => {
      if (!isOnline) {
         setOfflineMode()
      }
   }, [ isOnline, setOfflineMode ])
   // add loading init method
   const isLoading = (status === 'INIT' || status === 'LOADING')
   const theme = themes[selectedTheme]

   useEffect(() => {
      RNBootSplash.hide({ fade: true })
   }, [])

   return (
      <ThemeProvider theme={theme}>
         {/* <Text>{JSON.stringify({ theme })}</Text> */}
         {/* <StyleProvider style={getTheme(theme)}> */}
            <QueryClientProvider client={queryClient}>
               {(isLoading) ? props.loadingScreen() : (
                  <Navigation />
               )}
            </QueryClientProvider>
         {/* </StyleProvider> */}
      </ThemeProvider>
   )
}

export default connect(state => ({
   selectedTheme: state.config.appearance_theme,
}))(Bootstrap)
