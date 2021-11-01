import React from 'react'
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native'
import { Text, Button } from 'uikit'
import RegisterForm from '../forms/RegisterForm'
import { Page, Container } from 'uikit'
import { NavLink, Title } from 'uikit/src/atoms/Text'
import style from '../../../../src/style'

export default function SignupScreen(props) {
   const { navigation: { navigate } } = props
   function onSuccess(ev) {
      navigate('Home')
   }
   return (
      <Page>
         <ImageBackground source={style.bgSource} style={{ width: '100%', height: '100%' }} >
            <View style={{ paddingHorizontal: 15, }}>
               <Title>Welcome</Title>
            </View>
            <Container style={{ flex: 1, }}>
               <RegisterForm onSuccess={onSuccess} />
            </Container>
            <Container style={{ marginTop: 15, marginBottom: 30 }}>
               <View>
                  <Text style={{ marginBottom: 30, marginTop: 0,  }}>
                     By clicking Create account, you are agree to our
                     Terms & Conditions
                     and that you have read our Privacy policy
                  </Text>
               </View>
               <Text style={{ marginBottom: 15, }}>Already have account? login here</Text>
               <Button block intent={Button.INTENT_INFO} size={Button.SIZE_LG} title={'LOGIN'} onPress={() => navigate('Signin')} />

            </Container>
         </ImageBackground>
      </Page>
   )
}
