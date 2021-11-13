import React from 'react'
import styled from 'styled-components/native'

const StyledText = styled.Text`

`

const Text = ({ children, ...props }) => {
   return (
      <StyledText {...props}>{children}</StyledText>
   )
}

export default Text
