import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Page from "@modules/rn-kit/layouts/Page";
import Text from "@modules/rn-kit/atoms/Text";
import useTranslation from "@/hooks/useTranslation";

const HomeScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   return (
      <Page>
      </Page>
   )
}

HomeScreen.propTypes = {
   // prop: PropTypes.string
}

HomeScreen.defaultProps = {

}

export default HomeScreen
