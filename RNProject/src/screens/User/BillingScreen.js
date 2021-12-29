import React, { Fragment } from 'react';
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
import config, { APP_VERSION } from '@/config';
import LogoutActionDialogue from '@/components/dialogues/LogoutActionDialogue';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import useTranslation from '@/hooks/useTranslation';
import ProfilePhotoUpdate from '@/components/ProfilePhotoUpdate';
import { alert } from '@modules/rn-kit/utils/alert';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')

const BillingScreen = ({ user, isAuthenticated }) => {
   const nav = useNavigation()
   const __ = useTranslation();

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
            <Page.Title>Billing</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>
               <List
                  style={{ marginBottom: 15, borderWidth: 0 }}
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
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Country')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('IN')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Default currency')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('INR')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('billing')}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('Timezone')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{__('Asia/Kolkata')}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
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
               </List>
            </View>
         </Center>
         <Page.Container>
            <VStack space={1} style={{ marginBottom: 20, alignItems: 'center', width: '100%' }}>
               {/* <VStack space={1} style={{ marginBottom: 5, alignItems: 'center' }}>
                  <Text>{__('Logged in as')}</Text>
                  <Text>{user.email}</Text>
               </VStack>
               <Text>{__('version ') + config.appVersion}</Text> */}
            </VStack>
            <View style={{ marginBottom: 20 }}>
               {/* <ErrorBoundary>
                  <LogoutActionDialogue renderButton={(btnprops) => (
                     <Button title={'Logout'} {...btnprops} />
                  )} />
               </ErrorBoundary> */}
            </View>
         </Page.Container>
      </Page>
   );
};

BillingScreen.propTypes = {
   // prop: PropTypes.string
};

BillingScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(BillingScreen);
