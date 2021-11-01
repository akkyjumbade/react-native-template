import React from 'react'
import { Formik } from "formik"
import { Fragment } from "react"
import { View } from "react-native"
import { Button } from "uikit"
import { TextInput } from "uikit"
import { FormControl } from "uikit"
import { server } from '../../../../src/utils/http'
import { Text } from 'uikit'
import __ from '../../../../src/utils/locale'
import { Heading } from 'uikit/src/atoms/Text'
import { useMutation } from 'react-query'

const CancelOrderForm = props => {
   const initialValues = props.values
   const { mutate: cancelOrderAction, status: cancelStatus } = useMutation(payload => {
      return server().post(`/api/v1/my_orders/${initialValues.id}?action=update`, {
         ...payload
      })
   })
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         cancelOrderAction(values)
      } catch (error) {
         console.log(JSON.stringify(error))
         if (error?.response?.data?.errors) {
            action.setErrors(error?.response?.data?.errors)
         }
         props.onError && props.onError(error)
      } finally {
         action.setSubmitting(false)
      }
   }
   function cancelAction() {
      props.onCancel && props.onCancel()
   }
   return (
      <View style={{ padding: 15, }}>
         {/* <Text>{JSON.stringify(props)}</Text> */}
         <Heading>Order Cancellation</Heading>
         <Formik initialValues={initialValues} onSubmit={onSubmit} >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
               <Fragment>
                  <FormControl error={errors.reason} label={__('Reason for cancellation?')}>
                     <TextInput value={values.reason} onChangeText={handleChange('reason')} />
                  </FormControl>
                  <FormControl label={__('Comment or feedback')} error={errors.comment}>
                     <TextInput value={values.comment} onChangeText={handleChange('comment')} />
                  </FormControl>
                  <View style={{ marginBottom: 15, }}>
                     <Button disabled={isSubmitting} title="Cancel Order" onPress={handleSubmit} intent="primary" size="lg" />
                  </View>
                  {props.onCancel && (
                  <View style={{ marginBottom: 15, }}>
                     <Button disabled={isSubmitting} title="Don't Cancel" onPress={cancelAction} intent="default" size="lg" />
                  </View>
                  )}
               </Fragment>
            )}
         </Formik>
      </View>
   )
}
export default CancelOrderForm
