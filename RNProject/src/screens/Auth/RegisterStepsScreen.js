import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import { Center } from 'native-base'
import RegisterForm from '@/components/forms/RegisterForm'
import { Button } from '@modules/rn-kit'
import { useNavigation } from '@react-navigation/native'
import Text from '@modules/rn-kit/atoms/Text'
import PagerView from 'react-native-pager-view';
import { SCREEN } from '@/config'

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


const RegisterStepsScreen = (props) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   const nav = useNavigation()
   const pagesRef = useRef()

   return (
      <Page>
         <PagerView ref={pagesRef} style={styles.pagerView} initialPage={0} showPageIndicator={true}>
            <View key={'1'} style={styles.container}>
               <Page.Container>
                  <Page.Title>Create account</Page.Title>
               </Page.Container>
               <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 15, }}>
                  <RegisterForm />
                  {/* <RegisterForm /> */}
               </Center>
               <Page.Container style={{ marginBottom: 30 }}>
                  <View style={{ marginBottom: 15 }}>
                     <Text routeName={'login'} >{__('already_registered')}</Text>
                  </View>
                  <Button title={'Login'} onPress={() => nav.navigate('login')} />
               </Page.Container>
            </View>
            <View key={'2'} style={styles.container}>
               <Page.Container>
                  <Page.Title>Set password</Page.Title>
               </Page.Container>
               <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 15, }}>
                  <RegisterForm />
                  {/* <RegisterForm /> */}
               </Center>
               <Page.Container style={{ marginBottom: 30 }}>
                  <View style={{ marginBottom: 15 }}>
                     <Text routeName={'login'} >{__('already_registered')}</Text>
                  </View>
                  <Button title={'Login'} onPress={() => nav.navigate('login')} />
               </Page.Container>
            </View>
         </PagerView>
      </Page>
   )
}

RegisterStepsScreen.propTypes = {
}

RegisterStepsScreen.defaultProps = {
}

export default RegisterStepsScreen
