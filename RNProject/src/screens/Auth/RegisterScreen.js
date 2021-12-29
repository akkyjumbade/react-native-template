import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import { Center } from 'native-base'
import RegisterForm from '@/components/forms/RegisterForm'
import { Button } from '@modules/rn-kit'
import { useNavigation } from '@react-navigation/native'
import Text from '@modules/rn-kit/atoms/Text'

const RegisterScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   const nav = useNavigation()

   return (
      <Page>
         <Page.Container>
            <Page.Title>Create account</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 15 }}>
            <RegisterForm />
         </Center>
         <Page.Container style={{ marginBottom: 30 }}>
            <View style={{ marginBottom: 15 }}>
               <Text routeName={'login'} >{__('already_registered')}</Text>
            </View>
            <Button title='Login' onPress={() => nav.navigate('login')} />
         </Page.Container>
      </Page>
   )
}

RegisterScreen.propTypes = {
   // prop: PropTypes.string
}

RegisterScreen.defaultProps = {
   type: 'text'
}

export default RegisterScreen
