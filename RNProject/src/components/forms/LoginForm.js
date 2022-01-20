import Text from '@modules/rn-kit/atoms/Text'
import FormControl from '@modules/rn-kit/molecules/FormControl'
import TextInput from '@modules/rn-kit/molecules/TextInput'
// import TextInput from '@modules/rn-kit/molecules/TextInput'
import React from 'react'
import ErrorBoundary from '../errors/ErrorBoundary'
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary'
import {useNavigation} from "@react-navigation/core";
import useTranslation from '@/hooks/useTranslation'
import { PasswordInput } from '@modules/rn-kit/molecules'
import { useLoginQuery } from '@/api/login'

const LoginForm = ({ initialValues = {}, }) => {
   const nav = useNavigation()
   const __ = useTranslation()
   const onSubmit = async (values) => {
      // return await http()
   }
   const loginForm = useLoginQuery()

   return (
      <ErrorBoundary>
         <FormControl label={'Username'} >
            <TextInput values={loginForm.values.username} onChangeText={loginForm.handleChange('username')} placeholder={''}  />
         </FormControl>
         <FormControl label={'Password'} >
            <PasswordInput values={loginForm.values.password} onChangeText={loginForm.handleChange('password')} placeholder={''}  />
         </FormControl>
         <ButtonPrimary title={__('btn_login')} onPress={loginForm.handleSubmit} />
      </ErrorBoundary>
   )
}

export default LoginForm
