import { View } from 'native-base'
import React from 'react'
import styled from 'styled-components/native'

const StyledCard = styled.View`
   background-white: white;
   padding: 15px;
   border-width: 1px;
   border-color: lightgray;
   border-radius: 10px;
`

export default function Card ({ children, ...restProps }) {
   return (
      <StyledCard {...restProps}>
         <View>
            {children}
         </View>
      </StyledCard>
   )
}
