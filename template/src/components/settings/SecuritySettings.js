import { CheckBox, Left, List, ListItem, Picker, Right } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { useMutation } from 'react-query'
import { connect, useDispatch } from 'react-redux'
import { Icon } from 'uikit'
import { Loading } from 'uikit'
import { Text } from 'uikit'
import { T_DARK_MODE } from '../../store/config/reducer'
// import Checkbox from 'uikit/src/molecules/Checkbox'
import { server } from '../../utils/http'

const SecuritySettings = ({ values, config, user }) => {
   const dispatch = useDispatch()
   const { mutate: updateAction, status: updateStatus, } = useMutation(payload => {
      return server().post(`/api/v1/settings?tag=security`, {
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
   function toggleDarkMode() {
      let isDark = config.appearance_theme === 'dark'
      dispatch({
         type: T_DARK_MODE,
         payload: isDark ? 'system' : 'dark'
      })
   }

   return (
      <>
         {updateStatus === 'loading' && (
            <Loading />
         )}
         {/* <Text>{JSON.stringify(config)}</Text> */}
         <List>
            <ListItem
               noIndent iconRight
               onPress={toggleDarkMode}
               note={'Enable dark mode'} >
               <Left>
                  <Text>2FA authentication?</Text>
               </Left>
               <Right>
                  {/* <Picker>
                     <Picker.Item label="System" />
                     <Picker.Item label="Light" />
                     <Picker.Item label="Dark" />
                  </Picker> */}
                  <Text>{config.appearance_theme}</Text>
               </Right>
            </ListItem>
            <ListItem noIndent>
               <Left>
                  <Text>Touch ID</Text>
               </Left>
               <Right>
                  {/* <Picker>
                     <Picker.Item label="System" />
                     <Picker.Item label="Light" />
                     <Picker.Item label="Dark" />
                  </Picker> */}
                  <Text>?</Text>
               </Right>
            </ListItem>
            <ListItem noBorder noIndent>
               <Left>
                  <Text>PIN lock</Text>
               </Left>
               <Right>
                  {/* <Picker>
                     <Picker.Item label="System" />
                     <Picker.Item label="Light" />
                     <Picker.Item label="Dark" />
                  </Picker> */}
                  <Text>?</Text>
               </Right>
            </ListItem>
         </List>
      </>
   )
}


export default connect(state => ({
   config: state.config,
   values: state.config.values,
   user: state.auth.user,
}))(SecuritySettings)
