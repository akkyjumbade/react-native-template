import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components/native'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Icon from '../atoms/Icon'

const TextInputContainer = styled.View`
   flex-direction: row;
   align-items: center;
   height: 44px;
   border-color: #eee;
   border-width: 1px;
   width: 100%;
   font-family: ${({ theme }) => theme.font_primary};
   color: black;
   border-radius: 12px;
   background-color: #eee;

   ${props => {
      let style = css``
      switch (props.size) {
         case 'lg':
            style = css`
            height: 55px;
            font-size: 26px;
            padding: 10px 0;
            `
            break;

         default:
            break;
      }
      return style
   }}
`

const StyledTextInput = styled.TextInput`
   height: 44px;
   font-size: 18px;
   flex: 1;
   width: 100%;
   padding: 0 14px;
   font-family: ${({ theme }) => theme.font_primary};
   ${props => {
      let style = css``
      switch (props.size) {
         case 'lg':
            style = css`
            height: 55px;
            font-size: 26px;
            padding: 10px 0;
            `
            break;

         default:
            break;
      }
      return style
   }}
`
const styles = StyleSheet.create({
   container: {
      position: 'relative',
      flexDirection: 'row',
      flexWrap: 'nowrap'
   },
   prepend: {
      // marginRight: -30,
      marginTop: 0,
      zIndex:9,
   },
   append: {
      // marginLeft: -25,
      marginTop: 0,
   },
})

export default function TextInput({ prepend, append, ...props }) {
   const hasPrepend = Boolean(prepend)
   const hasAppend = Boolean(append)
   const inputEl = useRef()
   const fieldProps = {
      size: props.size,
   }
   const inputProps = {
      focused: false
   }
   useEffect(() => {
      if (props.focus) {
         inputEl.current?.focus()
      }
   }, [ inputEl, props.focus ])

   return (
      <TextInputContainer {...fieldProps} >
         {prepend && prepend ? (
            <View style={styles.prepend}>
               {prepend()}
            </View>
         ) : (null)}
         <StyledTextInput onFocus={ev => inputProps.focused = !inputProps.focused} {...inputProps} placeholderTextColor="#666" ref={inputEl} hasAppend={hasAppend} hasPrepend={hasPrepend} {...props} />
         {append && append ? (
            <View style={styles.append}>
               {append()}
            </View>
         ) : (null)}
      </TextInputContainer>
   )
}

export const OtpInput = props => {
   return (
      <TextInput pinCount={4} {...props} />
   )
}

TextInput.propTypes = {
   name: PropTypes.string,
   type: PropTypes.oneOf([ 'email', 'tel', 'text', 'number', 'password' ]),
   secureTextEntry: PropTypes.bool,
   autocapitalize: PropTypes.bool,
}
