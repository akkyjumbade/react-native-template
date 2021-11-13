import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'
import Page from "@ui/layouts/Page";

const WelcomeScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text style={{ color: 'red' }}>{__('WelcomeScrsf sdfeens d sfs sdf')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

WelcomeScreen.propTypes = {
   // prop: PropTypes.string
}

WelcomeScreen.defaultProps = {
   type: 'text'
}

export default WelcomeScreen
