import React from 'react'
import { StyleSheet } from 'react-native'
import { Modalize } from 'react-native-modalize'

const ModalWindow = props => {
   // const
   return (
      <Modalize modalStyle={styles.modalStyle} {...props}>{props.children}</Modalize>
   )
}

const styles = StyleSheet.create({
   modalStyle: {
      margin: 15,
   }
})

ModalWindow.propTypes = {
   ...Modalize.propTypes
}

export default ModalWindow
