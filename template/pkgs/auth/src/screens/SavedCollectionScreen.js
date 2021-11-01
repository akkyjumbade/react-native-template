import React from "react";
import {Container, Loading, Page, Text, Title} from "uikit";
import {connect} from "react-redux";
import {useQuery} from "react-query";
import {server} from "../../../../src/utils/http";
import {View} from "native-base";

const SavedCollectionScreen = ({ navigation }) => {
   const { data: saved, isLoading } = useQuery(`saved_lists`, async () => {
      return await server().get(`/api/v1/my-saved-lists`)
   })
   return (
      <Page Header={() => (
         <View style={{ paddingHorizontal: 15 }}>
            <Title>
               Saved
            </Title>
         </View>
      )}>

         <Container>
            {isLoading && (
               <Loading />
            )}
            <Text>{JSON.stringify({ saved })}</Text>
         </Container>
      </Page>
   )
}

export default connect(state => ({
   user: state.auth.user
}))(SavedCollectionScreen)
