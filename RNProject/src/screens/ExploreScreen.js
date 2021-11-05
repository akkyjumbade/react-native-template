import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'

const ExploreScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('ExploreScreen')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

ExploreScreen.propTypes = {
   // prop: PropTypes.string
}

ExploreScreen.defaultProps = {
   type: 'text'
}

export default ExploreScreen
