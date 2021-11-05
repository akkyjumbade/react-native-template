import { useNavigation } from '@react-navigation/core'

import React, { useMemo } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../style/style'
import { Text, Flex, Icon} from 'uikit'
import { connect, useSelector } from 'react-redux';
import { Badge } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '../style'


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

const HomeNavigationBar = ({ theme, navigation, ...props }) => {
   const location = useSelector(state => state.location)
   const notificationsCount = useSelector(state => state.notifications.unreadNotificationsCount)
   const cartItems = useSelector(state => state.cart.items)
   const cartCount = useMemo(() => {
      return cartItems && Object.values(cartItems).length
   }, [cartItems])
   const selectedTheme = themes[theme]
   // const statusbarHeight = useMemo(() => {
   //    return statusHeight
   // }, [])

   // const statusbarHeight = Sta
   return (
      <SafeAreaView style={{ backgroundColor: selectedTheme.colors?.primary, height: statusHeight, flexDirection: 'column', justifyContent: 'flex-start' }}>
         <Flex style={{ paddingHorizontal: 15, }} justifyContent="space-between">
            <View>
               <SearchBar location={location} />
            </View>
            <View>
               {/* <Text>sdfs sdf sd</Text> */}
            </View>
            <View>
               <Flex dir="row" alignItems="center">
                  {/* <Icon badge={notificationsCount} onPress={() => navigation.navigate('Notifications')} lib="feather" name="bell" size={26} color={colors.white} style={{ marginRight: 15, }} /> */}
                  <View style={{ marginLeft: 15, marginTop: 5 }}>
                     <Icon onPress={() => navigation.navigate('Menus')} lib="ant" name="bars" size={26} color={colors.dark} style={{ marginRight: 10, }} />
                  </View>
               </Flex>
            </View>
         </Flex>
      </SafeAreaView>
   )
}
export default connect(state => ({
   theme: state.config.appearance_theme,
}))(HomeNavigationBar)
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
