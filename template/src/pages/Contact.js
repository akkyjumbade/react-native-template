import React from 'react'
import { View } from 'react-native'
import { Button, Text, Container, Page } from '../../pkgs/uikit'

export default function Contact({ navigation }) {
   return (
      <Page>
         <Container>
            <Text>Contact</Text>
            <Text>Click here</Text>
            <Button block intent={Button.INTENT_INFO} size={Button.SIZE_LG} title={'Policy'} onPress={() => navigation.navigate('Legal', { type: 'policy' })} />
         </Container>
      </Page>
   )
}
