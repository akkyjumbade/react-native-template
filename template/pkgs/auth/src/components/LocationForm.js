import { Formik } from 'formik'
import React, { Fragment } from 'react'
import { View } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'uikit'
import { TextInput } from 'uikit'
import { FormControl } from 'uikit'
import { RadioGroup } from 'uikit/src/molecules/RadioControl'
import { T_SET_LOCATION } from '../../../../src/store/location/location_reducer'

const addressTypes = [
   {
      label: 'Home',
      value: 'home',
   },
   {
      label: 'Work',
      value: 'Work',
   },
   {
      label: 'Other',
      value: 'Other',
   },
]
const LocationForm = props => {
   const initialValues = props.initialValues || {}
   const dispatch = useDispatch()
   async function onFormSubmit(values, action) {
      try {
         dispatch({
            type: T_SET_LOCATION,
            payload: {
               selected: {
                  ...values
               }
            }
         })
      } catch (error) {

      }
   }
   return (
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onFormSubmit}>
         {({ values, errors, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <Fragment>
               <FormControl error={errors.address_line} label="Location">
                  <TextInput value={values.address_line} onChangeText={handleChange('address_line')} />
               </FormControl>
               {/* <FormControl label={'Apt. landmark etc.'} error={errors.address_line_2}>
                  <TextInput value={values.address_line_2} onChangeText={handleChange('address_line_2')} />
               </FormControl> */}
               {/* <FormControl label={'City'} error={errors.city}>
                  <TextInput value={values.city} onChangeText={handleChange('city')} />
               </FormControl>
               <FormControl label={'State'} error={errors.state}>
                  <TextInput value={values.state} onChangeText={handleChange('state')} />
               </FormControl> */}
               <FormControl label={'PIN Code'} error={errors.postal_code}>
                  <TextInput value={values.postal_code} onChangeText={handleChange('postal_code')} />
               </FormControl>

               <View style={{ marginBottom: 15, }}>
                  <Button disabled={isSubmitting} title="Done" onPress={handleSubmit} intent="primary" size="lg" />
               </View>
            </Fragment>
         )}
      </Formik>
   )
}
export default connect(state => ({
   user: state.auth.user,
}))(LocationForm)
