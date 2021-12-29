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
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { List_Item } from '@modules/rn-kit/atoms/List_Item';
import usePreferencesQuery from '@/api/usePreferencesQuery';
// import { ToggleButtonClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';


const NotificationsPreferenceScreen = ({ options, user, token }) => {
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

         <Page.Container style={{ marginBottom: 30, }}>
            {broadcastChannels && broadcastChannels.map(({ value: group, label }) => (
               <Fragment>
                  <HStack>
                     <View style={{ flex: 1, marginBottom: 15 }}>
                        <Text fontSize={'lg'} bold>{label}</Text>
                     </View>
                     <View >
                        <Text >{isUpdating ? 'Updating...' : ''}</Text>
                     </View>
                  </HStack>
                  <List key={group} rounded={'lg'} divider={<Divider />} style={{ marginBottom: 30 }}>
                     {notificationChannels?.map(row => (
                        <List.Item
                           key={`channel_id_${row.channelId}`}
                        >
                           <HStack>
                              <VStack style={{ flex: 1 }}>
                                 <View>
                                    <Text bold>{row.channelName}</Text>
                                 </View>
                                 <Text>{row.channelDescription}</Text>
                              </VStack>
                              <View style={{ paddingHorizontal: 15 }}>
                                 {/* <ToggleButtonClick  /> */}
                                 <Switch onToggle={(val) => onToggle({
                                    broadcast_channel: group,
                                    value: val,
                                    channel: row,
                                    channel_id: row.channelId,
                                 })} />
                              </View>
                           </HStack>
                        </List.Item>
                     ))}
                  </List>
               </Fragment>
            ))}
         </Page.Container>
      </Page>
   );
};

NotificationsPreferenceScreen.propTypes = {
   // prop: PropTypes.string
};

NotificationsPreferenceScreen.defaultProps = {};

export default connect(state => ({
   user: state.auth.user,
   token: state.auth.token,
   options: state.options,
}))(NotificationsPreferenceScreen)
