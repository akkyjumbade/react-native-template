import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'

const VerifyOTPScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('welcome_note')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

VerifyOTPScreen.propTypes = {
   // prop: PropTypes.string
}

VerifyOTPScreen.defaultProps = {
   type: 'text'
}

export default VerifyOTPScreen
