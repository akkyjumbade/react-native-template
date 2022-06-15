import icons from '@/icons'
import React, { Fragment } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
   header: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      // backgroundColor: 'red',
      borderBottomWidth: 0,
      position: 'absolute',
      zIndex: 9999,
      // top: 100,
      // height: 100,
      left: 0,
      top: 0,
      width: '100%',
      // elevation: 0,
      shadowOffset: 0,
      shadowOpacity: 0,
      paddingTop: 15,
   },
   backbutton: {
      backgroundColor: 'white',
      width: 40,
      height: 40,
      marginLeft: 15,
      marginTop: 0,

      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      // elevation: 200
      // flexDirection: 'row'
   }
})

const BackButton = ({ navigation }) => {
   return (
      <View style={styles.backbutton}>
         <icons.chevronLeftIcon name="x" width={24} height={24} />
      </View>
   )
}

const MapHeaderNavigation = ({ navigation }) => {
   return (
      <SafeAreaView style={[styles.header]} elevation={20}>
         <Pressable onPress={_ => navigation.goBack()}>
            <BackButton />
         </Pressable>
         {/* <Pressable onPressIn={_ => alert('sdff')}>
            <Text>Press arew</Text>
         </Pressable> */}
      </SafeAreaView>
   )
}

export default MapHeaderNavigation
