import { useNavigation } from '@react-navigation/core'
import { CheckBox, Left, List, ListItem, Picker, Right } from 'native-base'
import React, { useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useMutation } from 'react-query'
import { connect, useDispatch } from 'react-redux'
import { DisplayText } from 'uikit'
import { Icon } from 'uikit'
import { Loading } from 'uikit'
import { Text } from 'uikit'
import OptionsInput, { OptionsItem } from 'uikit/src/molecules/OptionsInput'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import options from '../../config/options'
import configActions from '../../store/config/actions'
import { T_DARK_MODE } from '../../store/config/reducer'
// import Checkbox from 'uikit/src/molecules/Checkbox'
import { server } from '../../utils/http'
import __ from '../../utils/locale'

const timezones = []
const TimezoneItem = ({ item }) => {
   return (
      <ListItem>
         <Left>
            <Text>{item.name}</Text>
         </Left>
      </ListItem>
   )
}
const GeneralSettings = ({ values, config, user }) => {
   const dispatch = useDispatch()
   const nav = useNavigation()
   const timezoneModal = useRef()
   const { mutate: updateAction, status: updateStatus, } = useMutation(payload => {
      return server().post(`/api/v1/settings`, {
         ...payload
      })
   })
   function toggleTimezoneOptions() {
      timezoneModal.current?.open()
   }
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
                  <Text>Dark mode?</Text>
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
            <ListItem noIndent onPress={_ => nav.navigate('CountryPicker')}>
               <Left>
                  <Text>{__('Country')}</Text>
               </Left>
               <Right>
                  {/* <Picker>
                     <Picker.Item label="System" />
                     <Picker.Item label="Light" />
                     <Picker.Item label="Dark" />
                  </Picker> */}
                  <Text>{config.country}</Text>
               </Right>
            </ListItem>
            <ListItem noIndent onPress={_ => nav.navigate('CurrencyPicker')}>
               <Left>
                  <Text>Currency</Text>
               </Left>
               <Right>
                  {/* <Picker>
                     <Picker.Item label="System" />
                     <Picker.Item label="Light" />
                     <Picker.Item label="Dark" />
                  </Picker> */}
                  <Text>{config.currency}</Text>
               </Right>
            </ListItem>
            <ListItem noIndent>
               <Left>
                  <Text>Locale</Text>
               </Left>
               <Right>
                  <OptionsInput
                     options={options.languages}
                     onChange={val => dispatch(configActions.setDisplayLanguage(val))}
                     valueExtractor={'value'}
                     renderField={() => (
                        <View>
                           <Text>{config.display_language ?? 'en'}</Text>
                        </View>
                     )}
                     renderOption={(row, onSelect) => (
                        <OptionsItem onSelect={_ => onSelect(row.item)} {...row} labelKey={'label'} valueKey={'value'} />
                     )} />
               </Right>
            </ListItem>
            <ListItem noBorder noIndent onPress={toggleTimezoneOptions}>
               <Left>
                  <Text>Timezone</Text>
               </Left>
               <Right>
                  {/* <Picker>
                     <Picker.Item label="System" />
                     <Picker.Item label="Light" />
                     <Picker.Item label="Dark" />
                  </Picker> */}
                  <OptionsInput
                     options={options.languages}
                     onChange={val => dispatch(configActions.setDisplayLanguage(val))}
                     valueExtractor={'value'}
                     renderField={() => (
                        <View>
                           <Text>{config.display_language ?? 'en'}</Text>
                        </View>
                     )}
                     renderOption={(row, onSelect) => (
                        <OptionsItem onSelect={_ => onSelect(row.item)} {...row} labelKey={'label'} valueKey={'value'} />
                     )} />
               </Right>
            </ListItem>
         </List>
         <Portal>
            <Modalize ref={timezoneModal} HeaderComponent={() => (
               <Modal_Header title={'Choose Timezone'} />
            )}
               flatListProps={{
                  data: timezones,
                  keyExtractor: row => row.id,
                  renderItem: TimezoneItem
               }}
            />
         </Portal>
      </>
   )
}


export default connect(state => ({
   config: state.config,
   values: state.config.values,
   user: state.auth.user,
}))(GeneralSettings)
