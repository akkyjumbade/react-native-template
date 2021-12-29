import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import { Center } from 'native-base'
import LoginForm from '@/components/forms/LoginForm'
import { Button, Text } from '@modules/rn-kit'
import Hyperlink from '@modules/rn-kit/atoms/Hyperlink'
import { useNavigation } from '@react-navigation/native'
import PasswordLostForm from '@/components/forms/PasswordLostForm'

const PasswordLostScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   const nav = useNavigation()

   return (
      <Page>
         <Page.Container>
            <Page.Title>Password Lost?</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 15 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
               <PasswordLostForm />
               <View style={{ marginVertical: 15 }}>
                  {/* <Button title={__('btn_guest_login')} onPress={loginAsGuest} /> */}
               </View>
            </View>
         </Center>
         <Page.Container>
            <View>
               <View style={{ marginBottom: 0, }}>
                  <View style={{ marginBottom: 15, }}>
                     <Hyperlink routeName={'support_link'} >{__('support_link')}</Hyperlink>
                  </View>
               </View>
               <View style={{ marginBottom: 30, }}>
                  <View style={{ marginBottom: 15, }}>
                     <Text >{__('login_back')}</Text>
                  </View>
                  <Button title={__('btn_login')} onPress={() => nav.navigate('login')} />
               </View>
            </View>
         </Page.Container>
      </Page>
   )
}

PasswordLostScreen.propTypes = {
   // prop: PropTypes.string
}

PasswordLostScreen.defaultProps = {
   // type: 'text'
}

export default PasswordLostScreen
