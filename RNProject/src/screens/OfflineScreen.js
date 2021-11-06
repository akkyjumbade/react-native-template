import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'

const OfflineScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('offline screen sdsdf')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
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
