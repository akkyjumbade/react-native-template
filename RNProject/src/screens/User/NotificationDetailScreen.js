import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { Avatar, Box, Center, Divider, HStack, List, Select, useToast, VStack } from 'native-base';
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
import Card from '@/components/Card';
import { useFormik } from 'formik';
import CheckIcon from '@/icons/CheckIcon';
// import ErrorMessage from '@modules/rn-kit/molecules/ErrorMessage';
// import { Button } from 'packages/rn-kit';
const avatarPlaceholderImage = require('../../../assets/avatar_placeholder.jpeg')
import timezones from '@/config/timezones'
import { useLocale } from '@/providers/LocaleProvider';
import * as RNLocalize from 'react-native-localize'

const NotificationDetailScreen = ({ navigation, user, route: { params }, isAuthenticated, initialValues = {} }) => {
   const __ = useTranslation();
   const { notification } = params
   const formik = useFormik({
      initialValues
   })
   if (!user) {
      return null
   }

   return (
      <Page  >
         <Page.Container>
            <Page.Title>{notification?.title ?? 'Notification'}</Page.Title>
         </Page.Container>
         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1, }}>
               <Text>{JSON.stringify({ notification })}</Text>
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
               {formik.dirty && (
               <ErrorBoundary>
                  <ButtonPrimary disabled={!formik.dirty} title={'Update'} />
               </ErrorBoundary>
               )}
            </View>
         </Page.Container>
      </Page>
   );
};

NotificationDetailScreen.propTypes = {
   // prop: PropTypes.string
};

NotificationDetailScreen.defaultProps = {
   // type: 'text',
};

export default connect(state => ({
   user: state.auth.user,
   isAuthenticated: parseInt(state.auth.user?.id) > 0,
}))(NotificationDetailScreen);
