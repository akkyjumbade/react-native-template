import Text from '@modules/rn-kit/atoms/Text'
import FormControl from '@modules/rn-kit/molecules/FormControl'
import TextInput from '@modules/rn-kit/molecules/TextInput'
// import TextInput from '@modules/rn-kit/molecules/TextInput'
import React from 'react'
import ErrorBoundary from '../errors/ErrorBoundary'
import { useFormik } from 'formik'
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary'
import {useNavigation} from "@react-navigation/core";


const LoginForm = ({ initialValues = {}, }) => {
   const nav = useNavigation()
   const onSubmit = async (values) => {
      // return await http()
   }
   const formik = useFormik({
      initialValues,
      // onSubmit:
   })
   return (
      <ErrorBoundary>
         <FormControl label={'Username'} >
            <TextInput values={formik.values.username} onChangeText={formik.handleChange('username')} placeholder={'username'}  />
         </FormControl>
         <FormControl label={'Password'} >
            <TextInput values={formik.values.password} onChangeText={formik.handleChange('password')} placeholder={'password'}  />
         </FormControl>
         <ButtonPrimary title={'LOGIN'} onPress={() => nav.navigate('Home')} />
      </ErrorBoundary>
   )
}

export default LoginForm
