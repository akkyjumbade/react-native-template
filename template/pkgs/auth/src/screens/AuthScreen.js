/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { Image, Modal, SafeAreaView, ScrollView, View } from 'react-native'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import { Page, Text, Button } from 'uikit'
import Carousel from '../../../../src/components/organisms/Carousel';

const slides = [
   {
      thumbnail: 'https://placehold.it/400',
   },
   {
      thumbnail: 'https://placehold.it/400',
   },
]
const WalkthroughSlides = props => {
   const SCREEN = useWindowDimensions()
   return (
      <View style={{ height: (SCREEN.height / 1.5), backgroundColor: 'gray' }}>
         <Carousel height={'100%'} dots={true} slides={slides} render={(row) => (
            <View style={{ backgroundColor: '#f1f1f1', height: (SCREEN.height / 1.5), }}>
               <Image source={{ uri: row.thumbnail }} style={{ height: (SCREEN.height / 1.5), }} />
            </View>
         )} />
      </View>
   )
}

export default function Walkthrough(props) {
   const { navigation } = props
   return (
      <Page>
         <View style={{ marginTop: 0, width: '100%' }}>
            <WalkthroughSlides />
            <View style={{ width: '100%', padding: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
               <View>
                  <Button size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} onPress={() => navigation.navigate('Signup')} title={'Register'} />
               </View>
               <View>
                  <Button size={Button.SIZE_LG} intent={Button.INTENT_DEFAULT} onPress={() => navigation.navigate('Signin')} title={'Sign in'} />
               </View>
            </View>
         </View>
      </Page>
   )
}
