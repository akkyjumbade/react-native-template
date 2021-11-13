import React, { useContext, useMemo } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css, } from "styled-components/native";
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
   background-color: ${({ intent, theme }) => theme.colors.primary};
   color: white;
`

const ButtonPrimary = (props) => {
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
      <StyledButton intent={intent} {...props} onPress={onPress} >
         <Text style={{ ...labelStyle, }}>{title}</Text>
      </StyledButton>
   )
}

// size variants
ButtonPrimary.SIZE_MD = 'md'
ButtonPrimary.SIZE_SM = 'sm'
ButtonPrimary.SIZE_LG = 'lg'
ButtonPrimary.SIZE_FULL = 'full'

// intent variants
ButtonPrimary.INTENT_PRIMARY = 'primary'
ButtonPrimary.INTENT_DEFAULT = 'default'
ButtonPrimary.INTENT_INFO = 'info'
ButtonPrimary.INTENT_DANGER = 'danger'
ButtonPrimary.INTENT_SUCCESS = 'success'

ButtonPrimary.propTypes = {
   label: PropTypes.string,
   title: PropTypes.string,
   leftIcon: PropTypes.string,
   rightIcon: PropTypes.string,
   size: PropTypes.oneOf([
      ButtonPrimary.SIZE_LG, ButtonPrimary.SIZE_MD, ButtonPrimary.SIZE_SM
   ]),
   intent: PropTypes.oneOf([
      ButtonPrimary.INTENT_PRIMARY,
      ButtonPrimary.INTENT_DEFAULT,
      ButtonPrimary.INTENT_INFO,
      ButtonPrimary.INTENT_DANGER,
      ButtonPrimary.INTENT_SUCCESS,
   ]),
   onPress: PropTypes.func,
   disabled: PropTypes.bool,
   loading: PropTypes.bool,
}

ButtonPrimary.defaultProps = {
   intent: ButtonPrimary.INTENT_DEFAULT,
   size: ButtonPrimary.SIZE_MD,
}

export default ButtonPrimary
