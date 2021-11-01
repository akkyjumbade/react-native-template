import React, { Fragment } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { Text } from 'uikit'
import { Page, } from 'uikit'
import { colors } from '../style/style'
import { NetworkConsumer } from 'react-native-offline';



const AppIcon = styled.Image.attrs(attrs => ({
   size: 104
}))`
   width: ${props => props.size}px;
   height: ${props => props.size}px;
   margin-bottom: 15px;
   border-radius: 12px;
   align-self: center;
`


export default function LoadingPage() {
   return (
      <Page align={'center'} >
         <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}} align={'center'}>
            <AppIcon source={require('../../assets/icon.png')} />
            {/* <Text>{JSON.stringify({ naver })}</Text> */}
            <NetworkConsumer>
               {({ isConnected }) =>
               isConnected ? (
                  <Fragment>
                     {/* <Text>Downloading images is disabled since you are offline</Text> */}
                  </Fragment>
               ) : (
                  <Fragment>
                     <Text>You are offline</Text>
                  </Fragment>
               )
               }
            </NetworkConsumer>
            <View style={{ marginTop: 20, }}>
               <ActivityIndicator color={colors.primary} size={'small'} />
            </View>
         </View>
      </Page>
   )
}
