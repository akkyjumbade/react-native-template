import React from 'react'
import { Formik } from "formik"
import { Fragment } from "react"
import { View } from "react-native"
import { Button } from "uikit"
import { TextInput } from "uikit"
import { FormControl } from "uikit"
import { server } from '../../../../src/utils/http'
import { Text } from 'uikit'

const AddressForm = props => {
   const adddress = props.address
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         const { data: res } = await server().post(`/api/v1/my_addr?action=UPDATE`, {
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
         <Formik initialValues={adddress} onSubmit={onSubmit} >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
               <Fragment>
                  <FormControl error={errors.name} label="Name">
                     <TextInput value={values.name} onChangeText={handleChange('name')} />
                  </FormControl>
                  <FormControl error={errors.phone} label="Contact no.">
                     <TextInput prepend={() => (
                        <Text size={16}>+91</Text>
                     )} value={values.phone} onChangeText={handleChange('phone')} />
                  </FormControl>
                  <FormControl error={errors.address_line} label="Address line">
                     <TextInput value={values.address_line} onChangeText={handleChange('address_line')} />
                  </FormControl>
                  <FormControl label={'Address line 2'} error={errors.address_line_2}>
                     <TextInput value={values.address_line_2} onChangeText={handleChange('address_line_2')} />
                  </FormControl>
                  <FormControl label={'City'} error={errors.city}>
                     <TextInput value={values.city} onChangeText={handleChange('city')} />
                  </FormControl>
                  <FormControl label={'State'} error={errors.state}>
                     <TextInput value={values.state} onChangeText={handleChange('state')} />
                  </FormControl>
                  <FormControl label={'PIN Code'} error={errors.postal_code}>
                     <TextInput value={values.postal_code} onChangeText={handleChange('postal_code')} />
                  </FormControl>
                  <FormControl label={'Country'} error={errors.country}>
                     <TextInput value={values.country} onChangeText={handleChange('country')} />
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
export default AddressForm
