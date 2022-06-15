import React, { useCallback } from 'react'
import styled, { css } from 'styled-components/native'
import { Text as BaseText } from 'native-base'
import { fonts } from '../themes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const StyledText = styled(BaseText)`
   ${props => {
      return css`
         font-family: ${props.bold ? fonts.bold : fonts.primary};
      `
   }}
   letter-spacing: 0;
   color: ${({ theme }) => theme.colors.linkColor ?? '#0263e0'} ;
   textDecorationLine: underline;
   border-color: #0263e0;
`

const Hyperlink = ({ children, routeName, ...props }) => {
   const nav = useNavigation()
   // const navigate = useCallback((_routeName) => {
   //    nav.navigate(_routeName)
   // }, [nav])
   if (!routeName) {
      throw new Error('Route name not passed')
   }

   return (
      <TouchableOpacity onPress={() => nav.navigate(routeName)}>
         <StyledText {...props}>{children}</StyledText>
      </TouchableOpacity>
   )
}

Hyperlink.defaultProps = {
   ...BaseText.defaultProps
}

export default Hyperlink
