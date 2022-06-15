import FormControl from '@modules/rn-kit/molecules/FormControl';
// import TextInput from '@modules/rn-kit/molecules/TextInput'
import React from 'react';
import { useFormik } from 'formik';
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary';
import { useNavigation } from '@react-navigation/core';
import useTranslation from '@/hooks/useTranslation';
import { View } from "react-native";
import ButtonOutline from "@modules/rn-kit/atoms/ButtonOutline";
import EmailInput from '@modules/rn-kit/molecules/EmailInput';
import usePasswordLostQuery from '@/api/usePasswordLostQuery';
import { useToast } from 'native-base';
import ErrorBoundary from '../errors/ErrorBoundary';

const PasswordLostForm = ({ initialValues = {} }) => {
   const nav = useNavigation();
   const __ = useTranslation();
   const toast = useToast()
   const { mutateAsync, } = usePasswordLostQuery()
   const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      async onSubmit(values, action) {
         action.setSubmitting(true)
         try {
            const { data } = await mutateAsync(values)
            toast.show({
               title: data?.message
            })
            action.setValues({ email: '' })
            action.resetForm({ email: '' })
            if (data && data.ok) {
            }
         } catch (error) {
            if (error?.response?.data?.errors) {
               action.setErrors(error?.response?.data?.errors)
            }
            toast.show({
               title: error.message,
               status: 'error'
            })
         } finally {
            action.setSubmitting(false)
         }
      }
   });
   return (
      <ErrorBoundary>
         <FormControl label={__('email')} error={formik.errors?.email}>
            <EmailInput
               values={formik.values.email}
               onChangeText={formik.handleChange('email')}
               placeholder={'Enter your registered email'}
            />
         </FormControl>
         <ButtonPrimary title={__('btn_password_request')} disabled={formik.isSubmitting} loading={formik.isSubmitting} onPress={() => formik.handleSubmit()} />
         {/* <View style={{ marginTop: 15, }}>
            <ButtonOutline title={__('cancel')} disabled={formik.isSubmitting} loading={formik.isSubmitting} onPress={() => nav.goBack()} />
         </View> */}
      </ErrorBoundary>
   );
};

export default PasswordLostForm;
