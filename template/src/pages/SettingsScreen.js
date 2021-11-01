import {  CheckBox, Left, List, ListItem, Right, Separator } from 'native-base'
import React, { useMemo } from 'react'
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Button, Text, Page } from 'uikit'
import { auth_logout_action } from 'auth/src/store/actions'
import { Container } from 'uikit'
import UserPersona from 'uikit/src/molecules/UserPersona'
import { Section } from 'uikit'
import { Flex } from 'uikit'
import { Icon } from 'uikit'
import NotificationSettings from '../components/settings/NotificationSettings'
import GeneralSettings from '../components/settings/GeneralSettings'
import SecuritySettings from '../components/settings/SecuritySettings'
import ErrorBoundary from '../components/ErrorBoundary'

const ListItemAction = ({ item, index}) => {
   return (
      <ListItem noIndent>
         <TouchableOpacity onPress={item.onPress} index={index}>
            <Flex key={item.action} style={{ paddingVertical: 0,  }}>
               <View>
                  <Text>{item.title}</Text>
               </View>
            </Flex>
         </TouchableOpacity>
      </ListItem>
   )
}



const SettingsScreen = ({ navigation, config }) => {
   const dispatch = useDispatch()
   const { navigate } = navigation

   const generalActions = [
      {
         action: 'MY_ORDERS',
         title: 'My Orders',
         onPress: () => navigation.navigate('My_Orders')
      },
      {
         action: 'PREFS',
         title: 'Preferences',
         onPress: () => navigation.navigate('Settings')
      },
      {
         action: 'NOTIFICATIONS',
         title: 'Notifications',
         onPress: () => navigation.navigate('Notifications')
      },
      {
         action: 'Wishlist',
         title: 'Wishlist',
         onPress: () => navigation.navigate('Wishlist')
      },
   ]
   const personalActions = [
      {
         action: 'EDIT_PROFILE',
         title: 'Edit profile',
         onPress: () => navigation.navigate('EditProfile')
      },
      {
         action: 'ADDRS',
         title: 'Address book',
         onPress: () => navigation.navigate('My_Addresses')
      },
   ]
   const securityActions = [
      {
         action: 'SEC_LINKED_ACCOUNTS',
         title: 'Linked accounts',
         onPress: () => navigation.navigate('LinkedAccounts')
      },
      {
         action: 'SEC_CHANGEPASSWORD',
         title: 'Change password',
         onPress: () => navigation.navigate('Auth/ChangePassword')
      },
   ]
   const helpActions = [
      {
         action: 'LEGAL_ABOUT',
         title: 'About',
         onPress: () => navigation.navigate('Legal/About')
      },
      {
         action: 'LEGAL_TERMS',
         title: 'Terms & Conditions',
         onPress: () => navigation.navigate('Legal/Terms')
      },
      {
         action: 'LEGAL_PRIVACY',
         title: 'Privacy Policy',
         onPress: () => navigation.navigate('Legal/Privacy')
      },
   ]

   async function onLogoutClick() {
      try {
         dispatch(auth_logout_action())
         setTimeout(() => {
            // navigation.navigate('Signin')
         }, 1000);
      } catch (error) {
         alert(error.message)
      }
   }

   return (
      <Page scroll={true}>
         <Section title={'General'}>
            <View  style={{ marginHorizontal: -15 ,}}>
               <ErrorBoundary>
                  <GeneralSettings />
               </ErrorBoundary>
            </View>
         </Section>
         <Section title={'Notifications'}>
            <View style={{ marginHorizontal: -15 ,}}>
               <ErrorBoundary>
                  <NotificationSettings />
               </ErrorBoundary>
            </View>
         </Section>
         {/* <Section title={'Security'}>
            <View style={{ marginHorizontal: -15 ,}}>
               <ErrorBoundary >
                  <SecuritySettings />
               </ErrorBoundary>
            </View>
         </Section> */}
         {/* <Section title={'Security'}>
            <View style={{ marginHorizontal: -15 ,}}>
               <FlatList data={securityActions} keyExtractor={row => row.action} renderItem={ListItemAction} />
            </View>
         </Section> */}
      </Page>
   )
}

export default connect(state => ({
   config: state.config,
   user: state.auth.user,
}))(SettingsScreen)
