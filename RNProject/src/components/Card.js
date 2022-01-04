import { Text } from '@modules/rn-kit/atoms'
import { View } from 'react-native'
import React from 'react'
import styled, { css } from 'styled-components/native'

const StyledCard = styled.View`
   background-white: white;
   padding: 15px;
   border-width: 1px;
   border-color: lightgray;
   border-radius: 10px;
   min-height: 40px;
   height: auto;
   width: 100%;
   ${props => {
      let cssx = ``
      if (props.center) {
         cssx += `
            align-items: center;
            justify-content: center;
         `
      }
      if (props.flex) {
         cssx += `
            flex: 1;
         `
      }
      return css`${cssx}`
   }}
`

export default function Card ({ children, title, ...restProps }) {
   return (
      <StyledCard {...restProps}>
         <View>
            {title && <Text bold>{title}</Text>}
            {children}
         </View>
      </StyledCard>
   )
}
