import React from 'react'
import { View } from 'react-native'
import { Button, Text, Container, Page } from '../../pkgs/uikit'

export default function About({ navigation }) {
   return (
      <Page>
         <Container>
            <Text>About</Text>
            <Text>Click here</Text>
            <Button block intent={Button.INTENT_INFO} size={Button.SIZE_LG} title={'About us'} onPress={() => navigation.navigate('Contact')} />
            <Button block intent={Button.INTENT_INFO} size={Button.SIZE_LG} title={'Order info'} onPress={() => navigation.navigate('My_Orders')} />
         </Container>
      </Page>
   )
}
