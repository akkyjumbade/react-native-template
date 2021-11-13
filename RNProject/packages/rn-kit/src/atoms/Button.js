import React, {  } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';

const buttonSizes = {
   md: '40px',
   lg: '60px',
}

const StyledButton = styled.TouchableOpacity`
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

const Button = (props) => {
   const { title, onPress, intent  } = props


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
      <StyledButton intent={intent} {...props} onPress={onPress} >

         <Text style={{ ...labelStyle, }}>{title}</Text>
         <Text style={{ ...labelStyle, }}>{JSON.stringify({ intent })}</Text>

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

Button.defaultProps = {
   intent: Button.INTENT_DEFAULT,
   size: Button.SIZE_MD,
}

export default Button
