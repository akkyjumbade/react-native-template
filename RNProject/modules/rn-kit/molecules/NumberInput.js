import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components/native'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Fragment } from 'react'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import TextInput from './TextInput'
import { Text, } from '../atoms'
import ErrorBoundary from '@/components/errors/ErrorBoundary'
import { HStack } from 'native-base'
import Hyperlink from '../atoms/Hyperlink'

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


export default function NumberInput({ prepend, append, ...props }) {
   const config = useSelector(state => state.options)
   const togglePassword = () => {

   }

   return (
      <ErrorBoundary>
         <TextInput
            keyboardType="number-pad"
            />
         {/* <HStack justifyContent={'space-between'}>
            <Text>{''}</Text>
            <Hyperlink routeName={'/sdf'}>{'Send OTP'}</Hyperlink>
         </HStack> */}
      </ErrorBoundary>
   )

}
NumberInput.defaultProps = {
   // type: 'number',
}
NumberInput.propTypes = {
   name: PropTypes.string,
}
