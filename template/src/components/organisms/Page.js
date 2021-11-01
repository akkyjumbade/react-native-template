import React, { Fragment } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

const StyledPage = styled.View`
   flex: 1;
   background-color: white;
`
export default function Page(props) {
   const { scroll = false, } = props
   return (
      <StyledPage {...props}>
         <SafeAreaView>
            {scroll ? (
               <ScrollView>
                  {props.children}
               </ScrollView>
            ) : (
               <Fragment>
                  {props.children}
               </Fragment>
            )}
         </SafeAreaView>
      </StyledPage>
   )
}


Page.propTypes = {
   scroll: PropTypes.bool,
}
