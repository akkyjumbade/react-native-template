import React from "react";
import {Page, Text, Title} from "uikit";
import {View} from "native-base";
import {connect} from "react-redux";
import {useQuery} from "react-query";
import {server} from "../../../../src/utils/http";

const TeamScreen = ({ navigation, user, route: { params } }) => {
   const teamQuery = params?.team
   const { data: team, isLoading } = useQuery('team_${}', async () => {
      return await server().get(`/api/v1/teams/${teamQuery?.id}`)
   })
   return (
      <Page Header={() => (
         <View>
            <Title>{'Teams'}</Title>
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
}))(TeamScreen)
