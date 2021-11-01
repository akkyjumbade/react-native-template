import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import { Text, Button, FormControl, TextInput } from 'uikit'
import PasswordInput from 'uikit/src/molecules/PasswordInput'
import http from '../../../../src/utils/http'

const initialValues = {
   username: '',
   password: ''
}
export default function PasswordResetForm(props) {
   // const dispatch = useDispatch()
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         const { data } = await http.post(`/api/v1/password_request`, {
            ...values
         })
         // const { access_token, user } = data
         if (!data.ok) {
            action.setErrors(data.errors)
            return
         }
         props.onSuccess && props.onSuccess(data)
      } catch (error) {
         if (error.response?.data?.errors) {
            action.setErrors(error.response?.data?.errors)
         }
         console.warn({ error })
      } finally {
         action.setSubmitting(false)
      }
      // props.onSuccess(values)
   }
   return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} >
         {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <View style={{ flex: 1, }}>
               <FormControl label={'OTP from E-Mail'} error={errors?.otp}>
                  <TextInput onChangeText={handleChange('otp')} value={values.otp} />
               </FormControl>
               <FormControl label={'New password'} error={errors?.new_password}>
                  <PasswordInput showGuide={true} onChangeText={handleChange('new_password')} value={values.new_password} />
               </FormControl>
               <View style={{ marginBottom: 30, alignItems: 'flex-start', }}>
                  <Button disabled={isSubmitting} block size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} title={'Set Password'} onPress={handleSubmit} />
               </View>
            </View>
         )}
      </Formik>
   )
}
