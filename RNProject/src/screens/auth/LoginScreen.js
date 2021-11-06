import React from 'react'
import { Text, View } from 'react-native'
import Page from '../../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'

const LoginScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page scroll={true}>
         <Text>{__('login')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}


export default LoginScreen
