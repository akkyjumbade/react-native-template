import React from 'react'
import { Button, SafeAreaView, ScrollView, View } from 'react-native'
import Container from 'uikit/src/atoms/Container'
import { Text, } from 'uikit'
import Page from '../../../../src/components/organisms/Page'

const VerifyPhoneScreen = (props) => {
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

export default VerifyPhoneScreen
