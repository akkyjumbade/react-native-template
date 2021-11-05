import { useNavigation } from '@react-navigation/core'

import React, { useMemo } from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../style/style'
import { Text, Flex, Icon} from 'uikit'
import { connect, useSelector } from 'react-redux';
import { Badge } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '../style'
import { ThemeContext, useTheme } from 'styled-components/native'


const SearchBar = ({ initialValue, location }) => {
   const nav = useNavigation()
   // const { location } = useLocationComplete()
   function onClick() {
      // alert('Select location')
      nav.navigate('GeoLocation')
      // showModal()
   }
   return (
      <TouchableOpacity style={{ marginTop: 6 }} onPress={onClick}>
         <Flex dir="row" alignItems="center">
            <Icon name="search" size={20} color={colors.dark} style={{ marginRight: 10, }} />
            <View>
               <Text style={{ color: colors.dark, }} >{location.q || 'Choose location'}</Text>
               <Text style={{ color: colors.dark, }} size={11}>Your location</Text>
            </View>
         </Flex>
      </TouchableOpacity>
   )
}
let statusHeight = Platform.select({
   ios: 90,
   android: 70,
})

const MapHeaderNavigation = ({ theme, user, navigation, ...props }) => {
   const location = useSelector(state => state.location)
   const notificationsCount = useSelector(state => state.notifications.unreadNotificationsCount)
   const cartItems = useSelector(state => state.cart.items)
   const cartCount = useMemo(() => {
      return cartItems && Object.values(cartItems).length
   }, [cartItems])
   const selectedTheme = useTheme(ThemeContext)
   // const statusbarHeight = useMemo(() => {
   //    return statusHeight
   // }, [])

   // const statusbarHeight = Sta
   return (
      <SafeAreaView style={{ backgroundColor: 'transparent', height: statusHeight, flexDirection: 'column', justifyContent: 'flex-start' }}>
         <Flex style={{ paddingHorizontal: 15, height: 50, backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center', }} >
            <View style={{ marginLeft: 0, marginTop: 5 }}>
               <Icon style={{ backgroundColor: 'white', padding: 6, borderRadius: 100, }} onPress={() => navigation && navigation.navigate('Choice')} lib="ant" name="bars" size={22} color={colors.dark} />
            </View>
            <View>
               {/* <Text>Center</Text> */}
            </View>
            <View>
               <Flex dir="row" alignItems="center">
                  {/* <Icon badge={notificationsCount} onPress={() => navigation.navigate('Notifications')} lib="feather" name="bell" size={26} color={colors.white} style={{ marginRight: 15, }} /> */}
                  <View style={{ backgroundColor: 'transparent', marginLeft: 15, marginTop: 5 }}>
                     <TouchableOpacity onPress={() => navigation && navigation.navigate('Dashboard')}>
                        <Image source={{ uri: user?.profile_photo_url }} style={{ borderRadius: 100, width: 30, height: 30, }} />
                     </TouchableOpacity>
                  </View>

               </Flex>
            </View>
         </Flex>
      </SafeAreaView>
   )
}
export default connect(state => ({
   theme: state.config.appearance_theme,
   user: state.auth.user,
}))(MapHeaderNavigation)
const styles = StyleSheet.create({
   bagde: {
      marginRight: 0,
      position: 'absolute',
      height: 22,
      width: 22,
      zIndex: 99,
      right: -8,
      top: -8
   }
})
