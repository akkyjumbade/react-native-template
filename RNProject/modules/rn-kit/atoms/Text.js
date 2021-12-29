import React from 'react'
import styled from 'styled-components/native'

const StyledText = styled.Text`
   font-family: Inter-Medium;
`

const Text = ({ children, ...props }) => {
   return (
      <StyledText {...props}>{children}</StyledText>
   )
}

export default Text
