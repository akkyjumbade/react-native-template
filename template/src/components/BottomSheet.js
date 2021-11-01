import { Button } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeablePanel } from 'rn-swipeable-panel';
import { SCREEN } from '../config';

const PanelContent = props => {
   return (
      <View style={{ height: 100, zIndex: 2 }}>
         <Text>sdkfjsdfsfhdkj</Text>
         <Text>sdkfjsdfsfhdkj</Text>
         <Text>sdkfjsdfsfhdkj</Text>
         <Text>sdkfjsdfsfhdkj</Text>
         <Text>sdkfjsdfsfhdkj</Text>
      </View>
   )
}
const styles = {
   container: {
      flex: 1,
      width: SCREEN.width,
      height: SCREEN.height,
   },
   welcome: {},
   instructions: {},
}
export default function BottomSheet() {
   const [panelProps, setPanelProps] = useState({
      fullWidth: false,
      openLarge: true,
      showCloseButton: true,
      onClose: () => closePanel(),
      onPressCloseButton: () => closePanel(),
      // ...or any prop you want
   });
   const [isPanelActive, setIsPanelActive] = useState(false);

   const openPanel = () => {
      setIsPanelActive(true);
   };

   const closePanel = () => {
      setIsPanelActive(false);
   };

   function togglePanel() {
      alert(JSON.stringify({ isPanelActive }))
      setIsPanelActive(prev => !prev)
   }

   return (
      <SafeAreaView style={{ height: SCREEN.height }} >
         <Button onPress={() => togglePanel()}>
            <Text >Welcome to React Native!</Text>
         </Button>
         <Text>{JSON.stringify({ panelProps, isPanelActive })}</Text>
         <SwipeablePanel {...panelProps} isActive={isPanelActive}>
            <PanelContent />
         </SwipeablePanel>
      </SafeAreaView>
   );
};
