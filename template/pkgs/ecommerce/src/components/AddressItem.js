import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'uikit'

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 15,
      paddingVertical: 6,
      alignItems: 'center',
      flexDirection: 'row',
   }
})
const AddressItem = ({ item, index, prepend, append}) => {
   return (
      <View style={styles.container}>
         {prepend && prepend()}
         <View >
            <Text style={{ alignSelf: 'flex-start' }}>{[item.name].join(',')}</Text>
            <Text style={{ alignSelf: 'flex-start' }}>{[item.phone].join(',')}</Text>
            <Text style={{ alignSelf: 'flex-start' }}>{[item.address_line, item.address_line_2].join(',')}</Text>
            <Text style={{ alignSelf: 'flex-start' }}>{[item.city, item.state].join(',')}</Text>
            <Text style={{ alignSelf: 'flex-start' }}>{[item.postal_code, item.country].join(',')}</Text>
            {/* <Text>{JSON.stringify(item)}</Text> */}
         </View>
         {append && append()}
      </View>
   )
}

export default AddressItem
