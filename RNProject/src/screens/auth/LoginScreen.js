import React from 'react'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import ErrorBoundary from '@/components/errors/ErrorBoundary'
import LoginForm from '@/components/forms/LoginForm'
import Text from '@ui/atoms/Text'
import Page from "@ui/layouts/Page";

import { View } from "react-native";
import ButtonOutline from "@ui/atoms/ButtonOutline";
import Container from "@ui/layouts/Container";

const LoginScreen = (props) => {
   const __ = useTranslation()

   return (
      <Page scroll={false} centerMode={true}>
         <Container>
            <ErrorBoundary>
               <LoginForm  />
               <View style={{ marginTop: 30, }}>
                  <View style={{ marginBottom: 15, }}>
                     <Text >New Customer? Register here</Text>
                  </View>
                  <ButtonOutline title={__('Register')} />
               </View>
            </ErrorBoundary>
         </Container>
      </Page>
   )
}


export default LoginScreen
