import React, { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import Text from "@modules/rn-kit/atoms/Text";
import { Center, HStack, Image } from 'native-base';
import PagerView from 'react-native-pager-view';

import Button from '@modules/rn-kit/atoms/Button';
import IconButton from '@modules/rn-kit/atoms/IconButton';
import { SCREEN } from '@/config';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
   pagerView: {
      flex: 1,
      width: '100%',
      // backgroundColor: 'red'
   },
   container: {
      flex: 1,
      width: '100%',
      // backgroundColor: 'red'
   },
   buttonCircle: {
     width: 40,
     height: 40,
     backgroundColor: 'rgba(0, 0, 0, .2)',
     borderRadius: 20,
     justifyContent: 'center',
     alignItems: 'center',
   },
   banner: {
      width: (SCREEN.width - 0),
      height: (SCREEN.height - 0),
   },
   slide: {

   }
   //[...]
 });

const slides = [
   {
      key: 1,
      title: 'sfdf',
      text: 'sfdf',
      image: require('../../assets/intro_placeholder.png'),
      backgroundColor: '#febe29',
   },
   {
      key: 2,
      title: 'sfdf',
      text: 'sfdf',
      image: require('../../assets/intro_placeholder.png'),
      backgroundColor: '#febe29',
   },
   {
      key: 3,
      title: 'sfdf',
      text: 'sfdf',
      image: require('../../assets/intro_placeholder.png'),
      backgroundColor: '#febe29',
   },
]

const RenderSlide = ({ item }) => {
   return (
      <View style={styles.slide}>
         <Image source={item.image} style={styles.banner} />
      </View>
   )
}

const PrevButton = (nextBtnProps) => (
   <Button title={'Prev'} {...nextBtnProps} />
)
const NextButton = (nextBtnProps) => {
   return (
      <Button title={'Next'} {...nextBtnProps} />
   )
}

const DoneButton = (nextBtnProps) => {
   const nav = useNavigation()
   return (
      <Button onPress={() => nav.navigate('auth')} title={'Get Started'} {...nextBtnProps} />
   )
}
const WelcomeScreen = (props) => {
   const __ = useTranslation()
   const pagesRef = useRef()
   const goToNext = useCallback((pageIndex) => {
      pagesRef.current?.setPage(pageIndex)
   }, [])
   return (
      <Page >
         <PagerView ref={pagesRef} style={styles.pagerView} initialPage={0} showPageIndicator={true}>
            <Center key="1" style={styles.container}>
               <Center style={{ flex: 1 }}>
                  <View style={{ width: '100%', height: '100%' }}>
                     <Image source={require('../../assets/intro_placeholder.png')} style={styles.banner}  />
                     <Text>First page</Text>
                  </View>
               </Center>
               <HStack justifyContent={'space-between'} style={{ marginBottom: 30, width: '100%', paddingHorizontal: 15 }}>
                  <View>
                     {/* empty */}
                  </View>
                  <View>
                     <IconButton icon="chevronRightIcon" onPress={() => goToNext(1)} />
                  </View>
               </HStack>
            </Center>
            <Center key="2" style={styles.container}>
               <Center style={{ flex: 1 }}>
                  <View style={{ width: '100%', height: '100%' }}>
                     <Image source={require('../../assets/intro_placeholder.png')} style={styles.banner}  />
                     <Text>Second page</Text>
                  </View>
               </Center>
               <HStack justifyContent={'space-between'} style={{ marginBottom: 30, width: '100%', paddingHorizontal: 15 }}>
                  <View>
                     <IconButton icon="chevronLeftIcon" onPress={() => goToNext(0)} />
                  </View>
                  <View>
                     <IconButton icon="chevronRightIcon" onPress={() => goToNext(2)} />
                  </View>
               </HStack>
            </Center>
            <Center key="3" style={styles.container}>
               <Center style={{ flex: 1 }}>
                  <View style={{ width: '100%', height: '100%' }}>
                     <Image source={require('../../assets/intro_placeholder.png')} style={styles.banner}  />
                     <Text>Second page</Text>
                  </View>
               </Center>
               <HStack justifyContent={'space-between'} style={{ marginBottom: 30, width: '100%', paddingHorizontal: 15 }}>
                  <View>
                     {/* <PrevButton onPress={() => goToNext(1)} /> */}
                     <IconButton icon="chevronLeftIcon" onPress={() => goToNext(1)} />
                  </View>
                  <View>
                     <DoneButton />
                  </View>
               </HStack>
            </Center>
         </PagerView>
         {/* <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
            <View>
               <HStack justifyContent={'space-between'} style={{ marginBottom: 30, width: '100%', paddingHorizontal: 15 }}>
                  <View>
                     <PrevButton onPress={() => goToNext(0)} />
                  </View>
                  <View>
                     <NextButton onPress={() => goToNext(2)} />
                  </View>
               </HStack>
            </View>
         </View> */}
      </Page>
   )
}

WelcomeScreen.propTypes = {
   // prop: PropTypes.string
}

WelcomeScreen.defaultProps = {

}

export default WelcomeScreen
