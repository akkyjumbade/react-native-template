import React, { useEffect } from 'react'
import { Button, SafeAreaView, ScrollView, View } from 'react-native'
import LoadingSpinner from '../components/atoms/LoadingSpinner'

export default function Loading(props) {
   const { navigation } = props
   useEffect(() => {
      navigation.navigate('')
   }, [])
   return (
      <SafeAreaView>
         <View style={{ margin: 30, alignContent: 'center', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'  }}>
            <LoadingSpinner />
         </View>
      </SafeAreaView>
   )
}
