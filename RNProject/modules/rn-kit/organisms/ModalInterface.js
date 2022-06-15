import { useFocusEffect, useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import Button from '../atoms/Button'
import { Text, } from '../atoms'

const StyledModalInterface = styled.View`
   padding: 15px;
   z-index: 999;
   flex: 1;
   position: relative;
`

const styles = StyleSheet.create({
   header: {
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
   },
   footer: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      paddingBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // position: 'absolute',
      // backgroundColor: 'red',
      // bottom: 0,
      // left: 0,
   },
})

export const Modal_Header = ({ title, children, ...rest }) => {
   return (
      <Fragment>
         <View style={styles.header} {...rest}>
            <View style={{ paddingHorizontal: 15, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
               <Text weight="bold" bold={true} size={24}>{title}</Text>
            </View>
         </View>
         {children}
      </Fragment>
   )
}
export const Modal_Footer = props => {
   function onClose() {
      props.onClose && props.onClose()
   }
   function onDone() {
      if (props.onDone) {
         props.onDone()
      } else {
         props.onClose()
      }
   }
   return (
      <Fragment>
         <View style={styles.footer}>
            <View>
               <Button onPress={onClose} title={'Cancel'} intent={Button.INTENT_DEFAULT}  />
            </View>
            <View>
               <Button onPress={onDone} title={'Done'} intent={Button.INTENT_PRIMARY}  />
            </View>
         </View>
      </Fragment>
   )
}

export default function ModalInterface({ title, children, onClose }) {
   // const nav = useNavigation()
   useEffect(() => {
      // nav.canGoBack(true)
   })
   return (
      <StyledModalInterface>
         {title && (
            <Modal_Header title={title} />
         )}
         <ScrollView style={{ flex: 1, paddingVertical: 15, backgroundColor: 'white' }}>
            {children}
         </ScrollView>
         <Modal_Footer onClose={onClose} />
      </StyledModalInterface>
   )
}
