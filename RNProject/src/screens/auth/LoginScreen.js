import React from 'react'
import Page from '../../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import { Button, Text } from 'rn-kit'
import ErrorBoundary from '../../components/errors/ErrorBoundary'

const LoginScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()

   return (
      <Page scroll={true}>
         <Text>{__('login')}</Text>
         <ErrorBoundary>
            <Button title={'Login'} />
         </ErrorBoundary>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}


export default LoginScreen
