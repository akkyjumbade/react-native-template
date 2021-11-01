import { Formik } from 'formik'
import React from 'react'
import { Fragment } from 'react'
import { View } from 'react-native'
import { TextInput } from 'uikit'
import { Container } from 'uikit'
import { Button } from 'uikit'
import { FormControl } from 'uikit'
import { Text } from 'uikit'

export default function PhoneFieldForm(props) {
   const initialValues = props.initialValues || {}
   async function onFormSubmit(values, action) {
      action.setSubmitting(true)
      try {

      } catch (error) {

      } finally {
         action.setSubmitting(false)
      }
   }
   return (
      <Formik initialValues={initialValues} onSubmit={onFormSubmit} >
         {({ values, errors, isSubmitting, handleChange, handleSubmit, }) => (
            <Fragment>
               <Container>
                  <FormControl label="Mobile number" error={errors?.phone}>
                     <TextInput keyboardType="phone-pad" value={values.phone} onChangeText={handleChange('phone')} />
                  </FormControl>
               </Container>
               <Container>
                  <Button disabled={isSubmitting} title="Update" block size="lg" />
               </Container>
            </Fragment>
         )}
      </Formik>
   )
}
