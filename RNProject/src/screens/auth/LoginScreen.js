import React from 'react'
import Page from '@/components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import ErrorBoundary from '@/components/errors/ErrorBoundary'
import LoginForm from '@/components/forms/LoginForm'
import Text from '@ui/atoms/Text'

const LoginScreen = (props) => {
   const __ = useTranslation()

   return (
      <Page scroll={true}>
         <Text>{__('login form')}</Text>
         <ErrorBoundary>
            <LoginForm  />
         </ErrorBoundary>
      </Page>
   )
}


export default LoginScreen
