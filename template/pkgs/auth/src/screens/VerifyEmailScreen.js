import React from 'react'
import { Button, SafeAreaView, ScrollView, View } from 'react-native'
import Container from 'uikit/src/atoms/Container'
import {Page} from "uikit";

const VerifyEmailScreen = (props) => {
   const { navigation } = props
   return (
      <Page>
         <Container>
            <View>
               <Button title={'About us'} onPress={() => navigation.navigate('About')} />
            </View>
         </Container>
      </Page>
   )
}

export default VerifyEmailScreen
