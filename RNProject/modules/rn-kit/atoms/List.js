import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Text } from '..'
import { List_Item } from './List_Item'

const List = ({ title, children, ...props }) => {
   return (
      <View>
         {title && (
            <Container>
               <Text size={16} weight="bold">{title}</Text>
            </Container>
         )}
         {children}
      </View>
   )
}

List.Item = List_Item

export const styles = StyleSheet.create({
   list_item: {
      backgroundColor: 'white',
      paddingVertical: 8,
      minHeight: 30
   },
   list_item_container: {

   }
})

export default List
