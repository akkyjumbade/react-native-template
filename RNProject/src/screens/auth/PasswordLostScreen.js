import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import Page from "@ui/layouts/Page";

const PasswordLostScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('welcome_note')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

PasswordLostScreen.propTypes = {
   // prop: PropTypes.string
}

PasswordLostScreen.defaultProps = {
   type: 'text'
}

export default PasswordLostScreen
