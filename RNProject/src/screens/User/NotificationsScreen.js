import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Page from '@modules/rn-kit/layouts/Page';
import useNotificationsQuery from '@/api/useNotificationsQuery';
import { Center, Divider, FlatList } from 'native-base';
import Text from '@modules/rn-kit/atoms/Text';
import Empty from '@/components/Empty';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useTranslation from '@/hooks/useTranslation';
import { SwipeListView } from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
   hiddenRowAction: {
      // opacity: 0,
   },
   visibleRow: {
      backgroundColor: 'white',
      // borderBottomWidth: 1,
      // alignItems: 'center',
      // flexDirection: 'row',
      // flex: 1,
   }
})

const NotificationItem = ({ item }) => {
   const { data = {} } = item
   return (
      <View>
         <Text bold>{data.title}</Text>
         <Text>{data.body}</Text>
         <Text>{JSON.stringify(data)}</Text>
      </View>
   )
}

const NotificationsScreen = ({ user }) => {
   const __ = useTranslation();
   const nav = useNavigation()
   const { data: { data: notifications } = { }, isLoading, } = useNotificationsQuery()
   // const notifications = useMemo(() => {
   //    return {
   //       data: Array(20).fill("").map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
   //    }
   // }, [])
   function onItemClick(item) {
      nav.navigate('notifications.show', {
         notification: item
      })
   }
   const notificationsCount = useMemo(() => {
      return notifications?.total
   }, [  notifications ])

   return (
      <Page scroll={false} >
         <Page.Container>
            <Page.Title>{__('Notifications')} {notificationsCount ? `(${notificationsCount})` : ''}</Page.Title>
            <SwipeListView
               data={notifications?.data}
               ItemSeparatorComponent={() => <Divider />}
               ListEmptyComponent={() => (
                  <Center flex={1} flexGrow={1}>
                     <Empty
                        iconName={'bell'}
                        title={'No new notifications'} />
                  </Center>
               )}
               renderHiddenItem={() => (
                  <View style={styles.hiddenRowAction}>
                     <Text>Close</Text>
                  </View>
               )}
               renderItem={({ item }) => (
                  <View style={styles.visibleRow}>
                     <TouchableOpacity key={`notification_${item.id}`} onPress={() => onItemClick(item)}>
                        <NotificationItem item={item} />
                     </TouchableOpacity>
                  </View>
               )}
            />
         </Page.Container>
      </Page>
   );
};

NotificationsScreen.propTypes = {
   // prop: PropTypes.string
};

NotificationsScreen.defaultProps = {};

export default connect(state => ({
   user: state.auth.user
}))(NotificationsScreen);
