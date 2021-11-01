import React, { useMemo } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Container } from 'uikit'
import { Text } from 'uikit'
import Collapsable from 'uikit/src/molecules/Collapsable'

const LogEntry = ({ item }) => {
   return (
      <View style={{ marginBottom: 15, flexDirection: 'row', }}>
         <View>
            <Text>.</Text>
         </View>
         <View>
            <View style={{ marginBottom: 4, paddingLeft: 4, }}>
               <Text weight="bold" size={15}>{item.status}</Text>
            </View>
            <Text>{item.message}</Text>
            <Text>{item.created_at}</Text>
         </View>
      </View>
   )
}
const OrderTrackingIndicator = ({ order }) => {
   const firstEntry = useMemo(() => {
      return order.logs[0]
   }, [order])
   return (
      <View>
         <Container>
            <Collapsable header={(props) => (
               <TouchableOpacity {...props}>
                  <LogEntry item={firstEntry} />
               </TouchableOpacity>
            )}>
               <FlatList data={order.logs} keyExtractor={row => row.id} renderItem={LogEntry} />
            </Collapsable>

         </Container>
         {/* <Text>{JSON.stringify(order.logs)}</Text> */}
      </View>
   )
}

export default OrderTrackingIndicator
