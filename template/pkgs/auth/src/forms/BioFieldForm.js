import { Formik } from 'formik'
import React from 'react'
import { Fragment } from 'react'
import { View } from 'react-native'
import { TextInput } from 'uikit'
import { Container } from 'uikit'
import { Button } from 'uikit'
import { FormControl } from 'uikit'
import { Text } from 'uikit'

export default function BioFieldForm(props) {
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
                  <FormControl label="E-Mail" error={errors?.email} caption={() => (
                     <Text>You should not change your email address!</Text>
                  )}>
                     <TextInput keyboardType="email-address" value={values.email} onChangeText={handleChange('email')} />
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
