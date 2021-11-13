import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import styled, {css} from 'styled-components/native'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native-safe-area-context'

const StyledPage = styled(SafeAreaView)`
   flex: 1;
   height: 100%;

   background-color: ${props => {
   if (props.bg) {
      return props.bg
   }
   return props.theme.colors.light
}};
   ${props => {
   if(props.centerMode) {
      return css`
            justify-content: center;
            flex-direction: column;
            background-color: white;
         `
   }
}}

`
export default function Page({ fullScreen = false, scroll = false, children, ...props }) {
   return (
      <StyledPage {...props}>
         {scroll ? (
            <ScrollView>
               {children}
            </ScrollView>
         ) : (
            <Fragment>
               {children}
            </Fragment>
         )}
      </StyledPage>
   )
}


Page.propTypes = {
   scroll: PropTypes.bool,
   fullScreen: PropTypes.bool,
   hideStatusbar: PropTypes.bool,
   bg: PropTypes.string,
   centerMode: PropTypes.bool
}
Page.defaultProps = {
   scroll: false,
   fullScreen: false,
   hideStatusbar: false,
   centerMode: false,
}
