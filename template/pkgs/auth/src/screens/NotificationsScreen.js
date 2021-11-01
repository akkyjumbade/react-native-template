import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import {connect, useDispatch} from 'react-redux'
import { Loading } from 'uikit'
import { Text, Page, } from 'uikit'
import {load_notifications_action} from "../store/notifications_reducer";
// import useNotification from '../../../../src/utils/useNotification'


const NotificationItem = ({ item, index }) => {
   const { data } = item
   return (
      <View style={{ paddingHorizontal: 15, marginBottom: 15 }}>
         <Text weight={'bold'} size={17}>{data.title}</Text>
         <Text size={15}>{data.body}</Text>
         <Text size={14}>{item.created_at}</Text>
         {/* <Text>{JSON.stringify({ item })}</Text> */}
      </View>
   )
}
const EmptyComponent = props => {
   return (
      <View>
         <Text>No notifications.</Text>
      </View>
   )
}
const NotificationsScreen = ({ navigation, route, notifications, }) => {
   const status = notifications.status
   const dispatch = useDispatch()
   // useEffect(() => {
   // //   load if notifications failed
   //    if (!notifications.allNotifications) {
   //       dispatch(load_notifications_action())
   //    }
   // }, [notifications, dispatch])

   return (
      <Page loading={status === 'loading'} title={'Notifications'}>
         <View padding={0}>
             {/*<Text>{JSON.stringify({ status, notifications })}</Text>*/}
            <FlatList
               data={notifications.allNotifications}
               keyExtractor={row => row.id}
               ListEmptyComponent={EmptyComponent}
               renderItem={NotificationItem} />
         </View>
      </Page>
   )
}
export default connect(state => ({
   notifications: state.notifications,
   unreadCount: state.notifications.unreadNotifications?.length
}))(NotificationsScreen)
