/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {View, FlatList } from 'react-native';
import {connect, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import { List, useToast, VStack, Divider, HStack, Switch } from 'native-base';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import useApiQuery from '@/hooks/useApiQuery';
import Empty from '@/components/Empty';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import Text from '@modules/rn-kit/atoms/Text';
import Alert from '@modules/rn-kit/molecules/Alert';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { List_Item } from '@modules/rn-kit/atoms/List_Item';
import usePreferencesQuery from '@/api/usePreferencesQuery';
import { IconButton } from '@modules/rn-kit/atoms';
// import { ToggleButtonClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';


const MembersScreen = ({ options, user, token }) => {
   const __ = useTranslation();
   const toast = useToast()
   const nav = useNavigation()
   const { notificationChannels, broadcastChannels, isLoading, error, updatePreferencesAsync, isUpdating } = usePreferencesQuery()
   useEffect(() => {
      if (error) {
         toast.show({
            title: JSON.stringify(error.response?.data)
         })
      }
   }, [ error ])

   function onToggle(value) {
      toast.show({
         title: 'Updating...'
      })
      updatePreferencesAsync(value).then(res => {
         toast.show({
            title: res.data.message
         })
      }).catch(err => {
         toast.show({
            title: err.response?.data?.message
         })
      }).finally(() => {

      })
   }

   return (
      <Page scroll={true} loading={isLoading}>
         <Page.Container style={{  marginBottom: 30, }}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
               <Page.Title>Members</Page.Title>
               <View>
                  <IconButton icon={'user'} />
               </View>
            </HStack>
            <Alert title={'Verification pending'} />

         </Page.Container>
      </Page>
   );
};

MembersScreen.propTypes = {
   // prop: PropTypes.string
};

MembersScreen.defaultProps = {};

export default connect(state => ({
   user: state.auth.user,
   token: state.auth.token,
   options: state.options,
}))(MembersScreen)
