import React, { Fragment } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

const StyledPage = styled.View`
   flex: 1;
   background-color: ${props => props.theme.colors.primary} ;
`
export default function Page({ fullScreen = false, scroll = false, children, ...props }) {
   return (
      <StyledPage {...props}>
         <SafeAreaView>
            {scroll ? (
               <ScrollView>
                  {children}
               </ScrollView>
            ) : (
               <Fragment>
                  {children}
               </Fragment>
            )}
         </SafeAreaView>
      </StyledPage>
   )
}


Page.propTypes = {
   scroll: PropTypes.bool,
   fullScreen: PropTypes.bool,
}
