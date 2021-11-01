import { useFocusEffect } from '@react-navigation/core'
import React from 'react'
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useQuery } from 'react-query'
import { Title } from 'uikit'
import { TextInput } from 'uikit'
import { FormControl } from 'uikit'
import { Loading } from 'uikit'
import { DisplayText } from 'uikit'
import { Page, Text, Container } from 'uikit'
import { sampleCoordinates } from '../../pages/data'
import style from '../../style'
import { server } from '../../utils/http'
import VoucherCard from '../VoucherCard'

const Triangle = (props) => {
   return <View style={[styles.triangle, props.style]} />;
};


const styles = StyleSheet.create({
   postCover: {
      flex: 1,
      width: '100%',
      height: 160,
      resizeMode: 'cover',
      borderRadius: 12,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#eee'
      // padding: 15,
   },
   postItem: {
      marginBottom: 10,
   },
   cardHeading: {
      backgroundColor: 'rgba(255, 255, 255, .8)',
      padding: 6,
      paddingHorizontal: 30,
      borderRadius: 0,
      marginLeft: -10,
      top: 40,
   },
   triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: "solid",
      borderLeftWidth: 16,
      borderRightWidth: 16,
      borderBottomWidth: 15,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: "rgba(255, 255, 255, .8)",
      position: 'absolute',
      right: -23.5,
      top: 8,
      transform: [{ rotate: "90deg" }]
   }
})
export const postImg = require('../../../assets/image043.jpg')

export const PostItem = ({ item, index = 0, onPress, show = 0, rounded = 0 }) => {
   let title = item.title.substring(0, 15)
   return (
      <TouchableOpacity onPress={onPress} style={styles.postItem}>
         <ImageBackground style={styles.postCover} source={{ uri: item.thumbnail }}>
            <View>
               <View style={styles.cardHeading}>
                  <Text >{title}{title.length > 14 ? '...' : ''}</Text>
                  {/* <Text>{JSON.stringify(item)}</Text> */}
                  <Triangle />
               </View>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 7, zIndex: 999, alignItems: 'center', flexDirection: 'column' }}>

               {!show ? (
                  <VoucherCard color={'#E9F2A7'} title={'Feed'} description={() => (
                     <>
                        <DisplayText value={'10'} format="bucks" />
                        <Text>
                           &nbsp;Voucher
                        </Text>
                     </>
                  )} />
               ) : null}
               {/* sd */}
               <VoucherCard color={'#F2D3AC'} title={'Story'} description={() => (
                  <>
                     <DisplayText value={'8'} format="bucks" />
                     <Text>
                        &nbsp;Voucher
                     </Text>
                  </>
               )} />
               {/* <Text>{JSON.stringify({ item })}</Text> */}
            </View>
         </ImageBackground>
      </TouchableOpacity>
   )
}

const ListEmptyComponent = props => {
   return (
      <View>
         <Loading />
      </View>
   )
}
const PostsScreen = ({ navigation }) => {
   const { data: posts } = useQuery('posts', async () => {
      let { data } = await server().get(`/api/v1/posts`)
      return data
   })
   useFocusEffect(() => {

   })
   return (
      <Page>
         {/* <Text>Posts</Text> */}
         {/* <Text>{JSON.stringify(posts?.data)}</Text> */}
         <ImageBackground source={style.bgSource} style={{ width: '100%', height: '100%' }} >
            <Container>
               <FlatList
                  ListHeaderComponent={() => (
                     <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
                        <FormControl>
                           <TextInput placeholder="Search" />
                        </FormControl>
                     </View>
                  )}
                  data={sampleCoordinates}
                  keyExtractor={row => 'tns' + row.id}
                  renderItem={(row) => (
                     <Container>
                        <PostItem onPress={_ => navigation.navigate('Blog', { screen: 'Post', params: {post: row.item,} })} {...row} />
                     </Container>
                  )}
               />
               {/* <FlatList
                  ListHeaderComponent={() => (
                     <View style={{ paddingTop: 15, }}>
                        <FormControl>
                           <TextInput placeholder="Search" />
                        </FormControl>
                     </View>
                  )}
                  data={posts?.data}
                  keyExtractor={row => row.id}
                  renderItem={(row) => (
                     <PostItem {...row} onPress={_ => navigation.navigate('Blog', { screen: 'Post', params: {post: row.item,} })} />
                  )}
                  ListEmptyComponent={ListEmptyComponent}
               /> */}
            </Container>
         </ImageBackground>
      </Page>
   )
}

export default PostsScreen
