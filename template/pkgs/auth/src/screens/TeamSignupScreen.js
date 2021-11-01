import React from 'react'
import { ImageBackground, Pressable, SafeAreaView, ScrollView, View } from 'react-native'
import { Text, Button } from 'uikit'
import { Page, Container } from 'uikit'
import { NavLink, Title } from 'uikit/src/atoms/Text'
import TeamRegisterForm from '../forms/TeamRegisterForm'
import {_t} from "../../../../src/utils/locale";
import style from '../../../../src/style'
import { ThemeContext, useTheme } from 'styled-components/native'

export default function TeamSignupScreen(props) {
   const { navigation: { navigate } } = props
   const theme = useTheme(ThemeContext)
   function onSuccess(ev) {
      navigate('Home')
   }
   return (
      <Page themeColor={'red'}>
         <ImageBackground source={style.bgSource} style={{ width: '100%', height: '100%' }} >
            <View style={{ paddingHorizontal: 15, }}>
               <Title>{_t('Signup As Business')}</Title>
            </View>
            <Container style={{ flex: 1, }}>
               <TeamRegisterForm onSuccess={onSuccess} />
            </Container>
            <Container style={{ marginTop: 15, }}>
               <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <Text style={{ marginBottom: 30, marginTop: 0, flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
                     By clicking Create account, you are agree to our
                     Terms & Conditions
                     and that you have read our Privacy policy
                  </Text>
               </View>

            </Container>
         </ImageBackground>
      </Page>
   )
}
