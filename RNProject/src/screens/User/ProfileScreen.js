import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Avatar, Center, Divider, HStack, List, useToast, VStack } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import Icon from '@modules/rn-kit/atoms/Icon';
import { useNavigation } from '@react-navigation/core';
import { auth_logout_action } from '@/store/auth/auth.actions';
import icons from '@/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import Button from '@modules/rn-kit/atoms/Button';
import { APP_VERSION } from '@/config';
import LogoutActionDialogue from '@/components/dialogues/LogoutActionDialogue';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import useTranslation from '@/hooks/useTranslation';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')

const ProfileScreen = ({ user }) => {
   const nav = useNavigation()
   const __ = useTranslation();
   function loginAsGuest() {

   }
   if (!user) {
      return null
   }
   const { teams = null } = user
   if (!user) {
      return null
   }

   return (
      <Page  >
         <Page.Container>
            <Page.Title>My Account</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>
               <HStack alignItems={'center'} space={4}>
                  {user.isGuest ? (
                     <Avatar source={avatarPlaceholderImage} size={'lg'} />
                  ) : (
                     <Avatar source={{ uri: user.avatar }} size={'lg'} />
                  )}
                  <View style={{ flex: 1, }}>
                     <Text fontSize={'xl'} bold>{user.name}</Text>
                     <HStack space={1} style={{ marginBottom: 4, }} alignItems={'center'}>
                        {/* <Icon name="envelope" style={{ marginRight: 6, }} /> */}
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
                  style={{ marginVertical: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <ErrorBoundary>
                     {teams && teams.map(tm => (
                     <List.Item key={tm.id}>
                        <Text>{tm.title}</Text>
                     </List.Item>
                     ))}
                  </ErrorBoundary>
                  <List.Item >
                     <Text>{__('Orders')}</Text>
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('preferences.notifications')}>
                     <Text>{__('Notification Preferences')}</Text>
                  </List.Item>
                  {/* <Divider /> */}
                  <List.Item onPress={_ => nav.navigate('page', { url: '/terms-and-conditions' })}>
                     <Text>{__('Terms & Conditions')}</Text>
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('page', { url: '/privacy-policy' })}>
                     <Text>{__('Privacy Policy')}</Text>
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
               <Text>{__('version ') + APP_VERSION}</Text>
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
   user: state.auth.user
}))(ProfileScreen);
