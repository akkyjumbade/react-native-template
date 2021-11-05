import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'

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
