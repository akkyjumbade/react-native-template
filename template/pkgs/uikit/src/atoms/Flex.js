import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.View`
   flex-direction: ${props => props.dir || 'row' };
   align-items: ${props => props.alignItems || 'flex-start' };
`

export default function Flex(props) {
   return <StyledFlex {...props}>{props.children}</StyledFlex>
}
