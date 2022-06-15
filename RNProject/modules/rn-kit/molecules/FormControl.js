import ErrorBoundary from '@/components/errors/ErrorBoundary';
import React, { memo } from 'react'
import styled from "styled-components/native";
import { Text, } from '../atoms';

const StyledFormControl = styled.View`
   font-size: 16px;
   color: ${({ theme }) => theme.colors.textColor};
   margin-bottom: 15px;
`
const ErrorMessage = styled.Text`
   font-size: 13px;
   color: ${({ theme }) => theme.colors.danger};
   margin-bottom: 10px;
`

const FormControl = ({ error, label, children, caption, ...props}) => {
   return (
      <ErrorBoundary>
         <StyledFormControl >
            {label && <Text >{label}</Text>}
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
      </ErrorBoundary>
   )
}


export default memo(FormControl)
