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
import { PhoneNumberInput } from '@modules/rn-kit/molecules'
import useRegisterQuery from '@/api/useRegisterQuery'
import { Button } from '@modules/rn-kit'


const RegisterForm = ({ initialValues = {}, }) => {
   const nav = useNavigation()
   const __ = useTranslation()
   const registerQuery = useRegisterQuery({
      onSuccess() {

      },
      onError() {

      },
   })
   const formik = useFormik({
      initialValues,
      async onSubmit(values, action) {
         action.setSubmitting(true)
         try {
            await registerQuery.mutateAsync(values)
         } catch (error) {

         } finally {
            action.setSubmitting(false)
         }
      }
   })
   const submitRegisterForm = async (values) => {
      formik.handleSubmit()
   }
   return (
      <ErrorBoundary>
         <FormControl label={__('name')} >
            <TextInput value={formik.values.name} onChangeText={formik.handleChange('name')} placeholder={'name'}  />
         </FormControl>
         <FormControl label={__('email')} >
            <EmailInput value={formik.values.email} onChangeText={formik.handleChange('email')} placeholder={''}  />
         </FormControl>
         <FormControl label={__('phone')} >
            <PhoneNumberInput value={formik.values.phone} onChangeText={formik.handleChange('phone')} placeholder={''}  />
         </FormControl>
         <FormControl label={__('password')} >
            <PasswordInput strict={true} value={formik.values.password} onChangeText={formik.handleChange('password')} placeholder={'password'}  />
         </FormControl>
         <View style={{ marginBottom: 30, marginTop: 5, }}>
            <Text>{__('accept_terms_line')}</Text>
         </View>
         <Button title={'Verify'} onPress={_ => nav.navigate('verification')} />
         <ButtonPrimary
            title={__('btn_register')}
            disabled={!formik.dirty || (formik.isSubmitting)}
            loading={formik.isSubmitting}
            onPress={submitRegisterForm} />
      </ErrorBoundary>
   )
}

export default RegisterForm
