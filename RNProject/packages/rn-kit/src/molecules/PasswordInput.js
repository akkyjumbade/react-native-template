import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components/native'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Icon, Text, TextInput } from '../..'
import { Fragment } from 'react'
import * as yup from 'yup'

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

const rules = {
   'length': 'The password is at least 8 characters long',
   'uppercase': 'The password has at least one uppercase letter',
   'lowercase': 'The password has at least one lowercase letter',
   'digit': 'The password has at least one digit',
   'char': 'The password has at least one special character',
}
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
const StrengthMeter = ({ percentage = 0 }) => {
   let completeStyle = {

   }
   return (
      <View style={styles.strength_view}>
         <View style={[styles.strength_bar, ]} />
      </View>
   )
}
export default function PasswordInput({ prepend, append, ...props }) {
   const [ errors, setErrors ] = useState(null)
   const strengthMeter = () => {
      return 0
   }
   const [ toggleEye, setToggleEye ] = useState(true)
   function togglePassword() {
      setToggleEye(prev => !prev)
   }
   useEffect(() => {
      const val = props.value
      schema.validate({ password: val }).then(_ => {
         setErrors(null)
      }).catch(err => {
         console.log({ err })
         setErrors(err.errors)
      })
      console.log({ val})
   }, [props.value])

   return (
      <Fragment>
         <TextInput {...props} secureTextEntry={toggleEye} append={() => (
            <Icon lib="feather" name={toggleEye ? 'eye' : 'eye-off'} size={20} style={{ marginRight: 10}} onPress={togglePassword} />
         )} />

         {props.showGuide && (
         <Fragment>
            <StrengthMeter />
            <View style={{ marginTop: 15, marginBottom: 15, }}>
               {Object.keys(rules).map((rl, rlk) => (
                  <Text color={errors?.includes(rl) ? 'red' : 'gray'} style={{ marginBottom: 6 }} key={rlk}>
                     {rules[rl]}
                  </Text>
               ))}
            </View>
         </Fragment>
         )}

      </Fragment>
   )

}

PasswordInput.propTypes = {
   name: PropTypes.string,
   type: PropTypes.oneOf([ 'email', 'tel', 'text', 'number', 'password' ]),
   secureTextEntry: PropTypes.bool,
   autocapitalize: PropTypes.bool,
}
