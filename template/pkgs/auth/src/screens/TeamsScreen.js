import React from "react";
import {Page, Text, Title} from "uikit";
import {View} from "native-base";
import {connect} from "react-redux";
import {useQuery} from "react-query";
import {server} from "../../../../src/utils/http";

const TeamsScreen = ({ navigation, user }) => {
   const { data: teams, isLoading } = useQuery('teams', async () => {
      return await server().get(`/api/v1/teams`)
   })
   return (
      <Page Header={() => (
         <View>
            <Title>{'Teams'}</Title>
         </View>
      )}>
         <Text>
            {JSON.stringify({ isLoading, teams })}
         </Text>
      </Page>
   )
}

export default connect(state => ({
   user: state.auth.user
}))(TeamsScreen)
