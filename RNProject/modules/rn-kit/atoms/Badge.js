import React from 'react'
import styled from 'styled-components/native'
import Text from './Text'

const StyledBadge = styled(Text)`
   background-color: ${props => props.color ?? 'white'};
   align-self: center;
   border-radius: 1000px;
   padding: 5px;
   line-height: 14px;
   font-size: 12px;
   z-index: 99;
   position: absolute;
   top: -12px;
   width: 23px;
   right: 0;
`

export default StyledBadge
