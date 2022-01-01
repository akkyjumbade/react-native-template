import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";

const VerificationScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page >
         <Text>{__('welcome_note')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

VerificationScreen.propTypes = {
   // prop: PropTypes.string
}

VerificationScreen.defaultProps = {
   type: 'text'
}

export default VerificationScreen
