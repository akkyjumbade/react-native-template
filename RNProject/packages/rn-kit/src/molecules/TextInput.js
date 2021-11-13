import React, { Fragment } from 'react'
import styled from 'styled-components/native'
import { TextInput as BaseTextInput } from 'react-native';

const StyledTextInput = styled.TextInput`
`


export default function TextInput({ ...props }) {
   return (
      <StyledTextInput {...props} />
   )
}

TextInput.propTypes = {
   ...BaseTextInput.propTypes
}
