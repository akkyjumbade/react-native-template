import React from 'react'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import ErrorBoundary from '@/components/errors/ErrorBoundary'
import LoginForm from '@/components/forms/LoginForm'
import Text from '@modules/rn-kit/atoms/Text'
import Page from "@modules/rn-kit/layouts/Page";

import { View } from "react-native";
import ButtonOutline from "@modules/rn-kit/atoms/ButtonOutline";
import Container from "@modules/rn-kit/layouts/Container";
import {useNavigation} from "@react-navigation/core";
import Logo from "@/components/Logo";
import { Center } from 'native-base'
import { Button } from '@modules/rn-kit'
import Hyperlink from '@modules/rn-kit/atoms/Hyperlink'
import { alert } from '@modules/rn-kit/utils/alert'
import { useDispatch } from 'react-redux'
import { auth_guest_login_action } from '@/store/auth/auth.actions'

const LoginScreen = (props) => {
   const __ = useTranslation()
   const nav = useNavigation()
   const dispatch = useDispatch()
   const loginAsGuest = () => {
      // alert('Login as guest')
      dispatch(auth_guest_login_action())
   }

   return (
      <Page >
         <Page.Container>
            <Page.Title>Login</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 15 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
               {/* <Logo /> */}
               <LoginForm  />
               <View style={{ marginVertical: 15 }}>
                  <Button title={__('btn_guest_login')} onPress={loginAsGuest} />
               </View>
            </View>
         </Center>
         <Page.Container>
            <View>
               <View style={{ marginBottom: 0, }}>
                  <View style={{ marginBottom: 15, }}>
                     <Hyperlink routeName={'password_request'} >{__('password_forgot_query')}</Hyperlink>
                  </View>
                  {/* <ButtonOutline title={__('btn_forgot_password')} onPress={() => nav.navigate('home')} /> */}
               </View>
               <View style={{ marginBottom: 30, }}>
                  <View style={{ marginBottom: 15, }}>
                     <Text >{__('new_register_cta')}</Text>
                  </View>
                  <Button title={__('btn_register')} onPress={() => nav.navigate('register')} />
               </View>
            </View>
         </Page.Container>
      </Page>
   )
}


export default LoginScreen
