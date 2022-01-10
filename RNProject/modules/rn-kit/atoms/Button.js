import React, {  } from 'react'
import styled from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';
import { HStack } from 'native-base';
import { StyledBaseButton } from '../themes/common';

const StyledButton = styled(StyledBaseButton)`
   background-color: ${({ intent, theme }) => theme.colors[intent]};
   color: black;
`

const Button = (props) => {
   const { title, onPress, intent, leftIcon } = props


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
   if (props.small) {
      labelStyle = {
         ...labelStyle,
         fontSize: 13,
      }
   }
   return (
      <StyledButton intent={intent} {...props} onPress={onPress} >
         <HStack space={2} alignItems={'center'}>
            {leftIcon && leftIcon()}
            <Text style={{ ...labelStyle, }}>{title}</Text>
         </HStack>
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

export default React.forwardRef((props, ref) => <Button ref={ref} {...props} />)
