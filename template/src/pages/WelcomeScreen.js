import React, { Fragment } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { Text } from 'uikit'
import { Page, } from 'uikit'
import { colors } from '../style/style'
import { NetworkConsumer } from 'react-native-offline';
import AppIcon from 'uikit/src/atoms/AppIcon'
import { useSelector } from 'react-redux'


const title = 'Registration successful'
const msg = 'Thank you for being the part of The Spot. While your account is being approved'

export default function WelcomeScreen() {
   const resources = useSelector(state => state.resources)
   return (
      <Page align={'center'} >
         <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}} align={'center'}>
            <AppIcon source={require('../../assets/icon.png')} />
            <View style={{ paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center' }}>
               <Text style={{ marginBottom: 10, color: '#2ecc71' }} size={20} bold={true}>{title}</Text>
               <Text>{msg}</Text>
               {/* <Text>{JSON.stringify({ resources})}</Text> */}
            </View>

         </View>
      </Page>
   )
}
