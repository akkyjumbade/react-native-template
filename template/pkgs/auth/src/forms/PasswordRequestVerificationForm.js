import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import { Text, Button, FormControl, TextInput } from 'uikit'
import localStorage from '../../localStorage'
import { useDispatch,  } from 'react-redux'
import http from '../../utils/http'

const initialValues = {
   username: '',
   password: ''
}
export default function PasswordRequestVerificationForm(props) {
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
               <FormControl label={'Username or E-Mail'} error={errors?.email}>
                  <TextInput type="email" onChangeText={handleChange('email')} value={values.email} />
               </FormControl>
               <View style={{ marginBottom: 30, alignItems: 'flex-start', }}>
                  <Button disabled={isSubmitting} size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} title={'Request Password'} onPress={handleSubmit} />
               </View>
            </View>
         )}
      </Formik>
   )
}
