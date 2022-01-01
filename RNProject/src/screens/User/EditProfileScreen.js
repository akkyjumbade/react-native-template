import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect, useSelector } from 'react-redux'
import Page from "@modules/rn-kit/layouts/Page";
import useTranslation from '@/hooks/useTranslation';
import { Center, Divider, HStack, List } from 'native-base';
import icons from '@/icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@modules/rn-kit';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { Portal } from 'react-native-portalize';
import FormControl from '@modules/rn-kit/molecules/FormControl';
import TextInput from '@modules/rn-kit/molecules/TextInput';
import { Modalize,  } from 'react-native-modalize';
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';

import UpdateNameForm from '@/components/forms/UpdateNameForm';
import UpdateEmailForm from '@/components/forms/UpdateEmailForm';
import UpdatePhoneNumberForm from '@/components/forms/UpdatePhoneNumberForm';

const forms = {
   name: UpdateNameForm,
   email: UpdateEmailForm,
   phone: UpdatePhoneNumberForm,
}

const UpdateFieldDialogue = ({ field, value, onClose }) => {
   const dialogueRef = useRef(null)
   let FormComponent = forms[field] ?? null;
   if (!FormComponent) {
      FormComponent = () => <View />
   }
   useEffect(() => {
      // alert(field)
      dialogueRef.current?.open()
   }, [ dialogueRef ])
   function toggleDialogue() {
      dialogueRef.current?.close()
      onClose && onClose()
   }
   return (
      <ErrorBoundary>
         <Modalize
            ref={dialogueRef}
            onClosed={() => onClose && onClose()}
            // FloatingComponent={() => (
            //    <FormComponent intialValues={{ [field]: value }} />
            // )}
            withHandle={false}
            FooterComponent={() => (
               <View style={{ paddingHorizontal: 20, paddingBottom: 40,  }}>
                  <Button title={'Cancel'} onPress={() => toggleDialogue()} />
               </View>
            )}
            modalStyle={{ minHeight: 300, paddingVertical: 40 }} adjustToContentHeight >

            <ErrorBoundary>
               <View style={{ padding: 15, paddingBottom: 40, }}>
                  <FormComponent intialValues={{ [field]: value }} />
               </View>
            </ErrorBoundary>
         </Modalize>
      </ErrorBoundary>
   )
}

const EditProfileScreen = ({ user }) => {
   const __ = useTranslation()
   const nav = useNavigation()
   const { ref: formFef, open, close } = useModalize()
   const [ selectedField, setSelectedField ] = useState(null)

   const editForm = ({ name, value }) => {
      setSelectedField({
         name,
         value,
      })
   }

   return (
      <Page loading={!user}>

         <Center style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 1}}>
               <List
                  style={{ marginVertical: 15, borderWidth: 0 }}
                  divider={<Divider />}
                  space={1}
                  >
                  <List.Item onPress={() => editForm({ name: 'name', value: user.name })}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('name')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{user.name}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => editForm({ name: 'email', value: user.email })}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('email')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{user.email}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => editForm({ name: 'phone', value: user.phone })}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('phone')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{user.phone}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
                  <List.Item onPress={() => nav.navigate('profile.edit', { field: 'gender', })}>
                     <HStack alignItems={'center'}>
                        <View style={{ flex: 1 }}>
                           <Text>{__('gender')}</Text>
                        </View>
                        <View>
                           <Text color={'gray'}>{user.gender}</Text>
                        </View>
                        <View>
                           <icons.chevronRightIcon width={24} height={24} />
                        </View>
                     </HStack>
                  </List.Item>
               </List>
            </View>
         </Center>
         <Portal>
            {selectedField && (
            <UpdateFieldDialogue onClose={() => setSelectedField(null)} field={selectedField.name} value={selectedField.value} />
            )}
         </Portal>
      </Page>
   )
}

EditProfileScreen.propTypes = {
   // prop: PropTypes.string
}

EditProfileScreen.defaultProps = {

}

export default connect(state => ({
   user: state.auth.user
}))(EditProfileScreen)
