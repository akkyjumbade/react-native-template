import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'uikit'
import { Text } from 'uikit'
import { add_wishlist_action } from '../../store/shop/wishlist_reducer'
import { htmlStyles } from '../../style/style'

const WishlistAction = ({ item }) => {
   const wishlistItems = useSelector(state => state.wishlist.items)
   const dispatch = useDispatch()

   const isInSaved = useMemo(() => {
      return wishlistItems[item.id]
   }, [wishlistItems, item])
   function toggleWishlistItem() {
      // alert('Adding to wishlist...')
      dispatch(add_wishlist_action(item))
   }
   return (
      <View>
         <Icon size={22} name="heart" color={isInSaved ? 'red' : 'black'} onPress={toggleWishlistItem} />
      </View>
   )
}

const ItemWidget = props => {
   const navigation = useNavigation()
   const { item } = props

   return (
      <View style={{ position: 'relative', }}>
         <View style={styles.WishlistAction}>
            <WishlistAction item={item} />
         </View>
         <TouchableOpacity style={{ marginBottom: 20, padding: 8 }} onPress={() => navigation.navigate('ECommerce', { screen: 'Item', params: { item } })}>
            <Image source={{ uri: item.thumbnail }} style={{ borderRadius: 10, marginBottom: 15, width: '100%', height: 200, }} />
            {item.category && (
               <Text size={10}>{item.category}</Text>
            )}
            <Text >{item.name}</Text>
            <HTMLView value={`<small>${item.price_format}</small>`} stylesheet={htmlStyles}  />
         </TouchableOpacity>
      </View>
   )
}

export default ItemWidget

const styles = StyleSheet.create({
   WishlistAction: {
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: 99
   }
})
