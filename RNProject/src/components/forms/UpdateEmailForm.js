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
import EmailInput from '@modules/rn-kit/molecules/EmailInput'


const UpdateEmailForm = ({ initialValues = {}, }) => {
   const nav = useNavigation()
   const __  = useTranslation()
   const onSubmit = async (values) => {
      // return await http()
   }
   const formik = useFormik({
      initialValues,
      // onSubmit:
   })
   return (
      <ErrorBoundary>
         <FormControl label={__('email')} >
            <EmailInput values={formik.values.email} onChangeText={formik.handleChange('email')}  />
         </FormControl>
         <ButtonPrimary title={__('btn_update_email')} onPress={() => nav.navigate('Home')} />
      </ErrorBoundary>
   )
}

export default UpdateEmailForm
