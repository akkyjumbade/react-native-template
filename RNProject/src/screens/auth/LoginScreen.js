import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'

const LoginScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('login')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

LoginScreen.propTypes = {
   // prop: PropTypes.string
}

LoginScreen.defaultProps = {
   type: 'text'
}

export default LoginScreen
