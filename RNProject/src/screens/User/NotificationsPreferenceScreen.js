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
import { Button } from '@modules/rn-kit';
import PushNotification from 'react-native-push-notification'
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
   function sendSampleNotification() {
      PushNotification.localNotification({
         message: 'Sample ',
         title: 'Sample title',
         channelId: 'default',
         playSound: true,
         soundName: 'default',
         // actions: ["ReplyInput"],
         // reply_placeholder_text: "Write your response...",
         // reply_button_text: "Reply",
      })
   }

   return (
      <Page scroll={true} loading={isLoading}>
         <Page.Container style={{  marginBottom: 30, }}>
            <Page.Title>Notifications</Page.Title>
            <Alert title={'Notifications disabled!'} />
            {/* <Button title={'Sample'} onPress={() => sendSampleNotification()} /> */}
            {notificationChannels?.map(row => (
               <Fragment
                  key={`channel_id_${row.channelId}`}
               >
                  <VStack space={3}>
                     <VStack style={{ flex: 1 }}>
                        <View>
                           <Text bold>{row.channelName}</Text>
                        </View>
                        <Text>{row.channelDescription}</Text>
                     </VStack>
                     <View style={{ paddingHorizontal: 0 }}>
                        {/* <Text>{JSON.stringify({ broadcastChannels })}</Text> */}
                        <List rounded={'lg'} borderWidth={0} paddingHorizontal={0} divider={<Divider />} style={{ marginBottom: 30 }}>
                           {broadcastChannels?.map(chnl => (
                              <List.Item
                                 key={`channel_${chnl.value}`}
                                 style={{ paddingHorizontal: 0 }}
                                 paddingLeft={0}
                              >
                                 <HStack>
                                    <VStack style={{ flex: 1 }}>
                                       <Text>{chnl.label}</Text>
                                    </VStack>
                                    <View style={{ paddingHorizontal: 15 }}>
                                       {/* <ToggleButtonClick  /> */}
                                       <Switch onToggle={(val) => onToggle({
                                          broadcast_channel: chnl.value,
                                          value: val,
                                          channel: chnl,
                                          channel_id: chnl.channelId,
                                       })} />
                                    </View>
                                 </HStack>
                              </List.Item>
                           ))}
                        </List>
                     </View>
                  </VStack>
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
