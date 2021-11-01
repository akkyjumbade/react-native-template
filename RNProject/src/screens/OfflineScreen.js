import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'

const OfflineScreen = (props) => {
   //
   return (
      <Page>
         <Text>Offline</Text>
      </Page>
   )
}

OfflineScreen.propTypes = {
   // prop: PropTypes.string
}

OfflineScreen.defaultProps = {
   type: 'text'
}

export default OfflineScreen
