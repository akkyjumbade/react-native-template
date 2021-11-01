import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'

const LoadingScreen = (props) => {
   //
   return (
      <Page>
         <Text>Loading...</Text>
      </Page>
   )
}

LoadingScreen.propTypes = {
   // prop: PropTypes.string
}

LoadingScreen.defaultProps = {
   type: 'text'
}

export default LoadingScreen
