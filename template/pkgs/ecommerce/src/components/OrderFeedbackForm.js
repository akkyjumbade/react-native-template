import React from 'react'
import { Formik } from "formik"
import { Fragment } from "react"
import { View } from "react-native"
import { Button } from "uikit"
import { TextInput } from "uikit"
import { FormControl } from "uikit"
import { server } from '../../../../src/utils/http'
import { Text } from 'uikit'

const OrderFeedbackForm = props => {
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         const { data: res } = await server().post(`/api/v1/feedback?action=POST`, {
            ...values,
            // _method: ''
         })
         if (res.ok) {
            props.onSuccess && props.onSuccess(res)
         }
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
         <Formik initialValues={{ }} onSubmit={onSubmit} >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
               <Fragment>
                  <FormControl error={errors.name} label="Message">
                     <TextInput value={values.name} onChangeText={handleChange('name')} />
                  </FormControl>
                  <View style={{ marginBottom: 15, }}>
                     <Button disabled={isSubmitting} title="Done" onPress={handleSubmit} intent="primary" size="lg" />
                  </View>
                  {props.onCancel && (
                  <View style={{ marginBottom: 15, }}>
                     <Button disabled={isSubmitting} title="Cancel" onPress={cancelAction} intent="default" size="lg" />
                  </View>
                  )}
               </Fragment>
            )}
         </Formik>
      </View>
   )
}
export default OrderFeedbackForm
