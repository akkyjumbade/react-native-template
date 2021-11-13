import React, { Fragment } from 'react'
import styled from 'styled-components/native'
import { TextInput as BaseTextInput } from 'react-native';

const StyledTextInput = styled.TextInput`
   height: 35px;
   border-bottom-width: 1px;
   border-color: ${props => props.theme.colors.secondary};
   border-style: solid;
`


export default function TextInput({ ...props }) {
   return (
      <StyledTextInput {...props} />
   )
}

TextInput.propTypes = {
   ...BaseTextInput.propTypes
}
