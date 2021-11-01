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
import { auth_login_action } from '../store/actions'
import PasswordInput from 'uikit/src/molecules/PasswordInput'
import { CheckBox } from 'native-base'
import axios from 'axios'
const initialValues = {
   username: '',
   password: ''
}

const validationSchema = Yup.object().shape({
   email: Yup.string().max(200).email().required(),
   password: Yup.string().required(),
})

export default function LoginForm(props) {
   const navigation = useNavigation()
   const dispatch = useDispatch()
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         const { data } = await http.post(`/api/v1/login`, {
            ...values
         })
         // alert(JSON.stringify(data))
         const { access_token, } = data
         // alert(JSON.stringify({ access_token }))
         dispatch(auth_login_action(access_token))
         // alert(access_token)
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
         {({ values, handleChange, handleSubmit, isSubmitting, errors, setFieldValue }) => (
            <View style={{ flex: 1, }}>
               <FormControl error={errors?.email}>
                  <TextInput placeholder="Username" type="text" onChangeText={handleChange('email')} value={values.email} />
               </FormControl>

               <FormControl  error={errors?.password} caption={() => (
                  <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                     <View>
                        <TouchableOpacity style={{ marginLeft: -10, flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => setFieldValue('remember', !values.remember)}>
                           <CheckBox checked={values.remember} />
                           <Text style={{ marginLeft: 15, }}>Remember me</Text>
                           {/* <Text>{JSON.stringify(values.remember)}</Text> */}
                        </TouchableOpacity>
                     </View>
                     <View>
                        <TouchableOpacity onPress={() => navigation.navigate('PasswordLost')}>
                           <Text>Forgot password?</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               )}>
                  <PasswordInput placeholder={'Password'} showGuide={false} onChangeText={handleChange('password')} value={values.password} />
               </FormControl>
               <View style={{ alignItems: 'flex-start', flex: 1 }}>
                  <Button block disabled={isSubmitting} size={Button.SIZE_LG} intent={Button.INTENT_PRIMARY} title={'Login'} onPress={handleSubmit} />
               </View>
            </View>
         )}
      </Formik>
   )
}
