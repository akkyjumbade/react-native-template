import React from 'react'
import styled, { css } from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';
import { HStack } from 'native-base';
import { StyledBaseButton } from '../themes/common';

const StyledButtonOutline = styled(StyledBaseButton)`
   background-color: white;
   color: black;
   ${props => {
      if (props.active) {
         return css`
         background-color: lightgray;
         `
      }
   }}
`

const ButtonOutline = (props) => {
   const { title, onPress, intent, leftIcon  } = props


   let labelStyle = {
      backgroundColor: 'transparent',
      color: 'black',
      fontSize: 17,
   }
   if (props.size === 'lg') {
      labelStyle = {
         ...labelStyle,
         fontSize: 18,
      }
   }
   if (props.size === 'sm') {
      labelStyle = {
         ...labelStyle,
         fontSize: 13,
      }
   }
   return (
      <StyledButtonOutline intent={intent} {...props} onPress={onPress} >
         <HStack space={2} alignItems={'center'}>
            {leftIcon && leftIcon()}
            <Text style={{ ...labelStyle, }}>{title}</Text>
         </HStack>
      </StyledButtonOutline>
   )
}

// size variants
ButtonOutline.SIZE_MD = 'md'
ButtonOutline.SIZE_SM = 'sm'
ButtonOutline.SIZE_LG = 'lg'
ButtonOutline.SIZE_FULL = 'full'

// intent variants
ButtonOutline.INTENT_PRIMARY = 'primary'
ButtonOutline.INTENT_DEFAULT = 'default'
ButtonOutline.INTENT_INFO = 'info'
ButtonOutline.INTENT_DANGER = 'danger'
ButtonOutline.INTENT_SUCCESS = 'success'

ButtonOutline.propTypes = {
   label: PropTypes.string,
   title: PropTypes.string,
   leftIcon: PropTypes.any,
   rightIcon: PropTypes.string,
   size: PropTypes.oneOf([
      ButtonOutline.SIZE_LG, ButtonOutline.SIZE_MD, ButtonOutline.SIZE_SM
   ]),
   intent: PropTypes.oneOf([
      ButtonOutline.INTENT_PRIMARY,
      ButtonOutline.INTENT_DEFAULT,
      ButtonOutline.INTENT_INFO,
      ButtonOutline.INTENT_DANGER,
      ButtonOutline.INTENT_SUCCESS,
   ]),
   onPress: PropTypes.func,
   disabled: PropTypes.bool,
   loading: PropTypes.bool,
}

ButtonOutline.defaultProps = {
   intent: ButtonOutline.INTENT_DEFAULT,
   size: ButtonOutline.SIZE_MD,
}

export default ButtonOutline
