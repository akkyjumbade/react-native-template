import React from 'react'
import styled, { css } from "styled-components/native";
import PropTypes from 'prop-types'
import Text from './Text';
import { Spinner } from './Loading';
import { StyleSheet } from 'react-native';
import { HStack, View } from 'native-base';
import { StyledBaseButton } from '../themes/common';

const StyledButton = styled(StyledBaseButton)`
   background-color: ${({ theme, loading = false }) => {
      if(loading) {
         return 'gray'
      }
      return theme.colors.primary
   }};
   color: black;

`

const ButtonPrimary = (props) => {
   const { title, onPress, intent = 'primary', loading = false, leftIcon  } = props

   let labelStyle = {
      backgroundColor: 'transparent',
      // color: 'white',
      fontSize: 17,
   }
   if (props.size === 'lg') {
      labelStyle = {
         ...labelStyle,

      }
   }
   if (loading) {
      labelStyle = {
         ...labelStyle,
         opacity: 0
      }
   }
   return (
      <StyledButton intent={intent} loading={loading} {...props} onPress={onPress} >
         {loading && (
            <View style={{ ...StyleSheet.absoluteFillObject, top: 13 }}>
               <Spinner />
            </View>
         )}
         <HStack space={2} alignItems={'center'}>
            {leftIcon && leftIcon()}
            <Text style={{ ...labelStyle, }}>{title}</Text>
         </HStack>
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
