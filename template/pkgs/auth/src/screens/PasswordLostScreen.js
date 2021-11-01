import React, { useEffect, useReducer } from 'react'
import { Text, Page, } from 'uikit'
import { Button, Container } from 'uikit'
import password_reset_reducer, { initialStateForPassword, T_VERIFICATION_SENT, T_REQUEST_SUMBIT } from '../utils/password_reset_reducer'
import PasswordRequestForm from '../forms/PasswordRequestForm'
import PasswordResetForm from '../forms/PasswordResetForm'
import { Title } from 'uikit/src/atoms/Text'
import { View } from 'react-native'

export default function PasswordLostScreen(props) {
   const { navigation } = props
   const [state, dispatch] = useReducer(password_reset_reducer, initialStateForPassword)

   useEffect(() => {
      setTimeout(() => {
         // dispatch({ type: T_REQUEST_SUMBIT, })
         // dispatch({ type: T_VERIFICATION_SENT, })
      }, 4000);
   }, [])
   return (
      <Page Header={() => (
         <View style={{ paddingHorizontal: 15, }}>
            <Title>Password lost?</Title>
         </View>
      )}>
         <Container>
            {/* <Text>{JSON.stringify({ state })}</Text> */}
            {state.otp_sent ? (
               <PasswordResetForm />
            ) : (
               <PasswordRequestForm onSuccess={() => dispatch({ type: T_VERIFICATION_SENT })} />
            )}
         </Container>
         <Container>
            <Button intent={Button.INTENT_INFO} size={'lg'} title={'Login back'} onPress={() => navigation.navigate('About')} />
         </Container>
      </Page>
   )
}
