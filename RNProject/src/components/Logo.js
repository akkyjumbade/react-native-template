import React from 'react'
import {Image, StyleSheet, View} from "react-native";

const Logo = ({ path }) => {
   return (
      <View>
         <Image source={require('../../assets/logo/logo@1080x1080.png')} style={styles.logo} />
      </View>
   )
}

const styles = StyleSheet.create({
   logo: {
      width: 94,
      height: 94,
      marginVertical: 15,
      alignSelf: 'center'
   }
})

Logo.defaultProps = {
   path: '../../assets/logo/logo@1080x1080.png'
}
export default Logo
