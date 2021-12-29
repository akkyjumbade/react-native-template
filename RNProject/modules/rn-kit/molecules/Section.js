import React from 'react'
import { useColorScheme, View, StyleSheet, } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Text } from '../..';

const Section = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   let styleContainer = {
      // color: isDarkMode ? Colors.white : Colors.black,
   }
   return (
      <View style={styles.sectionContainer}>
         <Text weight="bold" style={[ styles.sectionTitle, styleContainer]}>
            {title}
         </Text>
         <View>
            {children}
         </View>
      </View>
   );
};


const styles = StyleSheet.create({
   sectionContainer: {
      marginTop: 20,
      paddingHorizontal: 15,
   },
   sectionTitle: {
      fontSize: 24,
      // fontWeight: '600',
   },
   sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      // fontWeight: '400',
   },
   highlight: {
      // fontWeight: '700',
   },
});

export default Section
