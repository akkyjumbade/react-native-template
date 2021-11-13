import React from 'react'
import styled from 'styled-components/native'

const StyledText = styled.Text`

`

const Text = ({ children }) => {
   return (
      <StyledText>{children}</StyledText>
   )
}

export default Text
