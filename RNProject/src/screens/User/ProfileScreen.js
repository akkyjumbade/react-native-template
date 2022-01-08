import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import {useColorScheme, View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Avatar, Center, Divider, HStack, List, Switch, useTheme, useToast, VStack } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import Icon from '@modules/rn-kit/atoms/Icon';
import { useNavigation } from '@react-navigation/core';
import { auth_logout_action } from '@/store/auth/auth.actions';
import icons from '@/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import Button from '@modules/rn-kit/atoms/Button';
import config, { APP_VERSION } from '@/config';
import LogoutActionDialogue from '@/components/dialogues/LogoutActionDialogue';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import useTranslation from '@/hooks/useTranslation';
import ProfilePhotoUpdate from '@/components/ProfilePhotoUpdate';
import { alert } from '@modules/rn-kit/utils/alert';
import { setThemeAction } from '@/store/options/options.actions';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')

const ProfileScreen = ({ user, isAuthenticated, options }) => {
   const nav = useNavigation()
   const __ = useTranslation();
   const colorScheme = useColorScheme()
   const dispatch = useDispatch()
   console.log({ colorScheme })
   const selectedTheme = useMemo(() => {
      return options.appearance_theme
      // return 'light'
   }, [ options ])
   function loginAsGuest() {

   }
   function toggleDarkModel() {
      dispatch(setThemeAction(options.appearance_theme === 'light' ? 'dark' : 'light'))
   }
   function inAppReviewDialogue() {
      alert('Open in app review dialogue')
   }
   if (!user) {
      return null
   }
   const { teams = null } = user
   if (!user) {
      return null
   }

   return (
      <Page scroll={true}>
         <Page.Container>
            <Page.Title>My Account</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>
               <HStack alignItems={'center'} space={4}>
                  {!isAuthenticated ? (
                     <Fragment>
                        <ProfilePhotoUpdate>
                           <Avatar source={avatarPlaceholderImage} size={'lg'} />
                        </ProfilePhotoUpdate>
                     </Fragment>
                  ) : (
                     <Fragment>
                        <ProfilePhotoUpdate>
                           <Avatar source={{ uri: user.avatar }} size={'lg'} />
                        </ProfilePhotoUpdate>
                     </Fragment>
                  )}
                  <View style={{ flex: 1, }}>
                     <Text fontSize={'xl'} bold>{user.name}</Text>
                     <HStack space={1} style={{ marginBottom: 4, }} alignItems={'center'}>
                        <icons.email width={16} height={16} />
                        <Text>{user.email}</Text>
                     </HStack>
                     <HStack space={1} style={{ marginBottom: 4, }} alignItems={'center'}>
                        <icons.phone width={16} height={16} />
                        <Text>{user.phone}</Text>
                     </HStack>
                  </View>
                  <View style={{ marginLeft: 10, }}>
                     <TouchableOpacity onPress={() => nav.navigate('profile.edit')}>
                        <icons.chevronRightIcon width={28} height={28} color={'gray'} />
                     </TouchableOpacity>
                  </View>
               </HStack>
               <List
                  style={{ marginBottom: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <ErrorBoundary>
                     <Fragment>
                        {(teams?.length) && teams.map(tm => (
                        <List.Item key={tm.id}>
                           <Text>{tm.title}</Text>
                        </List.Item>
                        ))}
                     </Fragment>
                  </ErrorBoundary>
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Billing')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('Sample address, MH, 400703')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('security')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Security')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('preferences')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Preferences')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
               </List>
               <List
                  style={{ marginBottom: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <List.Item >
                     <Text bold fontSize={'15'}>{__('Help')}</Text>
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('page', { url: '/terms-and-conditions' })}>
                     <Text>{__('Terms & Conditions')}</Text>
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('page', { url: '/privacy-policy' })}>
                     <Text>{__('Privacy Policy')}</Text>
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('page', { url: '/faq' })}>
                     <Text>{__('FAQ')}</Text>
                  </List.Item>
                  <List.Item onPress={inAppReviewDialogue}>
                     <Text>{__('Give Feedback')}</Text>
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('about')}>
                     <Text>{__('About')}</Text>
                  </List.Item>
               </List>
            </View>
         </Center>
         <Page.Container>
            <VStack space={1} style={{ marginBottom: 20, alignItems: 'center', width: '100%' }}>
               <VStack space={1} style={{ marginBottom: 5, alignItems: 'center' }}>
                  <Text>{__('Logged in as')}</Text>
                  <Text>{user.email}</Text>
               </VStack>
               <Text>{__('version ') + config.appVersion}</Text>
            </VStack>
            <View style={{ marginBottom: 20 }}>
               <ErrorBoundary>
                  <LogoutActionDialogue renderButton={(btnprops) => (
                     <Button title={'Logout'} {...btnprops} />
                  )} />
               </ErrorBoundary>
            </View>
         </Page.Container>
      </Page>
   );
};

ProfileScreen.propTypes = {
   // prop: PropTypes.string
};

ProfileScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   options: state.options,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(ProfileScreen);
