import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { Loading } from 'uikit'
import { Container } from 'uikit'
import { Text, Page, } from 'uikit'
import { Heading, Title } from 'uikit/src/atoms/Text'
import { server } from '../../../../src/utils/http'
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
const EmptyNotificationsState = ({ title }) => {
   return (
      <Container>
         <Heading>No notifications</Heading>
         <Text>Empty inbox</Text>
      </Container>
   )
}
const MySessionsScreen = ({ navigation, route, notifications, }) => {
   const { data: sessions, status } = useQuery('sessions', async () => {
      return await server().get(`/api/v1/my_sessions`)
   })
   // const notificationService = useNotification()
   // useEffect(() => {
   //    notificationService.requestUserPermission()
   // }, [notificationService])
   return (
      <Page loading={status === 'loading'} title={'My Loggedin sessions'} Header={(_page) => (
         <View style={{ paddingHorizontal: 15, }}>
            <Title>{_page.title}</Title>
         </View>
      )}>
         <View padding={0}>
            <Text>{JSON.stringify({ sessions })}</Text>
            <FlatList
               data={notifications.allNotifications}
               keyExtractor={row => row.id}
               renderItem={NotificationItem}
               ListEmptyComponent={EmptyNotificationsState}
               />
         </View>
      </Page>
   )
}
export default connect(state => ({
   notifications: state.notifications,
   unreadCount: state.notifications.unreadNotifications?.length
}))(MySessionsScreen)
