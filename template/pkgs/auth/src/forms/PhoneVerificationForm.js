/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from 'formik'
import React, { Fragment, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { View } from 'react-native'
import { TextInput } from 'uikit'
import { FormControl } from 'uikit'
import { Button } from 'uikit'
import { Text } from 'uikit'
import { Loading } from 'uikit'
import { OtpInput } from 'uikit/src/molecules/TextInput'
import http from '../../../../src/utils/http'
import { colors } from '../../../../src/style/style'


const validationSchema = Yup.object().shape({
   phone: Yup.string().required(),
   otp: Yup.number().required(),
})

const sendOtp = ({ phone, prefix = '91', email }) => new Promise(async (resolve, reject) => {
   try {
      const urlParams = new URLSearchParams({
         phone,
         prefix,
         email
      })
      const { data } = await http.post(`/api/v1/otp?${urlParams.toString()}`)
      // alert(JSON.stringify({ data }))
      if (data.ok) {
         resolve(data)
      } else {
         reject(data)
      }

   } catch (error) {
      reject(error)
   }
})
const defaultCountryCode = '91'

const PhoneVerificationForm = ({ email, phone, countryCode = defaultCountryCode, ...props }) => {
   const initialValues = { phone, email, prefix: countryCode }
   const submitParentForm = props.handleSubmit
   const [otpStatus, setOtpStatus] = useState('IDLE')
   useEffect(() => {
      sendOtpToPhone(phone)
   }, [phone])
   function sendOtpToPhone() {
      setOtpStatus('LOADING')
      sendOtp({ phone, email, prefix: countryCode }).then((res) => {
         setOtpStatus(res.status)
      }).catch(error => {
         setOtpStatus('FAILED')
      }).finally(() => {

      })
   }
   function onResendClick() {
      sendOtpToPhone()
   }

   function onSkipClick() {
      if (props.onClose) {
         props.onClose({ action: 'skip', })
      }
   }
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
        const { data } = await http.post(`/api/v1/otp_verify`, {
           ...values
        })
        if(data && data.ok) {
         // alert(data.msg)
         props.onClose({ action: 'done', ...values })
         submitParentForm && submitParentForm()
        }

      } catch (error) {
         console.error({ error })
      } finally {
         action.setSubmitting(false)
      }

   }
   function _onPhoneNumberPressed() {
      // ask the numbers
   }

   return (
      <Fragment>
         <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues}>
            {({ values, errors, handleSubmit, handleChange, isSubmitting, }) => (
               <View style={{ padding: 15, marginVertical: 30, }}>
                  {otpStatus === 'LOADING' ? (
                     <Loading caption={'Sending OTP'} />
                  ) : null}
                  {otpStatus === 'SUCCESS' ? (
                     <Text style={{ marginBottom: 15, color: colors.danger, alignSelf: 'center',  }}>
                        OTP Sent on your E-mail.
                     </Text>
                  ) : null}
                  <FormControl label={'E-mail'} error={errors?.email}>
                     <TextInput readonly onChangeText={handleChange('email')} value={values.email}  />
                  </FormControl>
                  <FormControl label={'Enter OTP'} error={errors?.otp} caption={() => (
                     <Text>Enter OTP sent on your E-mail</Text>
                  )}>
                     <TextInput size={'lg'} onChangeText={handleChange('otp')} style={{ maxWidth: 150, }} value={values.otp}  />
                  </FormControl>
                  <View>
                     <Button onPress={handleSubmit} disabled={isSubmitting} size={'lg'} title={'Verify OTP'} intent={Button.INTENT_PRIMARY} />
                     {otpStatus === 'FAILED' ? (
                        <View style={{ marginVertical: 15, }}>
                           <Text style={{ marginBottom: 15, color: colors.danger, alignSelf: 'center',  }}>
                              Unable to send OTP, please try again.
                           </Text>
                           <View style={{ marginBottom: 15, }}>
                              <Button onPress={onResendClick} size={'lg'} title={'Resend OTP'} intent={Button.INTENT_DEFAULT} />
                           </View>
                           <View>
                              <Button onPress={onSkipClick} size={'lg'} title={'Skip'} intent={Button.INTENT_DEFAULT} />
                           </View>
                        </View>
                     ) : (
                        null
                     )}

                  </View>
               </View>
            )}
         </Formik>
      </Fragment>
   )
}
export default PhoneVerificationForm
