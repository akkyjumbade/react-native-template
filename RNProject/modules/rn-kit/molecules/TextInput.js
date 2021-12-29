import React, { Fragment } from 'react'
import styled from 'styled-components/native'
import { TextInput as BaseTextInput } from 'react-native';
import { fonts } from '../themes';

const StyledInputField = styled.View`
   flex-direction: row;
   align-items: center;
   border-bottom-width: 1px;
   border-color: ${props => props.theme.colors.secondary};
   border-style: solid;
`

const StyledTextInput = styled.TextInput`
   height: 35px;
   padding: 0;
   font-size: 17px;
   flex: 1;
   font-family: ${fonts.primary} ;
   color: black;
`


export default function TextInput({ prepend, append,...props }) {
   return (
      <StyledInputField>
         {prepend && prepend()}
         <StyledTextInput {...props} />
         {append && append()}
      </StyledInputField>
   )
}

TextInput.propTypes = {
   ...BaseTextInput.propTypes
}
