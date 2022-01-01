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
import * as yup from 'yup'

const validationSchema = yup.object().shape({
   first_name: yup.string().max(60).required(),
   middle_name: yup.string().max(60).required(),
   last_name: yup.string().max(60).required(),
})

const UpdateNameForm = ({ initialValues = {}, }) => {
   const nav = useNavigation()
   const __  = useTranslation()
   const onSubmit = async (values) => {
      // return await http()
   }
   const formik = useFormik({
      initialValues,
      validationSchema,
      // onSubmit:
   })
   return (
      <ErrorBoundary>
         <FormControl label={__('first_name')}  error={formik.errors?.first_name} >
            <TextInput values={formik.values.first_name} onChangeText={formik.handleChange('first_name')}  />
         </FormControl>
         <FormControl label={__('middle_name')}  error={formik.errors?.middle_name} >
            <TextInput values={formik.values.middle_name} onChangeText={formik.handleChange('middle_name')}  />
         </FormControl>
         <FormControl label={__('last_name')}  error={formik.errors?.last_name} >
            <TextInput values={formik.values.last_name} onChangeText={formik.handleChange('last_name')}  />
         </FormControl>
         <ButtonPrimary disabled={(!formik.dirty || Object.values(formik.errors).length)} title={__('btn_update_name')} onPress={() => formik.handleSubmit()} />
      </ErrorBoundary>
   )
}

export default UpdateNameForm
