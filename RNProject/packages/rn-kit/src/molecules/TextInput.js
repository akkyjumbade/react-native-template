import React, { memo, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components/native'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput as TextInputBase, View } from 'react-native'
// import Icon from '../atoms/Icon'


function TextInput({ prepend, append, ...props }) {
   return (
      <TextInputBase {...props} />
   )
}

export default memo(TextInput)

TextInput.propTypes = {
   name: PropTypes.string,
   type: PropTypes.oneOf([ 'email', 'tel', 'text', 'number', 'password' ]),
   secureTextEntry: PropTypes.bool,
   autocapitalize: PropTypes.bool,
}
