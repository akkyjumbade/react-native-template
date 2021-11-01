import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Text, Button, FormControl, TextInput } from 'uikit'
// import localStorage from '../../localStorage'
import { useDispatch,  } from 'react-redux'
// import { T_LOGIN } from '../../store/auth/reducer'
// import { $http } from '../../functions/http'
import * as Yup from 'yup'
import http from '../../../../src/utils/http'
const initialValues = {
   username: '',
   password: ''
}

const validationSchema = Yup.object().shape({
   email: Yup.string().max(200).email().required(),
   password: Yup.string().required(),
})

export default function LoginWithPhoneForm(props) {
   const navigation = useNavigation()
   const dispatch = useDispatch()
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         const { data } = await http.post(`/api/v1/login`, {
            ...values
         })
         const { access_token, user } = data
         alert(access_token)
         // await localStorage.save({
         //    key: '@token',
         //    data: access_token,
         // })
         // dispatch({  payload: user, type: T_LOGIN })
         // action.setErrors(data)
         if (!data.ok) {
            action.setErrors(data.errors)
            return
         }
         // alert(access_token)

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
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} >
         {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <View style={{ flex: 1, }}>
               <FormControl label={'Phone'} error={errors?.email}>
                  <TextInput prepend={() => (
                     <Text size={16}>+91</Text>
                  )} type="text" onChangeText={handleChange('email')} value={values.email} />
               </FormControl>
               <View style={{ alignItems: 'flex-start', flex: 1 }}>
                  <Button block disabled={isSubmitting} size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} title={'SIGN IN'} onPress={handleSubmit} />
               </View>
            </View>
         )}
      </Formik>
   )
}
