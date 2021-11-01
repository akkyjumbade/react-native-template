import { Col, Grid, Left, ListItem, Right, Separator } from 'native-base'
import React, { useMemo } from 'react'
import {FlatList, Image, ImageBackground, Share, StyleSheet, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { Text, Button, Container, Page, Loading } from 'uikit'
import { Flex } from 'uikit'
import StyledBadge from 'uikit/src/atoms/Badge'
import { server } from '../utils/http'
import DisplayText from 'uikit/src/molecules/DisplayText'
// import List from 'uikit/src/atoms/List'
import { connect } from 'react-redux'
import __ from "../utils/locale";
import style from '../style'
import { PostItem } from '../components/posts/PostsScreen'
import { sampleCoordinates } from './data'
import { Icon } from '../../pkgs/uikit'

const styles = StyleSheet.create({
   avatar: {
      borderRadius: 80,
      marginBottom: 5,
      backgroundColor: '#ccc',
      width: 75,
      height: 75,
   },
   bgCover: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: '100%',
      paddingBottom: 15,
      // height: 250,
   },
})

const OrderItem = ({ item, index, onPress}) => {
   return (
      <ListItem noIndent onPress={() => onPress(item)} style={{  paddingVertical: 10, }}>
         <Left style={{ flexDirection: 'column', }}>
            <View >
               <Text>
                  <Text size={16} weight="bold">#{item.code}</Text>
               </Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
               <DisplayText value={item.created_at} format={'datetime'} />
            </View>
            <View style={{ flexDirection: 'row', }}>
               <Text>
                  Items ({item.items?.length}) &nbsp;
               </Text>
               <DisplayText value={item.total} format={'bucks'} />
            </View>
         </Left>
         <Right style={{ flex: 1 }}>
            <View >
               <DisplayText format="label" value={item.status} weight="bold" />
            </View>
         </Right>
      </ListItem>
   )
}
const ServiceOrderItem = ({ item, index, onPress}) => {
   const billInfo = item.service
   // useTh
   return (
      <TouchableOpacity onPress={() => onPress(item)} style={{  paddingVertical: 10, }}>
         <Container>
            <Text>
               Order ID: <Text weight="bold">#{item.code}</Text>
            </Text>
            <Flex alignItems="baseline" justifyContent="space-between">
               <View>
                  <Text>
                     <Text size={17}>{billInfo?.customer_number}</Text>
                  </Text>
                  <Text>
                     <Text weight="bold">Rs. {item.total}</Text>
                  </Text>

               </View>
               <View>
                  {/* <StyledBadge */}
                  <StyledBadge weight="bold">{item.status}</StyledBadge>
               </View>
            </Flex>
            {/* <Text>{JSON.stringify(item)}</Text> */}
         </Container>
      </TouchableOpacity>
   )
}

const Card = ({ title, caption }) => {
   return (
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
         <Text size={28} style={{ margin: 0 }}>{'000'}</Text>
         <View>
            <Text>{caption}</Text>
         </View>
      </View>
   )
}

const DashboardScreen = (props) => {
   const { navigation } = props
   const { navigate } = navigation
   const { user } = props
   const userProfilePhoto = { uri: user?.profile_photo_url }
   const coverImgUrl = 'https://reactjs.org/logo-og.png'
   // const coverSource =
   const { data: recent_transactions, status: transactionsStatus, } = useQuery('recent_transactions', async () => {
      let { data: res } = await server().get(`/api/v1/my_transactions`)
      return res
   })
   const { data: recent_orders, status: ordersStatus, } = useQuery('recent_orders', async () => {
      let { data: res } = await server().get(`/api/v1/my_orders`)
      return res
   })
   const walletBalance = useMemo(() => {
      if (user?.custom_attrs?.wallet_balance) {
         return Number(user?.custom_attrs?.wallet_balance)
      }
      return 0
   }, [user ])
   const ordersCount = useMemo(() => {
      return Number(recent_orders?.total)
   }, [ recent_orders ])
   async function referModal(usr) {
      // alert(usr.refferal_link)
      try {
         Share.share({
            title: 'Refer & earn',
            url: `https://thespot.in/?ref=${usr.refferal_code}`
         }, {
            dialogTitle: 'Refer & earn',
         })
      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <Page scroll={true} >
         <ImageBackground style={styles.bgCover} source={style.bgSource} >
            <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} style={{ alignItems: 'center', marginTop: 15, marginBottom: 30, }}>
               <Image source={userProfilePhoto} style={styles.avatar} />
               <Text size={20}>{user?.name}</Text>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="instagram" size={17} style={{ marginRight: 6, }} />
                  <Text size={13}>@{user?.username}</Text>
               </View>

               <Text size={13}>{'View Profile'}</Text>
               {/* <Text size={13}>{JSON.stringify(user)}</Text> */}
            </TouchableOpacity>
            <Container>
               <Grid style={{ marginHorizontal: -8, marginTop: 20, }}>
                  <Col style={{ paddingHorizontal: 8, }}>
                     <Button title={__('ongoing_deals')} intent={"primary"} />
                  </Col>
                  <Col style={{ paddingHorizontal: 8, }}>
                     <Button title={__('deals_i_like')} intent={"primary"} />
                  </Col>
                  <Col style={{ paddingHorizontal: 8, }}>
                     <Button title={__('Completed deals')} intent={"primary"} />
                  </Col>
               </Grid>
            </Container>
         </ImageBackground>

         <View style={{ marginTop: 15,}}>
            <FlatList
               data={sampleCoordinates}
               keyExtractor={row => 'tns' + row.id}
               renderItem={(row) => (
                  <Container>
                     <PostItem show={1} {...row} />
                  </Container>
               )}
            />
         </View>
      </Page>
   )
}

export default connect(state => ({
   user: state.auth.user,
}))(DashboardScreen)
