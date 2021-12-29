import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { Icon } from '../..'
import { colors } from '../../../../src/style/style'
import { Heading } from '../atoms/Text'

const OfflineException = props => {
   return (
   <SafeAreaView style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
      <View style={{ marginVertical: 40, alignItems: 'center', justifyContent: 'center', }}>
         <Icon color={colors.gray} name="wifi" size={50} style={{ marginBottom: 20, }} lib="FontAwesome5" />
         <Heading>You are offline!</Heading>
      </View>
   </SafeAreaView>
   )
}

export default OfflineException
