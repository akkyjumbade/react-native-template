import React, { useMemo } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css, } from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';
import Icon from './Icon';
import { Spinner } from './Loading';
import { colors } from '../../../../src/style/style';


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
function getTextColor(intent) {
   switch (intent) {
      case 'primary':
         return colors.dark
         break;
      case 'info':
         return colors.dark;
         break;
      case 'danger':
         return colors.white;
         break;
      case 'secondary':
      case 'default':
         return colors.light;
      default:
         return colors.dark;
         break;
   }
}

const Button = (props) => {
   const { title, onPress, leftIcon, rightIcon, disabled, loading  } = props
   const isLoading = useMemo(() => {
      // return 1
      return loading || disabled
   }, [loading, disabled])

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
         {/* add other features like icon prepends and loading */}
         {leftIcon && (
            <Icon name={leftIcon} />
         )}
         {isLoading && (
            <LoadingWrapper>
               <Spinner />
            </LoadingWrapper>
         )}
         <Text style={{ ...labelStyle, backgroundColor: 'transparent', color: getTextColor(props.intent) }}>{title}</Text>
         {rightIcon && (
            <Icon name={rightIcon} />
         )}
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
