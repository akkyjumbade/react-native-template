import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native-safe-area-context'

const StyledPage = styled(SafeAreaView)`
   flex: 1;
   background-color: ${props => props.theme.colors.light} ;
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
}
Page.defaultProps = {
   scroll: false,
   fullScreen: false,
   hideStatusbar: false,
}
