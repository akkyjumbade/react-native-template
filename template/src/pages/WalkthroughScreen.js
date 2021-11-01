/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { Image, ImageBackground, View } from 'react-native'

import { SCREEN } from '../config'
import { Text, Button, Carousel } from 'uikit'
import { Page } from 'uikit'
import AppIcon from 'uikit/src/atoms/AppIcon'

const slides = [
   {
      thumbnail: 'https://placehold.it/600',
   },
   // {
   //    thumbnail: 'https://stpatil.in/public/img/app-intro-1.png',
   // },
   // {
   //    thumbnail: 'https://stpatil.in/public/img/app-intro-1.png',
   // },
]
const WalkthroughSlides = ({ slides: items }) => {
   return (
      <View style={{ width: '100%', backgroundColor: 'white' }}>
         <View>
            {items.map((row, slk) => (
               <View key={slk}>
                  {/* <Text>{row.thumbnail}</Text> */}
                  <Image
                     source={{ uri: row.thumbnail }}
                     resizeMode="contain"
                     progressiveRenderingEnabled={true}
                     style={{ borderRadius: 12, width: SCREEN.width, height: (SCREEN.height / 2.5), }} />
               </View>
            ))}
         </View>
      </View>
   )
}

const WalkthroughScreen = (props) => {
   const { navigation } = props
   const bgSource = require('../../assets/images/theme-bg.jpg')
   return (
      <Page scroll={false} style={{ backgroundColor: 'transparent' }}>
         <ImageBackground source={bgSource} style={{ marginTop: 0,  width: '100%', height: SCREEN.height }}>
            <View style={{ marginTop: 100, }}>
               <AppIcon />

            </View>
            {/* <WalkthroughSlides slides={slides} /> */}
            <View style={{ width: '100%', paddingVertical: 30, paddingHorizontal: 15, }}>
               <View style={{ marginBottom: 7 }}>
                  <Button size={Button.SIZE_LG} intent={Button.INTENT_DEFAULT} onPress={() => navigation.navigate('Signin')} title={'Sign in'} />
               </View>
               <View style={{ marginBottom: 7 }}>
                  <Button size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} onPress={() => navigation.navigate('Signup')} title={'Sign up as Influencer'} />
               </View>
               <View style={{ marginBottom: 7 }}>
                  <Button size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} onPress={() => navigation.navigate('TeamSignup')} title={'Sign up as Business'} />
               </View>
            </View>
         </ImageBackground>
      </Page>
   )
}

export default WalkthroughScreen
