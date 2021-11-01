import {  Left, List, ListItem, Right, Separator } from 'native-base'
import React, { useMemo } from 'react'
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Text, Page, DisplayText} from 'uikit'
import { auth_logout_action } from 'auth/src/store/actions'
import { alert } from 'uikit/src/utils/alert'
import { Container } from 'uikit'
import UserPersona from 'uikit/src/molecules/UserPersona'
import { Section } from 'uikit'
import { Flex } from 'uikit'
import { Icon } from 'uikit'
import __ from "../utils/locale";

const ListItemAction = ({ item, index, isLastIndex }) => {
   return (
      <ListItem noIndent noBorder={isLastIndex} onPress={item.onPress} index={index}>
         <Flex key={item.action} style={{ paddingVertical: 0,  }}>
            <View>
               <Text>{item.title}</Text>
            </View>
         </Flex>
      </ListItem>
   )
}

export default function MyProfileScreen({ navigation, }) {
   const user = useSelector(state => state.auth.user)
   const dispatch = useDispatch()
   const { navigate } = navigation
   const resources = useSelector(state => state.resources)

   const generalActions = [
      // {
      //    action: 'MY_ORDERS',
      //    title: __('My Orders'),
      //    // onPress: () => navigation.navigate('My_Orders')
      // },
      {
         action: 'PREFS',
         title: __('preferences'),
         onPress: () => navigation.navigate('Settings')
      },
      {
         action: 'NOTIFICATIONS',
         title: __('notifications'),
         onPress: () => navigation.navigate('Notifications')
      },
      // {
      //    action: 'Wishlist',
      //    title: __('wishlist'),
         // onPress: () => navigation.navigate('Wishlist')
      // },
      {
         action: 'Saved',
         title: __('saved-menu'),
         // onPress: () => navigation.navigate('SavedCollection')
      },
   ]
   const personalActions = [
      {
         action: 'EDIT_PROFILE',
         title: __('profile-edit-menu'),
         // onPress: () => navigation.navigate('EditProfile')
      },
   ]
   const securityActions = [
      {
         action: 'SEC_CHANGEPASSWORD',
         title: __('change-password'),
         // onPress: () => navigation.navigate('PasswordLost')
      },
      // {
      //    action: 'SEC_LINKED_ACCOUNTS',
      //    title: __('linked-accounts'),
         // onPress: () => navigation.navigate('LinkedAccounts')
      // },
      // {
      //    action: 'SEC_SESSIONS',
      //    title: __('sessions'),
      //    // onPress: () => navigation.navigate('MySessions')
      // },
   ]
   const teamActions = [
      // {
      //    action: 'MENU_CREATE_TEAM',
      //    title: __('menu-create-team'),
      //    onPress: () => navigation.navigate('TeamStack', {
      //       screen: 'TeamRegister'
      //    })
      // },
      {
         action: 'MENU_TEAMS',
         title: __('menu-teams'),
         onPress: () => navigation.navigate('MyTeams', {
            screen: 'Teams'
         })
      },
   ]
   const helpActions = [
      {
         action: 'LEGAL_TERMS',
         title: __('terms-menu'),
         onPress: () => navigation.navigate('Terms')
      },
      {
         action: 'LEGAL_PRIVACY',
         title: __('privacy-policy'),
         onPress: () => navigation.navigate('Privacy')
      },
      {
         action: 'APP_VERSION',
         title: __('App Version: v1.0.0'),
         // onPress: () => navigation.navigate('Pages/Privacy')
      },
   ]

   async function onLogoutClick() {
      try {
         dispatch(auth_logout_action())
         setTimeout(() => {
            navigation.navigate('Signin')
         }, 1000);
      } catch (error) {
         alert(error.message)
      }
   }
   if (!user  || !user.email) {
      return null
   }

   return (
      <Page scroll={true}>
         <View style={{ marginTop: 10, }}>
            <UserPersona user={user} inline={true} />
         </View>
         {/* <Text>{JSON.stringify({ resources })}</Text> */}
         <List style={{ flex: 1, }}>
            <ListItem noIndent onPress={() => navigate('EditProfile', {
               field: 'name'
            })}>
               <Left>
                  <Text>{__('name')}</Text>
               </Left>
               <Right style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Text>{user?.name}</Text>
                  <Icon style={{ marginLeft: 6,  }} color={'#333'} name="pen" lib="FontAwesome5" />
               </Right>

            </ListItem>
            <ListItem noIndent onPress={() => navigate('EditProfile', {
               field: 'email'
            })}>
               <Left>
                  <Text>{__('email')}</Text>
               </Left>
               <Right style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <DisplayText value={user.email} format={'email'} />
                  <Icon style={{ marginLeft: 6,  }} color={'#333'} name="pen" lib="FontAwesome5" />
               </Right>
            </ListItem>
            <ListItem noIndent onPress={() => navigate('EditProfile', {
               field: 'phone'
            })}>
               <Left>
                  <Text>{__('phone')}</Text>
               </Left>
               <Right style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <DisplayText value={user.phone} format={'phone'} />
                  <Icon style={{ marginLeft: 6,  }} color={'#333'} name="pen" lib="FontAwesome5" />
               </Right>
            </ListItem>
            <ListItem noIndent>
               <Left>
                  <Text>{__('referral_code')}</Text>
               </Left>
               <Right style={{ flex: 1, }}>
                  <DisplayText value={user?.refferal_code} format={'code'} />
               </Right>
            </ListItem>
            <ListItem noIndent>
               <Left>
                  <Text>{__('regd_at')}</Text>
               </Left>
               <Right style={{ flex: 1, }}>
                  <DisplayText value={user?.created_at} format={'date'} />
               </Right>
            </ListItem>
         </List>
         <Section title={__('general_settings')}>
            <View style={{ marginHorizontal: -15 }}>
               <FlatList
                  data={generalActions}
                  keyExtractor={row => row.action}
                  renderItem={row => (
                     <ListItemAction {...row} isLastIndex={(generalActions.length -1 ) === row.index} />
                  )} />
            </View>
         </Section>
         <Section title={__('personal_settings')}>
            <View style={{ marginHorizontal: -15 }}>
               <FlatList
                  data={personalActions}
                  keyExtractor={row => row.action}
                  renderItem={row => (
                     <ListItemAction {...row} isLastIndex={(personalActions.length -1 ) === row.index} />
                  )} />
            </View>
         </Section>
         {/* <Section title={user?.team?.name}>
            <Text>{JSON.stringify(user.team)}</Text>
            <View style={{ marginHorizontal: -15 }}>
               <FlatList
                  data={teamActions}
                  keyExtractor={row => row.action}
                  renderItem={row => (
                  <ListItemAction {...row} isLastIndex={(teamActions.length -1 ) === row.index} />
               )} />
            </View>
         </Section> */}
         <Section title={__('security_settings')}>
            <View style={{ marginHorizontal: -15 }}>
               <FlatList
                  data={securityActions}
                  keyExtractor={row => row.action}
                  renderItem={row => (
                     <ListItemAction {...row} isLastIndex={(securityActions.length -1 ) === row.index} />
                  )} />
            </View>
         </Section>
         <Section title={__('help_settings')}>
            <View style={{ marginHorizontal: -15 }}>
               <FlatList
                  data={helpActions}
                  keyExtractor={row => row.action}
                  renderItem={row => (
                     <ListItemAction {...row} isLastIndex={(helpActions.length -1 ) === row.index} />
                  )} />
            </View>
         </Section>

         <Container style={{ marginVertical: 40, }}>
            <Button intent={Button.INTENT_DEFAULT} block size={Button.SIZE_LG} title={__('logout-btn')} onPress={onLogoutClick} />
         </Container>
      </Page>
   )
}
