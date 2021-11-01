import { CheckBox, Left, List, ListItem, Right } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { useMutation } from 'react-query'
import { connect } from 'react-redux'
import { Loading } from 'uikit'
import { Text } from 'uikit'
// import Checkbox from 'uikit/src/molecules/Checkbox'
import { server } from '../../utils/http'

const NotificationSettings = ({ config, user }) => {
   const { mutate: updateAction, status: updateStatus, } = useMutation(payload => {
      return server().post(`/api/v1/settings`, {
         ...payload
      })
   })

   function updateSettings(obj) {
      updateAction({
         notificationConfig: {
            ...obj
         }
      })
   }

   return (
      <>
         {updateStatus === 'loading' && (
            <Loading />
         )}
         <List>
            {config.alert_types?.map((alt, index) => (
            <ListItem onPress={_ => updateSettings(alt)} noBorder={index === (config.alert_types.length - 1)} noIndent key={'ntf-' + index}>
               <Left>
                  <View>
                     <Text weight="bold">{alt.label}</Text>
                     {/* <Separator /> */}
                     {alt.description && (
                     <View style={{ alignSelf: 'flex-start' }}>
                        <Text size={13} color={'gray'}>{alt.description}</Text>
                     </View>
                     )}
                  </View>
               </Left>
               <Right style={{ marginRight: 20, }}>
                  <CheckBox checked />
               </Right>
            </ListItem>
            ))}
         </List>
      </>
   )
}


export default connect(state => ({
   config: state.config,
   user: state.auth.user,
}))(NotificationSettings)
