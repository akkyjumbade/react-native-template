import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'

const WebviewScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('WebviewScreen')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

WebviewScreen.propTypes = {
   // prop: PropTypes.string
}

WebviewScreen.defaultProps = {
   // type: 'text'
}

export default WebviewScreen
