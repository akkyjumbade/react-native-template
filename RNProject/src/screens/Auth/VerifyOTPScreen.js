import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect, useSelector } from 'react-redux'
import useTranslation from '../../hooks/useTranslation'
import Page from "@modules/rn-kit/layouts/Page";
import { Button, ButtonPrimary } from '@modules/rn-kit/atoms'
import { FormControl } from '@modules/rn-kit/molecules'
import Text from '@modules/rn-kit/atoms/Text'
import OtpInput from '@modules/rn-kit/atoms/OtpInput'
import { useMutation } from 'react-query'
import http from '@/utils/http'
import { Center, HStack, useToast, VStack } from 'native-base'
import { Hyperlink } from '@modules/rn-kit/atoms'
import icons from '@/icons'

const TIME_TO_RESEND = 30

const VerificationScreen = ({ user }) => {
   const auth = useSelector(state => state.auth)
   const __ = useTranslation()
   const toast = useToast()
   const [ otp, setOtp ] = useState('')
   const [throttleTimeout, setThrottleTimeout] = useState(TIME_TO_RESEND)
   const { data, isLoading, mutateAsync } = useMutation(async payload => {
      return await http().post(`/api/send_verification`, payload)
   }, {
      onSuccess(res) {
         // on success proceed
      },
      onError(er) {
         toast.show({
            title: er.message
         })
      },
      onSettled() {

      }
   })

   const { isLoading: isVerifying } = useMutation(async payload => {
      return await http().post(`/api/verification/verify`, payload)
   }, {
      onSuccess(res) {
         // on success proceed
      },
      onError(er) {
         toast.show({
            title: er.message
         })
      }
   })
   function triggerSendVerification() {
      setThrottleTimeout(TIME_TO_RESEND)
      mutateAsync({ phone: user?.phone, }).finally(() => {
         let interval = setInterval(() => {
            setThrottleTimeout(prev => {
               if (prev === 0) {
                  clearInterval(interval)
                  return 0
               }
               return prev - 1
            })
         }, 1000)


      })
   }
   useEffect(() => {
      triggerSendVerification()
      return () => {
         // clearInterval(interval)
      }
   }, [])

   return (
      <Page >
         <Page.Container>
            <Page.Title>Verification</Page.Title>
            <Text style={{ marginBottom: 0 }}>{__('verification_description')}</Text>
            <Text bold style={{ marginBottom: 15 }}>{user?.phone ?? 'xx580'}</Text>
            <VStack style={{ height: 'auto' }}>
               <View >
                  {isLoading ? (
                     <Text>Sending OTP...</Text>
                  ) : (
                     <Text>OTP Sent on registered phone number.</Text>
                  )}
                  <FormControl >
                     <OtpInput value={otp} onChange={val => setOtp(val)} />
                     <View style={{ marginTop: 20, }}>
                        <HStack space={6} alignItems={'center'} justifyContent={'space-between'} >
                           <View>

                           </View>
                           {(throttleTimeout !== 0) && (
                           <Text >Retry in {throttleTimeout}</Text>
                           )}
                        </HStack>
                     </View>
                  </FormControl>
               </View>
            </VStack>
            <View style={{ marginVertical: 30 }}>
               {/* <Text>Resend OTP</Text> */}
               <VStack space={6}>
                  {(throttleTimeout <= 0) && (
                  <Button onPress={triggerSendVerification}  title={'Resend OTP'} />
                  )}
                  <ButtonPrimary title={'Verify'} disabled={!otp} />
               </VStack>
            </View>
            {/* <Text>{__('verifica')}</Text> */}
         </Page.Container>
      </Page>
   )
}

VerificationScreen.propTypes = {
   // prop: PropTypes.string
}

VerificationScreen.defaultProps = {
   // type: 'text'
}

export default connect(state => ({
   user: state.auth.user
}))(VerificationScreen)
