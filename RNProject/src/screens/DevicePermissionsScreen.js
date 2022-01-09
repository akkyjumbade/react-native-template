import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import { Page } from '@modules/rn-kit'
import { Text, Button } from '@modules/rn-kit/atoms'
import WebView from 'react-native-webview'
import { SCREEN } from '@/config'
import { Center, Divider, HStack, Image, List, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import icons from '@/icons'
import { useDevicePermissions } from '@/providers/DevicePermissionsProvider'
import { openSettings } from 'react-native-permissions'
import permissionsActions from '@/store/auth/permissions.actions'
import colors from '@modules/rn-kit/themes/colors'

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

const DevicePermissionsScreen = (props) => {
   const { uri } = props
   const __ = useTranslation()
   const { permissionsEnabled, } = useDevicePermissions()
   const permissions = useSelector((state) => (state.permissions.enabled))
   const dispatch = useDispatch()
   function askForNotification() {
      dispatch(permissionsActions.askForPushNotification())
   }

   return (
      <Page centerMode={false}>
         <Page.Container>
            <Page.Title>Device Permissions</Page.Title>
            <View >
               <List
                  style={{ marginBottom: 15, borderColor: colors.gray, borderWidth: 1, borderRadius: 10 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <List.Item>
                     <HStack space={2}>
                        <icons.bell />
                        <View style={{ flex: 1 }}>
                           <Text bold>{__('push_notification')}</Text>
                           <Text fontSize={'xs'}>{__('push_notification_description')}</Text>
                        </View>
                        <View style={{ paddingRight: 10 }}>
                           {permissions.push_notifications ? (
                              <icons.check />
                           ) : (
                              <icons.xCircle color={'red'} />
                           )}
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item>
                     <HStack space={2}>
                        <icons.locationMarkerIcon />
                        <View style={{ flex: 1 }}>
                           <Text bold>{__('geo_location')}</Text>
                           <Text fontSize={'xs'}>{__('geo_location_description')}</Text>
                        </View>
                        <View style={{ paddingRight: 10 }}>
                           {permissions.geo_location ? (
                              <icons.check />
                           ) : (
                              <icons.xCircle color={'red'} />
                           )}
                        </View>
                     </HStack>
                  </List.Item>
               </List>
               <VStack space={3} >
                  {/* <Text>{JSON.stringify({ permissions })}</Text> */}
                  {!permissions.push_notifications && (
                  <Button title={'Enable push notification'} onPress={askForNotification} />
                  )}
                  <Button leftIcon={() => (
                     <icons.exclaimation />
                  )} title={'Open settings'} onPress={openSettings} />
               </VStack>
            </View>
         </Page.Container>
      </Page>
   )
}

DevicePermissionsScreen.propTypes = {
   uri: PropTypes.string.isRequired,
}

DevicePermissionsScreen.defaultProps = {
   uri: 'https://google.com'
}

export default DevicePermissionsScreen
