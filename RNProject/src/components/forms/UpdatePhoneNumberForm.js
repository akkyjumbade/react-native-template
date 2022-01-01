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
import PhoneNumberInput from '@modules/rn-kit/molecules/PhoneNumberInput'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OtpInput from '@modules/rn-kit/atoms/OtpInput'



const UpdatePhoneNumberForm = ({ initialValues = {}, }) => {
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
         <FormControl label={__('phone')} >
            <PhoneNumberInput values={formik.values.phone} onChangeText={formik.handleChange('phone')}  />
         </FormControl>
         <FormControl label={__('otp')} >
            <OtpInput
               value={formik.values.otp}
               onChange={formik.handleChange('otp')}
            />
         </FormControl>
         <ButtonPrimary disabled={(!formik.dirty || Object.values(formik.errors).length)} title={__('btn_update_phone')} onPress={() => formik.handleSubmit()} />
      </ErrorBoundary>
   )
}

export default UpdatePhoneNumberForm
