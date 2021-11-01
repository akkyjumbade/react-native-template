/* eslint-disable react-native/no-inline-styles */
import chunk from 'lodash/chunk'
import React, { Fragment, useEffect, useMemo } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Loading, Text, Picture, Carousel, Page } from 'uikit'
import PostsScreen from '../components/posts/PostsScreen'
import useNotification from '../utils/useNotification'

const HomeScreen = ({ navigation }) => {
   const service = useSelector(state => state.service)
   const posts = useSelector(state => state.posts)
   const {status} = useNotification()

   const ads = useMemo(() => {
      let limitedItems = posts.posts?.ads?.slice(0, 12)
      return posts && chunk(limitedItems, 4)
   }, [posts])
   const services = useMemo(() => {
      if (posts.services) {
         return posts && chunk(posts.services, 4)
      }
      return service && chunk(service.services, 4)
   }, [service, posts])

   return (
      <PostsScreen navigation={navigation} />
   )
}

export default HomeScreen

const styles = StyleSheet.create({
   gridView: {
   //   marginTop: 10,
     flex: 1,
     width: '100%'
   },
   itemContainer: {
     justifyContent: 'flex-end',
     borderRadius: 5,
     padding: 10,
     flex: 1,
   //   height: 150,
   },
   itemName: {
     fontSize: 14,
   //   color: '#fff',
   //   fontWeight: '600',
   },
   itemCode: {
   //   fontWeight: '600',
     fontSize: 12,
   //   color: '#fff',
   },
});
