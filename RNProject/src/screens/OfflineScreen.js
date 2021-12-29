import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import Container from "@modules/rn-kit/layouts/Container";

const OfflineScreen = (props) => {
   const __ = useTranslation()
   return (
      <Page scroll={false} centerMode={true}>
         <Container>
            <Text>{__('offline_title')}</Text>
         </Container>
      </Page>
   )
}

OfflineScreen.propTypes = {
   // prop: PropTypes.string
}

OfflineScreen.defaultProps = {

}

export default OfflineScreen
