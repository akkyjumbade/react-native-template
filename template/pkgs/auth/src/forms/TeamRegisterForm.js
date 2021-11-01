import { Formik } from 'formik'
import React, { Fragment, useRef } from 'react'
import { Alert, View,  } from 'react-native'
import { Text, Button, FormControl, TextInput } from 'uikit'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import PhoneVerificationForm from './PhoneVerificationForm'
import { useNavigation } from '@react-navigation/core'
import http from '../../../../src/utils/http'
import { auth_login_action, } from '../store/actions'
import PasswordInput from 'uikit/src/molecules/PasswordInput'
import ImageUploadControl from "uikit/src/molecules/ImageUploadControl";
import __ from "../../../../src/utils/locale";
import ErrorBoundary from "../../../../src/components/ErrorBoundary";
import OptionsInput, { OptionsItem } from 'uikit/src/molecules/OptionsInput'
import { Left, ListItem } from 'native-base'
import { cats } from '../../../../src/pages/CategoryChoiceScreen'
import { useIsFocused } from '@react-navigation/core'
import { SCREEN } from '../../../../src/config'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'

const initialValues = {
   username: '', password: ''
}

const validationSchema = Yup.object().shape({
   title: Yup.string().max(200).required(),
   website: Yup.string().max(200),
   // username: Yup.string().max(200).required(),
   // logo: Yup.string().max(200).required(),
   name: Yup.string().max(200).required(),
   email: Yup.string().max(200).email().required(),
   phone: Yup.number('Must be a number').required(),
   password: Yup.string().min(7).required(),

})


const TeamRegisterForm = props => {
   const navigation = useNavigation()
   const dispatch = useDispatch()
   const optVerifyModal = useRef()
   const isFocused = useIsFocused()
   function onPhoneVerificationClose({ res, handleSubmit }) {
      console.log({ res })
      optVerifyModal.current?.close()
      if (res.action === 'done') {
         Alert.alert('verified')
         // handleSubmit && handleSubmit()
      }
   }
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      if (!values.otp) {
         optVerifyModal.current?.open()
         return false
      }
      try {
         const { data } = await http.post(`/api/v1/register_team`, {
            ...values,
         })
         // alert(JSON.stringify({ data }))
         if (data && data.token) {
            // dispatch(auth_login_action(data.token))
            alert('Registration successful, You account verification is under review')
            navigation.goBack()
         }
      } catch (error) {
         // alert(JSON.stringify({ error }))
         // alert(JSON.stringify(error.response))
         if (error.response?.data?.errors) {
            action.setErrors(error.response?.data?.errors)
         }
      } finally {
         action.setSubmitting(false)
      }
   }
   return (
      <Fragment>
         <Formik {...props} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ values, handleChange, handleSubmit, isSubmitting, errors, setFieldValue }) => (
               <View style={{ flex: 1, }}>
                  <Text size={20} bold style={{ marginBottom: 15 }}>Business detail</Text>
                  <FormControl error={errors?.title}>
                     <TextInput placeholder={'Name of the business'} onChangeText={handleChange('title')} value={values.title} />
                  </FormControl>
                  {/* <Text>{JSON.stringify({ values })}</Text> */}
                  <FormControl error={errors?.category}>
                     {/* <TextInput placeholder={'Category'} onChangeText={handleChange('category')} value={values.category} /> */}
                     <OptionsInput
                        onSelectClose={true}
                        showFooter={true}
                        renderField={() => (
                           <View style={{ borderRadius: 12, backgroundColor: '#F0F1F2', width: '100%', height: 40, justifyContent: 'center', paddingHorizontal: 15, }}>
                              <Text>{values.category ? values.category : 'Choose category'}</Text>
                           </View>
                        )}
                        options={cats}
                        renderOption={({ item, index }) => (
                           <OptionsItem
                              labelKey={'title'}
                              valueKey={'title'}
                              item={item}
                              index={index}
                              selectedIndex={values.categoryIndex}
                              onSelect={_ => {
                                 setFieldValue('category', item.title)
                                 setFieldValue('categoryIndex', index)
                              } }
                           />
                        )} />
                  </FormControl>
                  <Text size={20} bold style={{ marginBottom: 15 }}>Account</Text>
                  <FormControl label={'Name'} error={errors?.name}>
                     <TextInput placeholder="Full name" onChangeText={handleChange('name')} value={values.name} />
                  </FormControl>
                  <FormControl label={'E-mail'} error={errors?.email}>
                     <TextInput placeholder="example@domain.com" onChangeText={handleChange('email')} value={values.email} />
                  </FormControl>
                  <FormControl label={'Mobile no'} error={errors?.phone}>
                     <TextInput onChangeText={handleChange('phone')} value={values.phone} />
                  </FormControl>
                  {/* <Button onPress={() => setFieldValue('openOtpModal', !Boolean(values.openOtpModal))} />
                  <Text>{JSON.stringify({isFocused, openOtpModal: values.openOtpModal})}</Text> */}
                  {(isFocused) && (
                     <Portal>
                        <Modalize
                           // alwaysOpen={SCREEN.height / 2}
                           HeaderComponent={() => (
                              <Modal_Header title={'Verify Email with OTP'} />
                           )}
                           ref={optVerifyModal}>
                           <ErrorBoundary>
                              <PhoneVerificationForm email={values.email} phone={values.phone} onClose={res => {
                                 setFieldValue('otp', res.otp)
                                 onPhoneVerificationClose({ handleSubmit, res })}
                              } />
                           </ErrorBoundary>
                        </Modalize>
                     </Portal>
                  )}
                  <FormControl label={'Password'} error={errors?.password}>
                     <PasswordInput placeholder="Min 8 chars" secureTextEntry={true}  secureText={true}  onChangeText={handleChange('password')} value={values.password} />
                  </FormControl>
                  <View style={{ flex: 1, alignItems: 'center', }}>
                     <Button block disabled={isSubmitting} intent={Button.INTENT_PRIMARY} size={Button.SIZE_LG} title={'CREATE ACCOUNT'} onPress={handleSubmit} />
                  </View>

               </View>
            )}
         </Formik>

      </Fragment>
   )
}

export default TeamRegisterForm
