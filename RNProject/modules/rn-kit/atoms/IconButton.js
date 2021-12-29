import React, {  } from 'react'
import styled from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';
import { HStack } from 'native-base';
import { StyledBaseButton } from '../themes/common';
import icons from '@/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StyledButton = styled(TouchableOpacity)`
   background-color: ${({ intent, theme }) => theme.colors[intent]};
   color: black;
   border-radius: 1000px;
   padding: 12px;
`

function IconButton(props) {
   const { title, onPress, intent, leftIcon } = props;

   const IconElement = icons[props.icon]

   let labelStyle = {
      backgroundColor: 'transparent',
      color: 'black',
      fontSize: 17
   };
   if (props.size === 'lg') {
      labelStyle = {
         ...labelStyle,
         fontSize: 18
      };
   }
   return (
      <StyledButton intent={intent} {...props} onPress={onPress}>
         <HStack space={2} alignItems={'center'}>
            {/* {leftIcon && leftIcon()} */}
            {props.icon && (
               <IconElement />
            )}
         </HStack>
      </StyledButton>
   );
}

// size variants
IconButton.SIZE_MD = 'md'
IconButton.SIZE_SM = 'sm'
IconButton.SIZE_LG = 'lg'
IconButton.SIZE_FULL = 'full'

// intent variants
IconButton.INTENT_PRIMARY = 'primary'
IconButton.INTENT_DEFAULT = 'default'
IconButton.INTENT_INFO = 'info'
IconButton.INTENT_DANGER = 'danger'
IconButton.INTENT_SUCCESS = 'success'

IconButton.propTypes = {
   label: PropTypes.string,
   title: PropTypes.string,
   leftIcon: PropTypes.string,
   rightIcon: PropTypes.string,
   size: PropTypes.oneOf([
      IconButton.SIZE_LG, IconButton.SIZE_MD, IconButton.SIZE_SM
   ]),
   intent: PropTypes.oneOf([
      IconButton.INTENT_PRIMARY,
      IconButton.INTENT_DEFAULT,
      IconButton.INTENT_INFO,
      IconButton.INTENT_DANGER,
      IconButton.INTENT_SUCCESS,
   ]),
   onPress: PropTypes.func,
   disabled: PropTypes.bool,
   loading: PropTypes.bool,
}

IconButton.defaultProps = {
   intent: IconButton.INTENT_DEFAULT,
   size: IconButton.SIZE_MD,
}

export default React.forwardRef((props, ref) => <IconButton ref={ref} {...props} />)
