import Text from '@modules/rn-kit/atoms/Text'
import FormControl from '@modules/rn-kit/molecules/FormControl'
import TextInput from '@modules/rn-kit/molecules/TextInput'
// import TextInput from '@modules/rn-kit/molecules/TextInput'
import React from 'react'
import ErrorBoundary from '../errors/ErrorBoundary'
import { useFormik } from 'formik'
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary'
import {useNavigation} from "@react-navigation/core";
import useTranslation from '@/hooks/useTranslation'
import { PasswordInput } from '@modules/rn-kit/molecules'


const LoginForm = ({ initialValues = {}, }) => {
   const nav = useNavigation()
   const __ = useTranslation()
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
            <TextInput values={formik.values.username} onChangeText={formik.handleChange('username')} placeholder={''}  />
         </FormControl>
         <FormControl label={'Password'} >
            <PasswordInput values={formik.values.password} onChangeText={formik.handleChange('password')} placeholder={''}  />
         </FormControl>
         <ButtonPrimary title={__('btn_login')} onPress={() => nav.navigate('home')} />
      </ErrorBoundary>
   )
}

export default LoginForm
