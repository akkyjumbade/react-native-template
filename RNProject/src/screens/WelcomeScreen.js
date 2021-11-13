import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'
import Page from "@ui/layouts/Page";
import Text from "@ui/atoms/Text";

const WelcomeScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text style={{ color: 'red' }}>{__('Welcome')}</Text>
      </Page>
   )
}

WelcomeScreen.propTypes = {
   // prop: PropTypes.string
}

WelcomeScreen.defaultProps = {

}

export default WelcomeScreen
