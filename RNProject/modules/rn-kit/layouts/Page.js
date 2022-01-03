import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import styled, {css} from 'styled-components/native'
import PropTypes from 'prop-types'
import LoadingSpinner from "@modules/rn-kit/atoms/Loading";
import { View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Container, } from '..';
import Text from '@modules/rn-kit/atoms/Text'
import Container from '@modules/rn-kit/layouts/Container'



const StyledPage = styled.SafeAreaView`
   flex: 1;
   flex-direction: column;
   height: 100%;
   background-color: ${props => {
      if (props.bg) {
         return props.bg
      }
      return props.theme.colors.pageBg
   }};
   ${props => {
      if (props.centerMode) {
         return css`
            justify-content: center;
            flex-direction: column;
            `
      }
   }}

`

const Title = ({children}) => {
   return (
      <View style={{ marginTop: 10, marginBottom: 20 }}>
         <Text bold style={{ letterSpacing: -1 }} fontSize={'3xl'} >{children}</Text>
      </View>
   )
}

export default function Page({ loading = false, fullScreen = false, scroll = false, children, ...props }) {
   if (props.error) {
      <StyledPage {...props} centerMode={true} fullScreen={false} scroll={false}>
         <Fragment>
            {children}
         </Fragment>
      </StyledPage>

   }
   return (
      <StyledPage style={{ flex: 1,  }} edges={['right', 'bottom', 'left', 'top']} mode="margin" {...props}>
         {/* {loading && <LoadingSpinner overlay={true} />} */}
         {scroll ? (
            <ScrollView >
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


Page.Container = Container
Page.Title = Title

Page.propTypes = {
   scroll: PropTypes.bool,
   fullScreen: PropTypes.bool,
   hideStatusbar: PropTypes.bool,
   bg: PropTypes.string,
   centerMode: PropTypes.bool,
   loading: PropTypes.bool
}
Page.defaultProps = {
   scroll: false,
   fullScreen: false,
   hideStatusbar: false,
   centerMode: false,
   loading: false,
   // bg: 'lightgray'
}
