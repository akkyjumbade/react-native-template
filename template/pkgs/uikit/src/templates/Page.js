import React, { useEffect } from 'react'
import { useColorScheme, ScrollView, StatusBar, View, StyleSheet, Platform, SafeAreaView, } from 'react-native';
import PropTypes from 'prop-types'
import ErrorBoundary from '../../../../src/components/ErrorBoundary';
import { colors } from '../../../../src/style/style';
import styled from 'styled-components/native';
import { Spinner } from '../atoms/Loading';
import { SafeAreaView as IosSafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import GlobalStyles from '../../../../src/GlobalStyles';

const SafeArea = Platform.select({
   ios: IosSafeAreaView,
   android: SafeAreaView
})

const StyledPage = styled(SafeArea)`
   background-color: ${({ theme, themeColor }) => themeColor ? themeColor : theme.colors.light};
   flex: 1;
`

export default function Page({ title, background, showStatusbar = true, Header, children, style, scroll = true, align = 'flex-start', loading, ...rest }) {
   let contentStyle = {
      minHeight: '100%',
   }
   if (align === 'center') {
      contentStyle = {
         ...styles.contentContainer,
      }
   }

   if (background) {

   }
   if (loading) {
      return (
         <StyledPage style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: '#f1f1f1', borderRadius: 15, padding: 20, }}>
               <Spinner />
            </View>
         </StyledPage>
      )
   }

   return (
   <ErrorBoundary>
      <StyledPage edges={['right', 'bottom', 'left']} style={GlobalStyles.droidSafeArea} {...rest}>
         <StatusBar barStyle="dark-content" translucent={true} hidden={!showStatusbar}  backgroundColor={colors.primary} />
         {scroll ? (
            <ScrollView contentContainerStyle={contentStyle}>
               {Header && Header({ title })}
               <View style={[styles.container, style]}>
                  {children}
               </View>
            </ScrollView>
         ) : (
         <View style={styles.coverStyle}>
            {Header && Header({ title })}
            <View style={[styles.container, style, ]}>
               {children}
            </View>
         </View>
         )}
      </StyledPage>
   </ErrorBoundary>
   )
}

export const PageCover = props => {
   return (
      <StyledPage {...props}>
         {props.children}
      </StyledPage>
   )
}


Page.propTypes = {
   align: PropTypes.string,
}
const styles = StyleSheet.create({
   container: {
   },
   contentContainer: {
      height: '100%',
      // flex: 1,
      // flexDirection: 'column',
      // justifyContent:  'center',
      alignItems: 'center'
   },
   coverStyle: {
      flex: 1,
      marginBottom: 30,
   }
})
