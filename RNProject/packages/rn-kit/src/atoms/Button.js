import React, { useContext, useMemo } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css, } from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';


const StyledButton = styled.TouchableOpacity.attrs(attrs => ({
   size: attrs.size || 'md',
   intent: attrs.intent || 'primary',
}))`
   padding: 0 20px;
   border-radius: 10px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   overflow: hidden;
   background-color: ${props => props.theme.colors[props.intent]};

   ${props => {
      if (props.block) {
         return css`
            width: 100%;
         `
      }
   }}

   ${props => {
      let _style = ``
      if (props.disabled) {
         _style += css`
            opacity: .5;
         `
      }
      switch (props.size) {
         case 'sm':
            _style += css`
            line-height: 25px;
            font-size: 14px;
            height: 25px;
            `
            break;
         case 'lg':
            _style += css`
            line-height: 50px;
            font-size: 28px;
            height: 55px;
            border-radius: 16px;
            `
            break;

         default:
            _style += css`
            line-height: 40px;
            font-size: 20px;
            height: 40px;
            `
            break;
      }
      return _style
   }};

   ${props => {
      let _style = ``
      // intent specific style
      switch (props.intent) {
         case 'primary':
            _style += css`
            color: ${({ theme }) => theme.colors.dark};
            background-color: ${({ theme }) => theme.colors.primary};
            `
            break;
         case 'info':
            _style += css`
            color: ${({ theme }) => theme.colors.dark};
            background-color: ${({ theme }) => theme.colors.info};
            `
            break;
         case 'danger':
            _style += css`
            color: white;
            background-color: ${({ theme }) => theme.colors.danger};
            `
            break;
         case 'default':
            _style += css`
            color: ${({ theme }) => theme.colors.light};
            background-color: ${({ theme }) => theme.colors.info};
            elevation: 3;
            `
            break;

         default:
            _style += css`
            elevation: 1;
            color: ${({ theme }) => theme.colors.light};
            border: 1px solid ${({ theme }) => theme.colors.gray};
            `
            break;
      }
      return _style
   }}
`
const LoadingWrapper = styled.View`
   position: absolute;
   background-color: ${({ theme }) => theme.colors.secondary};
   left: 0;
   right: 0;
   top: 0;
   align-self: stretch;
   height: 50px;
   z-index: 99;
   flex-direction: row;
   text-align: center;
   align-items: center;
   padding: 6px 15px;
   flex-wrap: nowrap;
   opacity: 1;
`

const Button = (props) => {
   const { title, onPress, leftIcon, rightIcon, disabled, loading  } = props


   let labelStyle = {

   }
   if (props.size === 'lg') {
      labelStyle = {
         ...labelStyle,
         fontSize: 18,
      }
   }
   return (
      <StyledButton {...props} onPress={onPress} >

         <Text style={{ ...labelStyle, backgroundColor: 'transparent', color: 'white' }}>{title}</Text>

      </StyledButton>
   )
}

// size variants
Button.SIZE_MD = 'md'
Button.SIZE_SM = 'sm'
Button.SIZE_LG = 'lg'
Button.SIZE_FULL = 'full'

// intent variants
Button.INTENT_PRIMARY = 'primary'
Button.INTENT_DEFAULT = 'default'
Button.INTENT_INFO = 'info'
Button.INTENT_DANGER = 'danger'
Button.INTENT_SUCCESS = 'success'

Button.propTypes = {
   label: PropTypes.string,
   title: PropTypes.string,
   leftIcon: PropTypes.string,
   rightIcon: PropTypes.string,
   size: PropTypes.oneOf([
      Button.SIZE_LG, Button.SIZE_MD, Button.SIZE_SM
   ]),
   intent: PropTypes.oneOf([
      Button.INTENT_PRIMARY,
      Button.INTENT_DEFAULT,
      Button.INTENT_INFO,
      Button.INTENT_DANGER,
      Button.INTENT_SUCCESS,
   ]),
   onPress: PropTypes.func,
   disabled: PropTypes.bool,
   loading: PropTypes.bool,
}

export default Button
