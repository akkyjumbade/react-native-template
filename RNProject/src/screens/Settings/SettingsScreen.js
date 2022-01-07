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
import SwitchControl from '@modules/rn-kit/molecules/SwitchControl';
import ThemeChangeControl from '@modules/rn-kit/molecules/ThemeChangeControl';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')

const SettingsScreen = ({ user, isAuthenticated, options }) => {
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
            <Page.Title>Preferences</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>
               <List
                  style={{ marginBottom: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >

                  <List.Item onPress={() => nav.navigate('profile.change_password')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Region')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('profile.change_password')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Language')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('en-US')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={console.log}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Dark mode?')}</Text>
                        </View>
                        <View>
                           {/* <Switch isChecked={selectedTheme === 'dark'} onToggle={toggleDarkModel} /> */}
                           {/* <icons.chevronRightIcon width={24} height={24} /> */}
                           <ThemeChangeControl />
                        </View>
                     </HStack>

                     {/* <SwitchControl value={selectedTheme} /> */}
                  </List.Item>
                  <List.Item onPress={_ => nav.navigate('preferences.notifications')}>
                     <Text>{__('Notifications')}</Text>
                  </List.Item>

               </List>
            </View>
         </Center>
      </Page>
   );
};

SettingsScreen.propTypes = {
   // prop: PropTypes.string
};

SettingsScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   options: state.options,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(SettingsScreen);
