import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { Linking, View } from 'react-native'
import { Text, Loading, Page } from 'uikit'

const AdsPage = ({ post }) => {
   // const nav = useNavigation()
   useEffect(() => {
      // nav.navigate('')
      Linking.openURL(post.target_url)
      // alert('Opening: '+ post.target_url)
   }, [post])
   return (
      <View>
         <Loading />
         <Text>
            {/* {JSON.stringify({ post })} */}
         </Text>
      </View>
   )
}

export default function PostInfo({ route, navigation }) {
   const post = route.params.post
   if (post?.type == 'ads') {
      return (
         <Page>
            <AdsPage post={post} />
         </Page>
      )
   }
   return (
      <Page>
         <Text>
            {/* {JSON.stringify({ post })} */}
            <Loading />
         </Text>
      </Page>
   )
}
