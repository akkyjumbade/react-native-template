import { Text } from '@modules/rn-kit/atoms';
import { HStack, View, VStack } from 'native-base';
import React, { Fragment, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-maps';
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ButtonPrimary, Button } from '@modules/rn-kit/atoms'

const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      // height: 400,
      // width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   map: {
      ...StyleSheet.absoluteFillObject,
   },
   overlayStyle: {
      backgroundColor: 'transparent',
   },
   header: {
      padding: 15,
      paddingBottom: 0
   },
   body: {
      padding: 15,
   },
   footer: {
      padding: 15,
      paddingBottom: 40,
   },
});

const MapOverlayWidget = React.forwardRef((props, ref) => {
   const { currentCoordinates } = props
   useEffect(() => {

   }, [ currentCoordinates ])
   return (
      <Overlay>
         <Portal>
            <Modalize ref={ref}
               adjustToContentHeight={true}
               withHandle={false} withOverlay={false}
               HeaderComponent={() => (
                  <View style={styles.header}>
                     <Text bold>DELIVERY LOCATION</Text>
                  </View>
               )}
               FooterComponent={() => (
                  <View style={styles.footer}>
                     <HStack space={2}>
                        <View style={{ flex: 1 }}>
                           <Button title={'Cancel'} />
                        </View>
                        <View style={{ flex: 1 }}>
                           <ButtonPrimary title={'Confirm'} />
                        </View>
                     </HStack>
                  </View>
               )}

               >
               <View style={styles.body}>
                  {props.children}
                  <Text>{JSON.stringify({currentCoordinates})}</Text>
               </View>
            </Modalize>
         </Portal>
      </Overlay>
   )
})

export default MapOverlayWidget
