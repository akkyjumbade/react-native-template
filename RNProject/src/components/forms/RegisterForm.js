import Text from '@modules/rn-kit/atoms/Text'
import FormControl from '@modules/rn-kit/molecules/FormControl'
import TextInput from '@modules/rn-kit/molecules/TextInput'
import PasswordInput from '@modules/rn-kit/molecules/PasswordInput'
// import TextInput from '@modules/rn-kit/molecules/TextInput'
import React from 'react'
import ErrorBoundary from '../errors/ErrorBoundary'
import { useFormik } from 'formik'
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary'
import {useNavigation} from "@react-navigation/core";
import useTranslation from '@/hooks/useTranslation'
import EmailInput from '@modules/rn-kit/molecules/EmailInput'
import { View } from 'native-base'


const RegisterForm = ({ initialValues = {}, }) => {
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
         <FormControl label={__('name')} >
            <TextInput value={formik.values.name} onChangeText={formik.handleChange('name')} placeholder={'name'}  />
         </FormControl>
         <FormControl label={__('email')} >
            <EmailInput value={formik.values.email} onChangeText={formik.handleChange('email')} placeholder={''}  />
         </FormControl>
         <FormControl label={__('password')} >
            <TextInput value={formik.values.password} onChangeText={formik.handleChange('password')} placeholder={'password'}  />
         </FormControl>
         <View style={{ marginBottom: 30, marginTop: 5, }}>
            <Text>{__('accept_terms_line')}</Text>
         </View>
         <ButtonPrimary title={__('btn_register')} onPress={() => nav.navigate('login')} />
      </ErrorBoundary>
   )
}

export default RegisterForm
