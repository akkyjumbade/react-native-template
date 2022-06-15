import React from 'react'
import PropTypes from 'prop-types'
import { View, } from 'react-native'
import { Text, VStack  } from 'native-base'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import Container from "@modules/rn-kit/layouts/Container";

const OfflineScreen = (props) => {
   const __ = useTranslation()
   return (
      <Page scroll={false} centerMode={true}>
         <Page.Container>
            <VStack space={2} style={{ alignItems: 'center' }}>
               <Text fontSize={'lg'}>{__('offline_title')}</Text>
               <Text>{__('offline_description')}</Text>
            </VStack>
         </Page.Container>
      </Page>
   )
}

OfflineScreen.propTypes = {
   // prop: PropTypes.string
}

OfflineScreen.defaultProps = {

}

export default OfflineScreen
