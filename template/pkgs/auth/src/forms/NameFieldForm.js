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
import * as yup from 'yup'

const validationScheme = yup.object().shape({
   first_name: yup.string().max(100).required(),
   last_name: yup.string().max(100).required(),
})

export default function NameFieldForm(props) {
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
      <Formik validationSchema={validationScheme} initialValues={initialValues} onSubmit={onFormSubmit} >
         {({ values, errors, isSubmitting, handleChange, handleSubmit, }) => (
            <Fragment>
               <Container>
                  <Title>{__('update_name_title')}</Title>

                  <FormControl label={__('first_name')} error={errors?.first_name}>
                     <TextInput value={values.first_name} onChangeText={handleChange('first_name')} />
                  </FormControl>
                  <FormControl label={__('last_name')} error={errors?.last_name}>
                     <TextInput value={values.last_name} onChangeText={handleChange('last_name')} />
                  </FormControl>
               </Container>
               <Container>
                  <Button disabled={isSubmitting} onPress={handleSubmit} title={__('update_name_btn')} block size="lg" />
               </Container>
            </Fragment>
         )}
      </Formik>
   )
}
