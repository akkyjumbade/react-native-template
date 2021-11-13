import Text from '@rn-kit/atoms/Text'
import FormControl from '@rn-kit/molecules/FormControl'
import TextInput from '@rn-kit/molecules/TextInput'
// import TextInput from '@rn-kit/molecules/TextInput'
import React from 'react'
import ErrorBoundary from '../errors/ErrorBoundary'
import { useFormik } from 'formik'
import ButtonPrimary from '@ui/atoms/ButtonPrimary'


const LoginForm = ({ initialValues = {}, }) => {
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
         <ButtonPrimary title={'LOGIN'} />
      </ErrorBoundary>
   )
}

export default LoginForm
