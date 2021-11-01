import {CheckBox, Col, Grid, Left, List, ListItem, Right, Separator} from 'native-base'
import React, { useMemo } from 'react'
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Button, Text, Page } from 'uikit'
import { auth_logout_action } from 'auth/src/store/actions'
import { Container } from 'uikit'
import UserPersona from 'uikit/src/molecules/UserPersona'
import { Section } from 'uikit'
import { Flex } from 'uikit'
import { useQuery } from 'react-query'
import { server } from '../../utils/http'
import { Heading } from 'uikit/src/atoms/Text'
import DisplayText from 'uikit/src/molecules/DisplayText'
import _ from "lodash";

const RewardItem = ({ item }) => {
   return (
      <ListItem noIndent style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
         <View style={{ justifyContent: 'flex-start' }}>
            <Text >{item.name}</Text>
            <DisplayText format="datetime" value={item.created_at} />
         </View>
      </ListItem>
   )
}
const emptyStates = [
   // {
   //    name: 'Reward earned by referring to friends',
   // },
]
const EmptyStateComponent = props => {
   const data = useMemo(() => {
      return emptyStates
   }, [])
   return (
      <Container>
         <Heading>No rewards earned yet.</Heading>
         {data && data.map((row, rowindex) => (
            <RewardItem item={row} key={rowindex} />
         ))}
      </Container>
   )
}
const MyRewardsScreen = ({ navigation, config }) => {
   const { navigate } = navigation
   const { data: rewards, status: rewardsStatus } = useQuery(`rewards`, async () => {
      let { data: res } = await server().get(`/api/v1/my_rewards`)
      return res
   })

   return (
      <Page scroll={true}>
         {/* <Text>{JSON.stringify({ rewards, rewardsStatus })}</Text> */}
         <FlatList
            data={rewards?.data}
            keyExtractor={row => row.id}
            renderItem={(row) => (
               <RewardItem {...row} />
            )}
            ListEmptyComponent={EmptyStateComponent}
         />
      </Page>
   )
}

export default connect(state => ({
   config: state.config,
   user: state.auth.user,
}))(MyRewardsScreen)
