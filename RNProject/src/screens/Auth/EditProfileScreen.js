import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";

const EditProfileScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text>{__('editProfile')}</Text>
         <Text>{JSON.stringify({ auth })}</Text>
      </Page>
   )
}

EditProfileScreen.propTypes = {
   // prop: PropTypes.string
}

EditProfileScreen.defaultProps = {

}

export default EditProfileScreen
