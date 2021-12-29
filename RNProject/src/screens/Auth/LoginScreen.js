import React from 'react'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import ErrorBoundary from '@/components/errors/ErrorBoundary'
import LoginForm from '@/components/forms/LoginForm'
import Text from '@ui/atoms/Text'
import Page from "@modules/rn-kit/layouts/Page";

import { View } from "react-native";
import ButtonOutline from "@modules/rn-kit/atoms/ButtonOutline";
import Container from "@modules/rn-kit/layouts/Container";
import {useNavigation} from "@react-navigation/core";
import Logo from "@/components/Logo";

const LoginScreen = (props) => {
   const __ = useTranslation()
   const nav = useNavigation()

   return (
      <Page scroll={false} centerMode={true}>
         <Container>
            <ErrorBoundary>
               <Logo />
               <LoginForm  />
               <View style={{ marginTop: 30, }}>
                  <View style={{ marginBottom: 15, }}>
                     <Text >New Customer? Register here</Text>
                  </View>
                  <ButtonOutline title={__('Register')} onPress={() => nav.navigate('Home')} />
               </View>
            </ErrorBoundary>
         </Container>
      </Page>
   )
}


export default LoginScreen
