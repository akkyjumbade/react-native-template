import React from 'react'
import styled from "styled-components/native";
import { Text, } from 'uikit';

const StyledFormControl = styled.View`
   font-size: 16px;
   color: ${({ theme }) => theme.colors.textColor};
   margin-bottom: 15px;
`
const ErrorMessage = styled.Text`
   font-size: 13px;
   color: ${({ theme }) => theme.colors.danger};
   margin-bottom: 10px;
   font-family: ${({ theme }) => theme.font_serif};
`

export default function FormControl(props) {
   const { error, label, children, caption } = props
   return (
      <StyledFormControl >
         {label && <Text size={14}>{label}</Text>}
         {children}
         {error ? (
            <>
            {error && (typeof error === 'string') ? (
               <ErrorMessage>{error}</ErrorMessage>
            ) : (
               <ErrorMessage>{error && error.join('. ')}</ErrorMessage>
            )}
            </>
         ) : (
            null
         )}
         {caption && caption(props)}
      </StyledFormControl>
   )
}
