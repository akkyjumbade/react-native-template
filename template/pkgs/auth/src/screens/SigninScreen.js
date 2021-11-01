import React, { useState } from 'react'
import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import { Text, Button, Container, Page } from 'uikit'
import AppIcon from 'uikit/src/atoms/AppIcon'
import { Title } from 'uikit/src/atoms/Text'
import { SCREEN } from '../../../../src/config'
import style from '../../../../src/style'
import LoginForm from '../forms/LoginForm'
import LoginWithPhoneForm from '../forms/LoginWithPhoneForm'

const styles = StyleSheet.create({
   bgCover: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: '100%',
      height: SCREEN.height
   }
})
export default function SigninScreen(props) {
   const { navigation } = props
   const [formType, setFormType] = useState('username-password')
   function handleAfterLogin() {
      navigation.navigate('Home')
   }
   function onError(error) {
      Alert.alert(error.message)
   }
   function toggleForm() {
      setFormType(prev => {
         return prev === 'phone' ? 'username-password' : 'phone'
      })
   }
   return (
      <Page scroll={true}  style={{ flex: 1 }} >
         <ImageBackground source={style.bgSource} style={styles.bgCover} >
            <View style={{ paddingHorizontal: 15, marginTop: 30, alignItems: 'center' }}>
               <AppIcon />
            </View>
            <Container style={{ flex: 1, marginTop: 0, marginBottom: 30,  }}>

               {formType === 'username-password' && (
                  <LoginForm onSuccess={handleAfterLogin} onError={onError} />
               )}
               {formType === 'phone' && (
                  <LoginWithPhoneForm onSuccess={handleAfterLogin} onError={onError} />
               )}

               {/* <View style={{ flex: 1, marginTop: 15, width: 300, alignSelf: 'center' }}>
                  <Button size="sm" intent="default" title={`Login with ${formType === 'phone' ? 'email & password' : 'phone'}`} onPress={toggleForm} />
               </View> */}
            </Container>
            <Container style={{ marginTop: 0,  }}>
               <View style={{  }}>
                  <View>
                     <Text style={{ marginBottom: 15, }}>Don't have an account? create now</Text>
                  </View>
                  <View style={{ marginBottom: 7 }}>
                     <Button size={Button.SIZE_LG} intent={Button.INTENT_DEFAULT} onPress={() => navigation.navigate('Signup')} title={'Sign up as Influencer'} />
                  </View>
                  <View style={{ marginBottom: 7 }}>
                     <Button size={Button.SIZE_LG} intent={Button.INTENT_DEFAULT} onPress={() => navigation.navigate('TeamSignup')} title={'Sign up as Business'} />
                  </View>
               </View>
            </Container>
         </ImageBackground>
      </Page>
   )
}
