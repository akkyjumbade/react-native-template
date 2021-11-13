import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components/native'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Icon, Text, TextInput } from '../..'
import { Fragment } from 'react'
import * as yup from 'yup'
import { useSelector } from 'react-redux'

yup.setLocale({
   // use constant translation keys for messages without values
   mixed: {
      default: 'field_invalid',
   },
   // use functions to generate an error object that includes the value from the schema
   number: {
      // min: ({ min }) => ({ key: 'too_short', values: { min } }),
      // max: ({ max }) => ({ key: 'too_big', values: { max } }),
   },
   string: {
      // min: ({ min }) => ('length'),
      // max: ({ max }) => ('length'),
   },
});

let schema = yup.object().shape({
   password: yup.string().min(8),
   // age: yup.number().min(18),
});


const styles = StyleSheet.create({
   strength_view: {
      marginTop: 8,
      backgroundColor: '#ccc',
      borderRadius: 10,
   },
   strength_bar: {
      width: '00%',
      height: 4,
      backgroundColor: 'red'
   },
})

export default function PhoneNumberInput({ prepend, append, ...props }) {
   const config = useSelector(state => state.config)
   const togglePassword = () => {

   }
   return (
      <Fragment>
         <TextInput keyboardType="phone-number" {...props} prepend={() => (
            <Text style={{ marginLeft: 10, }} size={17} onPress={togglePassword} >
               {config.countryPhoneCode}
            </Text>
         )} />
         {/* <Text>{JSON.stringify({ config })}</Text> */}
      </Fragment>
   )

}
PhoneNumberInput.defaultProps = {
   type: 'number',
}
PhoneNumberInput.propTypes = {
   name: PropTypes.string,
   type: PropTypes.oneOf([ 'email', 'tel', 'text', 'number', 'password' ]),
}
