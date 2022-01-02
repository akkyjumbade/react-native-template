import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, } from '../atoms'
import { connect } from 'react-redux';
import styled, { css } from 'styled-components/native';
import colors from '../themes/colors';
import icons from '@/icons';
import { HStack, VStack } from 'native-base';

const accents = {
   default: colors.default,
   danger: colors.danger,
   warning: colors.warning,
   success: colors.success,
}
const StyledAlert = styled.View`
   padding: 15px;
   border-radius: 10px;
   color: black;
   margin-bottom: 15px;
   flex-direction: row;
   align-items: center;
   ${props => {
      let intent = props.intent ?? 'default'
      let bgColor = accents[intent]
      return css`
      background-color: ${bgColor};
      `
   }}
`

const Alert = (props) => {
   const { children, title } = props

   return (
      <StyledAlert {...props}>
         <HStack space={3} alignItems={'center'}>
            <icons.exclaimation />
            {title && (
            <Text>{title}</Text>
            )}
         </HStack>
         <VStack>
            {children}
         </VStack>
         {/* <Text>
         </Text> */}
      </StyledAlert>
   )
}

Alert.Description = ({ children }) => (
   <Text>{children}</Text>
)

Alert.propTypes = {
   // prop: PropTypes.string
}
Alert.defaultProps = {
   type: 'text'
}
// redux connect with component
const mapStateToProps = (state) => ({
   //
})
const mapActionsToProps = (dispatch) => {
   return {
      // action: payload => dispatch({ type: '',... })
   }
}
export default connect(mapStateToProps, mapActionsToProps)(Alert)
