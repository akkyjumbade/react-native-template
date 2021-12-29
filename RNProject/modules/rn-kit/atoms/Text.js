import React from 'react'
import styled, { css } from 'styled-components/native'
import { Text as BaseText } from 'native-base'
import { fonts } from '../themes'

const StyledText = styled(BaseText)`
   ${props => {
      return css`
         font-family: ${props.bold ? fonts.bold : fonts.primary};
      `
   }}
   letter-spacing: 0;
`

const Text = ({ children, ...props }) => {
   return (
      <StyledText {...props}>{children}</StyledText>
   )
}

Text.defaultProps = {
   ...BaseText.defaultProps
}

export default Text
