import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Text } from '../..'
import { colors } from '../../../../src/style/style'

const List = props => {
   const { title } = props
   return (
      <View>
         {title && (
            <Container>
               <Text size={16} weight="bold">{title}</Text>
            </Container>
         )}
         {props.children}
      </View>
   )
}

export const List_Item = props => {
   const { label, caption } = props
   return (
      <View style={styles.list_item_container}>
         <View style={styles.list_item}>
            <Container>
               <Text size={15}>{label}</Text>
               {props.children}
               {props.right && props.right()}
            </Container>
         </View>
         {caption && (
            <Container>
               <View style={{ marginTop: 6, marginBottom: 15 }}>
                  <Text color={colors.gray}>{caption}</Text>
               </View>
            </Container>
         )}
      </View>
   )
}

List.Item = List_Item

const styles = StyleSheet.create({
   list_item: {
      backgroundColor: 'white',
      paddingVertical: 8,
      minHeight: 30
   },
   list_item_container: {

   }
})

export default List
