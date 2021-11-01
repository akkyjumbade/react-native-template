import { Formik } from 'formik'
import React from 'react'
import { Fragment } from 'react'
import { View } from 'react-native'
import {TextInput, Title} from 'uikit'
import { Container } from 'uikit'
import { Button } from 'uikit'
import { FormControl } from 'uikit'
import { Text } from 'uikit'
import __ from "../../../../src/utils/locale";

export default function EmailFieldForm(props) {
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
                  <Title>{__('update_email_title')}</Title>
                  <FormControl label={__('email')} error={errors?.email} caption={() => (
                     <Text>{__('email_change_notice')}</Text>
                  )}>
                     <TextInput keyboardType="email-address" value={values.email} onChangeText={handleChange('email')} />
                  </FormControl>
               </Container>
               <Container>
                  <Button disabled={isSubmitting} title={__('update-btn')} block size="lg" />
               </Container>
            </Fragment>
         )}
      </Formik>
   )
}
