import React from 'react'
import PropTypes from 'prop-types'
import Page from '@modules/rn-kit/layouts/Page'
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
