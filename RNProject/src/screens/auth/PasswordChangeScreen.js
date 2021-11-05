import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'

const PasswordChangeScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('welcome_note')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

PasswordChangeScreen.propTypes = {
   // prop: PropTypes.string
}

PasswordChangeScreen.defaultProps = {
   type: 'text'
}

export default PasswordChangeScreen
