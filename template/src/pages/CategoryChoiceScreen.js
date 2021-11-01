import React, {useMemo} from 'react'
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native'
import { Button, Text, Container, Page } from 'uikit'
import {SCREEN} from "../config";
import {Col, Grid, Row} from "native-base";
import _ from "lodash";
import { Icon } from 'uikit';
import { useDispatch, useSelector } from 'react-redux';
import configActions from '../store/config/actions'
import AppIcon from 'uikit/src/atoms/AppIcon';
const styles = StyleSheet.create({
   bgCover: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: '100%',
      height: SCREEN.height,
      backgroundColor: '#aaa'
   },
   card: {
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: 10,
   }
})

export const cats = [
   {
      title: 'Food',
      thumbnail: 'utensils',
      image: require('../../assets/icon_1.png'),
      themeColor: '#F2D3AC',
   },
   {
      title: 'Hotels',
      thumbnail: 'hotel',
      image: require('../../assets/icon_2.png'),
      themeColor: '#D9BBD5',
   },
   {
      title: 'Beauty',
      thumbnail: 'female',
      image: require('../../assets/icon_3.png'),
      themeColor: '#EFE7B6',
   },
   {
      title: 'Experiences',
      thumbnail: 'parachute-box',
      image: require('../../assets/icon_5.png'),
      themeColor: '#F8C2D9',
   },
   {
      title: 'City highlights',
      thumbnail: 'city',
      image: require('../../assets/icon_4.png'),
      themeColor: '#E9F2A7',
   },
   {
      title: 'Products',
      thumbnail: 'cubes',
      image: require('../../assets/icon_6.png'),
      themeColor: '#B6E1F2',
   },
]

export const CategoryCard = ({ title, onPress, image, thumbnail, themeColor }) => {
   let cardHeight = '100%';
   function onLayout(event) {
      const {x, y, width, height} = event.nativeEvent.layout;
      cardHeight = height
   }
   return (
      <TouchableOpacity onPress={onPress} onLayout={onLayout} style={{ height: cardHeight, ...styles.card }}>
         <View style={{ backgroundColor: themeColor, padding: 15, borderRadius: 150, marginBottom: 10 }}>
            <Image source={image} style={{ width: 36, height: 36, marginBottom: 0, }} resizeMode="contain" />
         </View>
         {/* <Icon size={30} color={'#4c5561'} name={thumbnail} lib="FontAwesome5"  style={{ marginBottom: 6, }} /> */}
         <Text weight="bold">{title}</Text>
      </TouchableOpacity>
   )
}

export const CategoriesGrid = ({ categories, onPress }) => {
   const rows = useMemo(() => {
      return _.chunk(categories, 3)
   }, [ categories ])

   return (
   <Grid style={{ maxHeight: SCREEN.height / 2.5, marginHorizontal: -8 }}>
      {rows && rows.map((row, row_k) => (
         <Row style={{ marginBottom: 10, }} key={row_k}>
            {row.map((cat, cat_index) => (
               <Col style={{ paddingHorizontal: 8, }} key={'item-' + cat_index}>
                  <CategoryCard onPress={() => onPress(cat)} {...cat} />
               </Col>
            ))}
         </Row>
      ))}
   </Grid>
   )
}

const CategoryChoiceScreen = ({ navigation }) => {
   const coverImgUrl = require('../../assets/background.jpg')
   const dispatch = useDispatch()

   function onCardClick(item) {
      navigation.navigate('Market')
      dispatch(configActions.setPreferredChoice(item.title))
   }
   return (
      <Page scroll={false} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <ImageBackground source={coverImgUrl} style={styles.bgCover}>
            <View style={{ paddingHorizontal: 50, flex: 1, justifyContent: 'center' }}>
               <AppIcon />
               <CategoriesGrid categories={cats} onPress={onCardClick} />
            </View>
         </ImageBackground>
      </Page>
   )
}

export default CategoryChoiceScreen
