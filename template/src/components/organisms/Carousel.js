import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native';
import styled from "styled-components/native";
import { Text, } from 'uikit';
import { SCREEN } from '../../config';

const StyledCarousel = styled.View`
   font-size: 16px;
   color: ${({ theme }) => theme.colors.textColor};
   flex: 1;
   justify-content: center;
   align-items: center;
`

const styles = StyleSheet.create({
   container: {
     flex: 0.5,
     justifyContent: 'center',
     alignItems: 'center',
   },
   contentContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     alignSelf:'stretch'
   //   backgroundColor: 'white',
   //   borderRadius: 16,
   //   marginBottom: 10,
   //   overflow:'hidden'
   //   borderRadius: 10,
   },
});
export default function Carousel(props) {
   const defaultCarouselHeight = SCREEN.height / 5
   const { height = defaultCarouselHeight, dots = false, slides, render, padding = 0 } = props
   // const { items } = props
   // if (!items) {
   //    return (
   //       <View style={{ width: 300, height: 150, backgroundColor: 'white' }}>

   //       </View>
   //    )
   // }
   if (!slides) {
      return (
         <View>
            <Text>No slides available</Text>
         </View>
      )
   }
   return (
      <StyledCarousel>
         {/*  */}
      </StyledCarousel>
   )
}
