import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import { Page } from '@modules/rn-kit'
import WebView from 'react-native-webview'
import { SCREEN } from '@/config'
import { Center, HStack, Image, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import icons from '@/icons'

const appLogoUri = {
   uri: 'http://placehold.it/144'
}

const styles = StyleSheet.create({
   logo: {
      width: 144,
      height: 144,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
   },
})

const AboutScreen = (props) => {
   const { uri } = props

   return (
      <Page centerMode={true}>
         <Center style={{ flex: 1 }}>
            <View >
               <VStack space={3} alignItems={'center'}>
                  <Image resizeMode='contain' source={appLogoUri} style={styles.logo} alt="logo" />
                  <Text>{'v1.0.0'}</Text>
                  <Text>Code & maintained by {'{developer}'}</Text>
                  <Text>2022 Copyright (C). All rights reserved.</Text>
                  {/* <HStack space={12} style={{ marginVertical: 15, }}>
                     <TouchableOpacity>
                        <icons.email />
                     </TouchableOpacity>
                     <TouchableOpacity>
                        <icons.email />
                     </TouchableOpacity>
                     <TouchableOpacity>
                        <icons.email />
                     </TouchableOpacity>
                     <TouchableOpacity>
                        <icons.email />
                     </TouchableOpacity>
                  </HStack> */}
               </VStack>
            </View>
         </Center>
      </Page>
   )
}

AboutScreen.propTypes = {
   uri: PropTypes.string.isRequired,
}

AboutScreen.defaultProps = {
   uri: 'https://google.com'
}

export default AboutScreen
