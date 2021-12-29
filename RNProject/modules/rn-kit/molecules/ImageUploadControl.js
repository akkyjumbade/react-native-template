import React from 'react'
import {Image, View, StyleSheet} from "react-native";
import {Text} from "../../index";
import ErrorBoundary from "../../../../src/components/ErrorBoundary";
import {TouchableOpacity} from "react-native-gesture-handler";

const placeholderImage = {
   uri: 'https://unsplash.it/400x400'
}
const styles = StyleSheet.create({
   img: {
      width: 60,
      height: 60,
      backgroundColor: '#ccc',
      borderRadius: 100,
   },
})
const ImageUploadControl = ({ label, value, onChange, }) => {
   return (
      <ErrorBoundary>
         <View>
            <TouchableOpacity>
               <Image source={placeholderImage} style={styles.img} />
            </TouchableOpacity>
            <View>
               <Text>Image upload</Text>
            </View>
         </View>
      </ErrorBoundary>
   )
}

export default ImageUploadControl
