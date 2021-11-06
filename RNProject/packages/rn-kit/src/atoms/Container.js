import React from 'react'
import styled from 'styled-components/native'

const StyledContainer = styled.View.attrs(attrs => ({
   align: attrs.align || 'stretch',
   content: attrs.content || 'flex-start',
   // padding: attrs.padding || '0 15px',
}))`
   padding: 0 15px;
   width: 100%;
   flex: 1;
   flex-direction: column;
   align-items: ${props => props.align};
   justify-content: ${props => props.content};
`
export default function Container(props) {
   return (
      <StyledContainer {...props}>
         {props.children}
      </StyledContainer>
   )
}
