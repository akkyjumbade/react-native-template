import {  View } from 'native-base'
import React from 'react'
import { Image,ScrollView,StyleSheet } from 'react-native'
import { SCREEN } from '@/config'
import CoreCarousel from 'react-native-snap-carousel';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'


const styles = StyleSheet.create({
   wrapper: {
      // flex: 1,
      flexDirection: 'row',
      overflow: 'visible',
      marginBottom: 15,
   },
   img: {
      width: SCREEN.width,
      height: 250,
   }
})

const Carousel_Item = props => {
   return (
      <View>
         <View>
            {props.render && props.render()}
         </View>
      </View>
   )
}


export default function Carousel({ slides, renderItem, gap = 0, itemStyle = {}, ...rest }) {
   const sliderWidth = SCREEN.width
   const itemWidth = (SCREEN.width - 30)

   return (
      <View>
         <CoreCarousel {...rest} data={slides}
            renderItem={renderItem}
            itemWidth={itemWidth}
            layoutCardOffset={`0`}
            layout={'default'}
            inactiveSlideScale={1}
            ItemSeparatorComponent={() => (
               <View style={{ width: gap, }} />
            )}
            sliderWidth={sliderWidth} />
      </View>
   )
}
