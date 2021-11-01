import React from 'react'
import PropTypes from 'prop-types'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, Icon } from 'uikit'
import { Card, Col, Grid } from 'native-base'
import VoucherCard from './VoucherCard'
import { ThemeContext, useTheme } from 'styled-components/native'
import { colors } from '../style/theme'
import { DisplayText } from 'uikit'

const styles = StyleSheet.create({
   img: {
      width: '100%',
      height: 100,
      borderRadius: 10,
      flex: 1,
   },
   postCover: {
      width: '100%',
      height: 160,
      borderRadius: 10,
      overflow: 'hidden',
      resizeMode: 'cover'
   },
   cardHeading: {
      backgroundColor: 'rgba(255, 255, 255, .8)',
      padding: 6,
      paddingHorizontal: 30,
      borderRadius: 0,
      marginLeft: -10,
      top: 90,
      maxWidth: '80%'
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
   },
   postCard: {
      padding: 0,
      marginBottom: 5,
      flexDirection: 'column',
      paddingBottom: 10,
      // borderBottomColor: '#eee',
      // borderBottomWidth: 1
   },
   cardBtn: {
      // alignItems: 'center',
      borderRadius: 10,
      padding: 15,
      elevation: 1.5
   }
})

const Triangle = (props) => {
   return <View style={[styles.triangle, props.style]} />;
};

const NearbyPostCard = ({ onPress, item }) => {
   const { title } = item
   const theme = useTheme(ThemeContext)
   return (
      <>
      <TouchableOpacity onPress={onPress} style={styles.postCard}>
         <ImageBackground resizeMode="cover" source={{ uri: item.thumbnail }} style={styles.postCover}>
            <View style={styles.cardHeading}>
               <Text >{title}{title.length > 14 ? '...' : ''}</Text>
               <Triangle />
            </View>
         </ImageBackground>
         {/* <View style={{ paddingTop: 10, marginBottom: 10 }}>
            <Text>0.2km away</Text>
         </View> */}

      </TouchableOpacity>
      <Grid style={{ marginHorizontal: -5, marginTop: -15, marginBottom: 15 }}>
         <Col style={{ marginHorizontal: 5 }}>
            <Card elevation={0} style={[styles.cardBtn,]}>
               <Text size={15} color={colors.secondary} bold>
                  STORY
               </Text>
               <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <DisplayText format="bucks" value={60} />
                  <Text> Voucher</Text>
               </View>
               <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
                  <Icon color={'#999'} size={17} name="heart" lib="fontisto" />
               </View>
            </Card>
         </Col>
         <Col style={{ marginHorizontal: 5 }}>
            <Card elevation={0} style={[styles.cardBtn,]}>
               <Text size={15} color={colors.secondary} bold>
                  POSTS
               </Text>
               <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <DisplayText format="bucks" value={30} />
                  <Text> Voucher</Text>
               </View>
               <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
                  <Icon color={'#999'} size={17} name="heart" lib="fontisto" />
               </View>
            </Card>
         </Col>
      </Grid>
      </>
   )
}

NearbyPostCard.propTypes = {
   // prop: PropTypes.string
}

NearbyPostCard.defaultProps = {
   // type: 'text'
}

export default NearbyPostCard
