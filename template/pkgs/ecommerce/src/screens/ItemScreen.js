/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { $http } from '../../../../src/functions/http'
import useCart from '../../../../src/hooks/useCart'
import { load_category_action } from '../../../../src/store/posts/actions'
import { add_item_cart_action, remove_item_cart_action } from '../../../../src/store/shop/cart_actions'
import Container from 'uikit/src/atoms/Container'
import { Grid, } from 'uikit'
import { Text, Button, Page } from 'uikit'
import { Separator } from 'native-base'
import { Loading, Carousel } from 'uikit'
import { SCREEN } from '../../../../src/config'
import { Flex } from 'uikit'
import HTMLView from 'react-native-htmlview'
import { htmlStyles } from '../../../../src/style/style'
import http from '../../../../src/utils/http'
import ErrorBoundary from '../../../../src/components/ErrorBoundary'
import ItemWidget from '../../../../src/components/molecules/ItemWidget'
import { DisplayText } from 'uikit'

const RelatedItems = ({ item }) => {
   const { isLoading, data } = useQuery(`pro_${item.id}`, async () => {
      const { data: res } = await $http.get(`/api/v1/item_info/${item.id}?with=related`)
      return res
   })
   if (isLoading) {
      return (
         <View style={{ marginVertical: 30, }}>
            <Loading />
         </View>
      )
   }
   return (
      <View>
         <View style={{ marginTop: 30, marginBottom: 15 }}>
            <Text size={22} >Related items</Text>
         </View>

         {/* <Text>{JSON.stringify(data?.related)}</Text> */}
         <Grid style={{ marginHorizontal: -10 }} items={data?.related} colsPerRow={2} render={(row) => (
            <ItemWidget item={row} />
         )} />
      </View>
   )
}

const ItemSlides = ({ slides: items }) => {
   return (
      <View style={{ height: (SCREEN.height / 2), backgroundColor: 'white', marginBottom: 10, }}>
         <Carousel gap={6} height={'100%'} dots={true} slides={items} renderItem={({ item }) => (
            <View style={{ borderRadius: 12, backgroundColor: '#f1f1f1', height: (SCREEN.height / 2), }}>
               <Image source={{ uri: item.src }} style={{ borderRadius: 12, height: (SCREEN.height / 2), }} />
            </View>
         )} />
      </View>
   )
}

const ItemOptionGroup = ({ code, onSelect, options }) => {
   return (
      <View style={{ marginBottom: 15, }}>
         <Text style={{ marginBottom: 6 }}>{code}</Text>
         <Grid gap={6} colsPerRow={4} items={options} render={(row => (
            <TouchableOpacity style={{ backgroundColor: row.value }} onPress={() => onSelect && onSelect(row)}>
               <Text>{row.label}</Text>
            </TouchableOpacity>
         ))} />
      </View>
   )
}

const CartActionButton = ({ variants, item, ...props }) => {
   const optionsGroup = useMemo(() => {
      return variants
   }, [ variants ])
   function onSelect(option) {
      alert(option.label)
   }
   return (
      <ErrorBoundary>
         <View>
            {Object.keys(optionsGroup).map(ok => (
               <ItemOptionGroup onSelect={onSelect} code={ok} options={variants[ok]} />
            ))}
         </View>
      </ErrorBoundary>
   )
}

const ItemScreen = ({ route, navigation }) => {
   const item = route.params.item
   const { data: product, status: loadingStatus } = useQuery(`pro_${item.id}`, async () => {
      const { data } = await http.get(`/api/v1/item_info/${item.id}`)
      return data;
   })
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const cart = useSelector(state => state.cart)

   const isInCart = useMemo(() => {
      if (!Object.values(cart.items)) {
         return null
      }
      return Object.values(cart.items)?.find(ct => item.id === ct?.id)
   }, [cart.items])

   const addToCart = () => {
      try {
         // addItem(item)
         dispatch(add_item_cart_action(item))
         // dispatch({ type: 'CART_ADD', payload: item })
      } catch (error) {
         console.warn({ error })
      }
   }

   const proceedToCheckout = () => {
      navigation.navigate('Cart')
   }

   const removeFromCart = () => {
      try {
         remove_item_cart_action(item)
      } catch (error) {
         console.warn({ error })
      }
   }

   useEffect(() => {
      setLoading(false)
      // dispatch(load_item_action({ payload: route.params.id }))

   }, [route.params])

   useEffect(() => {
      // navigation.setOptions({
      //    title: item?.title
      // })
   }, [item, navigation])

   if (loading && !item) {
      return (
         <Page>
            <Loading />
         </Page>
      )
   }

   return (
      <Page scroll={true}>

         <ItemSlides slides={item.assets} />
         {/* <Image source={{ uri: item.thumbnail }} style={{ marginBottom: 15, width: '100%', height: 250, }} /> */}
         <Carousel slides={item.images} render={row => (
            <TouchableOpacity>
               <Image source={{ uri: row }} style={{ width: 100, height: 100, }} />
            </TouchableOpacity>
         )} />
         <Container>
            <Text size={20} weight="bold" style={{ marginBottom: 6, }}>{item.name}</Text>
            {/* <DisplayText format="bucks" value={item.price} /> */}
            <HTMLView value={`<h3>${item.price_format}</h3>`} stylesheet={htmlStyles}  />
            <HTMLView value={`<article>${item.description}</article>`} stylesheet={htmlStyles}  />
            <View style={{ marginTop: 30, }}>
               {/* {product} */}
               {/* {loadingStatus === 'success' && (
                  <CartActionButton item={product} variants={product?.variants} />
               )} */}

               {isInCart ? (
                  <View>
                     <Button intent="primary" size="lg" title={'Proceed to checkout'} onPress={proceedToCheckout} />
                     <Separator style={{ backgroundColor: 'transparent', height: 15 }} />
                     <Button intent="default" size="lg" title={'Remove from cart'} onPress={removeFromCart} />
                  </View>
               ) : (
                  <Button intent="primary" size="lg" title={'Add to cart'} onPress={addToCart} />
               )}
            </View>
         </Container>
         <Container>
            <RelatedItems item={item} />
         </Container>
      </Page>
   )
}

export default ItemScreen
