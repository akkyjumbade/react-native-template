import { useNavigation } from '@react-navigation/core'

import React, { useMemo } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect, useSelector } from 'react-redux';
import { Badge, HStack } from 'native-base';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'styled-components/native'
import colors from '@modules/rn-kit/themes/colors'
import { Text } from '@modules/rn-kit/atoms';
import icons from '@/icons';


const SearchBar = ({ initialValue, location }) => {
   const nav = useNavigation()
   // const { location } = useLocationComplete()
   function onClick() {
      // alert('Select location')
      nav.navigate('search')
      // showModal()
   }
   return (
      <TouchableOpacity style={{ marginTop: 12 }} onPress={onClick}>
         <HStack alignItems="center" space={3}>
            {/* <Icon name="search" size={20} color={colors.dark} style={{ marginRight: 10, }} /> */}
            <icons.search width={26} height={26} />
            <View>
               <Text bold >{location?.q || 'Choose location'}</Text>
               <Text fontSize={'xs'}>Your location</Text>
            </View>
         </HStack>
      </TouchableOpacity>
   )
}
let statusHeight = Platform.select({
   ios: 110,
   android: 70,
})

const HomeNavigationBar = ({ theme, navigation, ...props }) => {
   const location = useSelector(state => state.location)
   // const notificationsCount = useSelector(state => state.notifications.unreadNotificationsCount)
   // const cartItems = useSelector(state => state.cart.items)
   // const cartCount = useMemo(() => {
   //    return cartItems && Object.values(cartItems).length
   // }, [cartItems])
   const selectedTheme = useTheme()
   // const statusbarHeight = useMemo(() => {
   //    return statusHeight
   // }, [])

   // const statusbarHeight = Sta
   return (
      <SafeAreaView style={{ backgroundColor: selectedTheme.colors?.primary, height: statusHeight, }}>
         <HStack style={{ paddingHorizontal: 15, alignItems: 'center' }} alignItems={'center'} justifyContent="space-between">
            <View>
               <SearchBar location={location} />
            </View>
            <View>
               <TouchableOpacity onPress={() => navigation.navigate('notifications')}>
                  <icons.bell />
               </TouchableOpacity>
               {/* <HStack alignItems="center">
               </HStack> */}
            </View>
         </HStack>
      </SafeAreaView>
   )
}
export default connect(state => ({
   theme: state.options.appearance_theme,
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
