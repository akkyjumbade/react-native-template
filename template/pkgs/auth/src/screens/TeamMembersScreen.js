import React from "react";
import {Page, Text, Title} from "uikit";
import {View} from "native-base";
import {connect} from "react-redux";
import {useQuery} from "react-query";
import {server} from "../../../../src/utils/http";

const TeamMembersScreen = ({ navigation, user }) => {
   const { data: team, isLoading } = useQuery('team_members', async () => {
      return await server().get(`/api/v1/teams/${user.id}/members`)
   })
   return (
      <Page Header={() => (
         <View>
            <Title>{'Team members'}</Title>
         </View>
      )}>
         <Text>
            {JSON.stringify({ isLoading, team })}
         </Text>
      </Page>
   )
}

export default connect(state => ({
   user: state.auth.user
}))(TeamMembersScreen)
