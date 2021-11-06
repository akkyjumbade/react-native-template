import React, { useContext } from 'react'
import styled, { css } from "styled-components/native";
import PropTypes from 'prop-types'
import { Pressable, Text as BaseText } from 'react-native';
import { ThemeContext } from 'styled-components';

const weights = {
   'regular': 'Futura Book',
   'medium': 'Futura Book',
   'bold': 'Futura Bold',
}

const StyledText = styled(BaseText).attrs(attrs => ({
   weight: attrs.weight ?? 'regular',
}))`
   color: ${({ theme, color }) => color ? color : theme.colors.textColor};
   font-size: ${({ size }) => size ? size + 'px' : '14px'};
   margin: ${({ margin }) => margin ? margin : '0px'};
   background-color: transparent;
   letter-spacing: 0;
   ${props => {
      if ( props.marginBottom ) {
         return css`
            margin-bottom: ${props.marginBottom}px;
         `
      }

   }}
`


export default function Text(props) {
   return <StyledText {...props} />
}

export const Title = props => {
   return (
      <Text {...props} weight="bold" style={{ marginBottom: 20, marginTop: 10, }} size={Text.SIZE_TITLE}>{props.children}</Text>
   )
}
export const Heading = props => {
   return (
      <Text style={{ marginBottom: 20, marginTop: 10, }} {...props} weight="bold" size={Text.SIZE_HEADING}>{props.children}</Text>
   )
}
export const NavLink = props => {
   const { colors } = useContext(ThemeContext)
   return (
      <Pressable onPress={props.onPress}>
         <Text {...props} color={colors.secondary}>{props.children}</Text>
      </Pressable>
   )
}


Text.SIZE_HEADING = 19
Text.SIZE_TITLE = 30
Text.SIZE_TEXT = 22
Text.SIZE_SM = 13

Text.propTypes = {
   size: PropTypes.number,
   color: PropTypes.string,
}
Title.propTypes = {
   ...Text.propTypes
}
Heading.propTypes = {
   ...Text.propTypes
}
