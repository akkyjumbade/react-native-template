import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Page from "@modules/rn-kit/layouts/Page";
import Text from "@modules/rn-kit/atoms/Text";
import useTranslation from "@/hooks/useTranslation";

const LegalScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text style={{ color: 'red' }}>{__('Welcome')}</Text>
      </Page>
   )
}

LegalScreen.propTypes = {
   // prop: PropTypes.string
}

LegalScreen.defaultProps = {

}

export default LegalScreen
