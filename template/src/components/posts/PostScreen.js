import { Col, Grid, Separator } from 'native-base'
import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { DisplayText } from 'uikit'
import { Container } from 'uikit'
import { Button } from 'uikit'
import { Page, Text } from 'uikit'
import { Title } from 'uikit/src/atoms/Text'
import style from '../../style'
import VoucherCard from '../VoucherCard'

const styles = StyleSheet.create({
   bgCover: {
      flex: 1,
      width: '100%',
      height: 180,
      resizeMode: 'cover',
      // borderRadius: 12,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor: 'gray'
   },
   triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: "solid",
      borderLeftWidth: 15,
      borderRightWidth: 15,
      borderBottomWidth: 15,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: "rgba(255, 255, 255, .8)",
      position: 'absolute',
      right: -22,
      top: 8,
      transform: [{ rotate: "90deg" }]
   },
   cardHeading: {
      backgroundColor: 'rgba(255, 255, 255, .8)',
      padding: 6,
      paddingHorizontal: 30,
      borderRadius: 0,
      marginLeft: -10,
      top: 40,
   },
})


const Triangle = (props) => {
   return <View style={[styles.triangle, props.style]} />;
 };

const postImg = require('../../../assets/image043.jpg')

const PostScreen = ({ navigation, route }) => {
   const postParam = route?.params?.post
   useEffect(() => {
      navigation.setOptions({
         title: postParam?.title
      })
   }, [navigation, postParam?.title])
   return (
      <Page>
         <ImageBackground source={style.bgSource} style={{ width: '100%', height: '100%' }} >
            <ImageBackground source={postImg} style={styles.bgCover}>
               {/* <Text>Posts</Text> */}
               {/* <Text>{JSON.stringify({ postParam })}</Text> */}
               <View style={styles.cardHeading}>
                  <Text>{'Sample #1'}</Text>
                  <Triangle />
               </View>
            </ImageBackground>
            <Container style={{ marginTop: 20, }}>
               <View style={{ marginBottom: 15, }}>
                  <Text size={17}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
               </View>
               <View style={{ marginBottom: 15, }}>
                  <Text size={17}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
               </View>
               <Grid>
                  <Col>
                     <VoucherCard color={'#E9F2A7'} title={'Feed'} description={() => (
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <DisplayText value={'10'} format="bucks" />
                        <Text>&nbsp;Voucher</Text>
                     </View>
                     )} />
                  </Col>
                  <Col style={{ width: 15, }}></Col>
                  <Col>
                     <VoucherCard color={'#F2D3AC'} title={'Story'} description={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                           <DisplayText value={'8'} format="bucks" />
                           <Text>&nbsp;Voucher</Text>
                        </View>
                     )} />
                  </Col>
               </Grid>
               {/* <Button title="Deals" onPress={_ => navigation.navigate('Blog', { screen: 'Deals', post: postParam })} /> */}
               {/* <Separator backgroundColor={'white'} height={15} />
               <Button title="Reviews" onPress={_ => navigation.navigate('Blog', { screen: 'PostReviews', post: postParam })} />
               <Separator backgroundColor={'white'} height={15} />
               <Button title="Report" onPress={_ => navigation.navigate('Blog', { screen: 'PostReport', post: postParam })} /> */}
            </Container>
         </ImageBackground>
      </Page>
   )
}

export default PostScreen
