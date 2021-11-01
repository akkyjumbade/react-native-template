import React from 'react'
import Page from "uikit/src/templates/Page";
import {Container, Text, Title} from "uikit";
import {Left, List, ListItem, View} from "native-base";

const LinkedAccountsScreen = ({ navigation }) => {
   return (
      <Page Header={() => (
         <View style={{ paddingHorizontal: 15, }}>
            <Title>Linked accounts</Title>
         </View>
      )}>
         <View>
            <List>
               <ListItem noIndent={true} >
                  <Left>
                     <Text>Google</Text>
                  </Left>
               </ListItem>
               <ListItem noIndent={true} >
                  <Left>
                     <Text>Facebook</Text>
                  </Left>
               </ListItem>
               <ListItem noIndent={true} >
                  <Left>
                     <Text>Instagram</Text>
                  </Left>
               </ListItem>
            </List>

         </View>
      </Page>
   )
}


export default LinkedAccountsScreen
