import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Page from '../components/layouts/Page'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'

const DocumentScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('DocumentScreen')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

DocumentScreen.propTypes = {
   // prop: PropTypes.string
}

DocumentScreen.defaultProps = {
   type: 'text'
}

export default DocumentScreen
