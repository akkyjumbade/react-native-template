import { Formik } from 'formik'
import React, { Fragment, useRef } from 'react'
import { Alert, View,  } from 'react-native'
import { Text, Button, FormControl, TextInput } from 'uikit'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import PhoneVerificationForm from './PhoneVerificationForm'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import http from '../../../../src/utils/http'
import { auth_register_action } from '../store/actions'
import PasswordInput from 'uikit/src/molecules/PasswordInput'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import ErrorBoundary from '../../../../src/components/ErrorBoundary'
import PhoneNumberInput from 'uikit/src/molecules/PhoneNumberInput'

const initialValues = {
   username: '', password: ''
}

const validationSchema = Yup.object().shape({
   name: Yup.string().max(200).required(),
   username: Yup.string().max(200).required(),
   email: Yup.string().max(200).email().required(),
   phone: Yup.number('Must be a number').required(),
   followers_count: Yup.number('Must be a number').required('Followers count is required'),
   password: Yup.string().min(7).required(),
})

export default function RegisterForm(props) {
   const navigation = useNavigation()
   const dispatch = useDispatch()
   const optVerifyModal = useRef(null)
   const isFocused = useIsFocused()
   function onPhoneVerificationClose({ handleSubmit, res }) {
      console.log({ res })
      optVerifyModal.current?.close()
      if (res.action === 'done') {
         handleSubmit && handleSubmit()
      }
   }
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      // alert(JSON.stringify({ values }))
      if (!values.otp) {
         optVerifyModal.current?.open()
         return false
      }
      try {
         const { data } = await http.post(`/api/v1/register`, {
            ...values,
         })
         // alert(JSON.stringify({ data, values }))
         if (data && data.token) {
            alert('Registration successful, You account verification is under review')
            // dispatch(auth_register_action(data.token, values))
            navigation.goBack()
         }
      } catch (error) {
         if (error.response?.data?.errors) {
            action.setErrors(error.response?.data?.errors)
         }
         // alert(JSON.stringify(error.response?.data))
      } finally {
         action.setSubmitting(false)
      }


   }
   return (
      <Fragment>
         <Formik {...props} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ values, handleChange, handleSubmit, isSubmitting,setFieldValue, errors }) => (
               <View style={{ flex: 1, }}>
                  <FormControl label={'Name'} error={errors?.name}>
                     <TextInput placeholder={'Full Name'} onChangeText={handleChange('name')} value={values.name} />
                  </FormControl>
                  {/* <Text>{JSON.stringify(errors)}</Text> */}
                  <FormControl label={'E-mail'} error={errors?.email}>
                     <TextInput placeholder="example@domain.com" onChangeText={handleChange('email')} value={values.email} />
                  </FormControl>
                  <FormControl label={'Mobile no'} error={errors?.phone}>
                     <PhoneNumberInput placeholder={'Enter mobile number'} onChangeText={handleChange('phone')} value={values.phone} />
                  </FormControl>
                  <FormControl label={'Instagram username'} error={errors?.username}>
                     <TextInput placeholder="Enter username" onChangeText={handleChange('username')} value={values.username} />
                  </FormControl>
                  <FormControl label={'Followers count? (Instagram)'} error={errors?.followers_count}>
                     <View style={{ width: 150 }}>
                        <TextInput placeholder="Count?" onChangeText={handleChange('followers_count')} value={values.followers_count} />
                     </View>
                  </FormControl>
                  <FormControl label={'Password'} error={errors?.password}>
                     <PasswordInput placeholder="Min 8 chars" secureTextEntry={true}  secureText={true}  onChangeText={handleChange('password')} value={values.password} />
                  </FormControl>
                  <View style={{ flex: 1, alignItems: 'center', }}>
                     <Button block disabled={isSubmitting} intent={Button.INTENT_PRIMARY} size={Button.SIZE_LG} title={'CREATE ACCOUNT'} onPress={handleSubmit} />
                  </View>
                  {(isFocused) && (
                     <Portal>
                        <Modalize
                           // alwaysOpen={SCREEN.height / 2}
                           adjustToContentHeight
                           HeaderComponent={() => (
                              <Modal_Header title={'Verify Email with OTP'} />
                           )}
                           ref={optVerifyModal}>
                           <ErrorBoundary>
                              <PhoneVerificationForm
                                 email={values.email}
                                 phone={values.phone}
                                 handleSubmit={handleSubmit}
                                 onClose={res => {
                                 setFieldValue('otp', res.otp)
                                 onPhoneVerificationClose({ handleSubmit, res })}
                              } />
                           </ErrorBoundary>
                        </Modalize>
                     </Portal>
                  )}
               </View>
            )}
         </Formik>

      </Fragment>
   )
}
