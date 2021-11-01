import React from 'react'
import { View } from 'react-native'
import { Button, Text, Container, Page } from 'uikit'

export default ({ navigation }) => {
   return (
      <Page>
         <Container>
            <Text>LegalScreen</Text>
            <Text>Click here</Text>
            <Button block intent={Button.INTENT_INFO} size={Button.SIZE_LG} title={'Policy'} onPress={() => navigation.navigate('Contact')} />
         </Container>
      </Page>
   )
}
