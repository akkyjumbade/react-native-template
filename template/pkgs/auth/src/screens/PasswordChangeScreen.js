import React from 'react'
import { Button, SafeAreaView, ScrollView, View } from 'react-native'
import { Text, } from 'uikit'

const PasswordChangeScreen = (props) => {
   const { navigation } = props
   return (
      <SafeAreaView>
         <ScrollView>
            <View>
               <Button title={'About us'} onPress={() => navigation.navigate('About')} />
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default PasswordChangeScreen
