import { useFocusEffect } from '@react-navigation/core'
import { Left, List, ListItem, Right } from 'native-base'
import React, { useMemo, useReducer } from 'react'
import { FlatList, Image, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Section } from 'uikit'
import { Container, Text, Page, } from 'uikit'
import { Flex } from 'uikit'
import { Icon } from 'uikit'
import { Button } from 'uikit'
import { alert } from 'uikit/src/utils/alert'
import { colors } from '../../style/style'

const order_reducer = (state, action) => {
   switch (action.type) {
      case 'CANCEL_ORDER':
         state = {
            ...state,
         }
         break;

      default:
         break;

   }
   return state
}

const renderOrderItem = ({ item = {}, ...rest }) => {
   return (
      <View style={{ flexDirection: 'row',   paddingHorizontal: 15, marginBottom: 15, }}>
         {/* <Text>{JSON.stringify(rest)}</Text> */}
         <Image source={{ uri: item.thumbnail }} style={{ width: 64, height: 64, borderRadius: 10, }} />
         <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}>
            <View>
               <Text size={Text.SIZE_HEADING}>
                  {item.name}
               </Text>
               <View>
                  <Text >
                     Price: {item.price}
                  </Text>
                  <Text >
                     Qty: {item.qty}
                  </Text>
               </View>
            </View>
            <View>
               <Text>Rs.321</Text>
            </View>
         </View>

      </View>
   )
}

const ServiceOrderInfo = ({ navigation, route, }) => {
   const order = route.params?.order
   const [state, dispatch] = useReducer(order_reducer, order)

   const orderItems = useMemo(() => {
      return [
         {
            name: 'Adidas shoes',
            price: '3999.00',
            thumbnail: 'http://placehold.it/64',
            qty: '1',
            id: '1',
         },
      ]
   }, [])
   useFocusEffect(() => {
      navigation.setOptions({
         title: order?.title,
      })
   })
   async function cancelOrder() {
      try {
         dispatch()
      } catch (error) {
         alert(error.message)
      }
   }

   return (
      <Page title={'Order'}>
         <View padding={0}>
            <Container style={{ marginBottom: 0, }}>
               <Flex alignItems={'center'} style={{ marginBottom: 15, }}>
                  <View style={{ marginRight: 15, }}>
                     <Icon style={{ borderRadius: 100, backgroundColor: colors.success, padding: 10, }} lib={'feather'} name={'check-circle'} color={'white'} size={22} />
                  </View>
                  <View>
                     <Text size={22} style={{ marginBottom: 3, }}>Thank you</Text>
                     <Text size={13} style={{  }}>Your order #BE12345 has been placed.</Text>
                  </View>
               </Flex>
               <Text marginBottom={20}>
                  We sent an email to orders@banuelson.com with your order confirmation and bill.
               </Text>
               <Text>
                  Time placed: 17/02/2020 12:45 CEST
               </Text>
            </Container>
            <Section title={'Delivery'}>
               <View style={{  }}>
                  <Text style={{ justifyContent: 'flex-start' }}>Banu Elson</Text>
                  <Text style={{ justifyContent: 'flex-start' }}>orders@banuelson.com</Text>
                  <Text style={{ justifyContent: 'flex-start' }}>+49 179 111 1010</Text>
                  <Text style={{ justifyContent: 'flex-start' }}>
                     Leibnizstraße 16, Wohnheim 6, No: 8X
                     Clausthal-Zellerfeld, Germany
                  </Text>
               </View>
            </Section>
            <Section title={'Summary'}>
               <View style={{ marginHorizontal: -15 }}>
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Ordered Date:
                        </Text>
                     </Left>
                     <Right>
                        <Text>
                           {'date'}
                        </Text>
                     </Right>
                  </ListItem>
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Cart Total:
                        </Text>
                     </Left>
                     <Right>
                        <Text>
                           {'date'}
                        </Text>
                     </Right>
                  </ListItem>
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Shipping charges:
                        </Text>
                     </Left>
                     <Right>
                        <Text>
                           {'date'}
                        </Text>
                     </Right>
                  </ListItem>
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Tax:
                        </Text>
                     </Left>
                     <Right>
                        <Text>
                           {'date'}
                        </Text>
                     </Right>
                  </ListItem>
                  <ListItem noIndent>
                     <Left>
                        <Text weight={'bold'}>
                           Total:
                        </Text>
                     </Left>
                     <Right>
                        <Text>
                           {'status'}
                        </Text>
                     </Right>
                  </ListItem>
               </View>
            </Section>
            <Section title={'Order Items'}>
               <View style={{ backgroundColor: '#FFF9DB', padding: 15, borderRadius: 15, marginVertical: 10, }}>
                  <Flex justifyContent={'center'}>
                     <View>

                     </View>
                     <View>
                        <Text>
                           Arrives by April 3 to April 9th
                        </Text>
                     </View>
                  </Flex>
               </View>
               <View style={{ marginHorizontal: -15 }}>
                  <FlatList data={orderItems} keyExtractor={row => row.id} renderItem={renderOrderItem} />
               </View>
            </Section>

         </View>
      </Page>
   )
}
export default ServiceOrderInfo
