import React from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';

const buttonSizes = {
   md: '40px',
   lg: '60px',
}

const StyledButtonOutline = styled.TouchableOpacity`
   padding: 0 20px;
   border-radius: 10px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   overflow: hidden;
   height: ${props => buttonSizes[props.size]};
   background-color: ${({ intent, theme }) => theme.colors[intent]};
   color: black;
`

const ButtonOutline = (props) => {
   const { title, onPress, leftIcon, rightIcon, disabled, loading, intent  } = props


   let labelStyle = {
      backgroundColor: 'transparent',
      color: 'white'
   }
   if (props.size === 'lg') {
      labelStyle = {
         ...labelStyle,
         fontSize: 18,
      }
   }
   return (
      <StyledButtonOutline intent={intent} {...props} onPress={onPress} >
         <Text style={{ ...labelStyle, }}>{title}</Text>
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
   leftIcon: PropTypes.string,
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
