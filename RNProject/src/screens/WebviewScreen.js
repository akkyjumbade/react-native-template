import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import { Page } from '@modules/rn-kit'
import WebView from 'react-native-webview'
import { SCREEN } from '@/config'

const WebviewScreen = (props) => {
   const { uri } = props

   return (
      <Page>
         <WebView
            source={{ uri }}
            style={{ width: '100%', height: SCREEN.height }}
         />
      </Page>
   )
}

WebviewScreen.propTypes = {
   uri: PropTypes.string.isRequired,
}

WebviewScreen.defaultProps = {
   uri: 'https://google.com'
}

export default WebviewScreen
