import { useFocusEffect } from '@react-navigation/core'
import { Left, List, ListItem, Right } from 'native-base'
import React, { useReducer } from 'react'
import { View } from 'react-native'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { Loading } from 'uikit'
import { Container, Text, Page, } from 'uikit'
import { Button } from 'uikit'
import ErrorMessage from 'uikit/src/molecules/ErrorMessage'
import { alert } from 'uikit/src/utils/alert'
import { colors } from '../../../../src/style/style'
import http, { server } from '../../../../src/utils/http'

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

const WishlistScreen = ({ navigation, route, }) => {
   const { data: orders, status, error } = useQuery('wishlist', async () => {
      return await server().get(`/api/v1/wishlist?page=1`)
   })

   useFocusEffect(() => {
      // navigation.setOptions({
      //    title: order?.title,
      // })
   })

   if (status === 'loading') {
      return (
         <Page>
            <Loading />
         </Page>
      )
   }
   if (status === 'error') {
      return (
         <Page>
            {error && (
               <ErrorMessage error={error} />
            )}
         </Page>
      )
   }
   return (
      <Page title={'Order'}>
         <View padding={0}>
            <Text>{JSON.stringify({ orders })}</Text>
            <List>
               <ListItem noIndent header selected={true} noBorder style={{ backgroundColor: colors.light }} note={'order details'}>
                  <Left>
                     <Text size={20}>Order summary</Text>
                  </Left>
               </ListItem>
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
                        Total:
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
                        Status:
                     </Text>
                  </Left>
                  <Right>
                     <Text>
                        {'status'}
                     </Text>
                  </Right>
               </ListItem>
               <ListItem noIndent>
                  <Button intent={Button.INTENT_DANGER} title={'Cancel'} />
               </ListItem>
            </List>
         </View>
      </Page>
   )
}
export default WishlistScreen
