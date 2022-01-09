import icons from '@/icons'
import React, { Fragment } from 'react'
import { Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Portal } from 'react-native-portalize'
// import { SafeAreaView } from 'react-native-safe-area-context'

const BackButton = ({ navigation }) => {
   function goBack() {
      navigation.goBack()
   }
   return (
      <View style={styles.backbutton}>
         <icons.chevronLeftIcon name="x" width={24} height={24} onPress={goBack} />
      </View>
   )
}
const styles = StyleSheet.create({
   header: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      // backgroundColor: 'red',
      position: 'absolute',
      zIndex: 9999,
      // top: 100,
      // height: 100,
      left: 0,
      top: 0,
      width: '100%',
   },
   backbutton: {
      backgroundColor: 'white',
      width: 40,
      height: 40,
      marginLeft: 15,
      marginTop: 15,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      // flexDirection: 'row'
   }
})

const MapHeaderNavigation = ({ navigation }) => {
   return (
      <SafeAreaView style={[styles.header]}>
         <BackButton navigation={navigation} />
         {/* <Pressable onPressIn={_ => alert('sdff')}>
            <Text>Press arew</Text>
         </Pressable> */}
      </SafeAreaView>
   )
}

export default MapHeaderNavigation
