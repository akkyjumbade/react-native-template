import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Page from "@modules/rn-kit/layouts/Page";
import Text from "@modules/rn-kit/atoms/Text";
import useTranslation from "@/hooks/useTranslation";

const ExploreScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
         <Text style={{ color: 'red' }}>{__('Explore')}</Text>
      </Page>
   )
}

ExploreScreen.propTypes = {
   // prop: PropTypes.string
}

ExploreScreen.defaultProps = {

}

export default ExploreScreen
