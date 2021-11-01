import { Left, ListItem, Right } from 'native-base'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import styled from 'styled-components/native'
import { Icon, Text } from '../..'
import { Modal_Header } from './ModalInterface'

const StyledOptionsPicker = styled.View``
const styles = StyleSheet.create({
   option: {
      paddingHorizontal: 15,
   }
})
const RenderOption = memo(({ selected, item, index, onPress }) => {
   return (
      <ListItem noIndent style={styles.option} onPress={_ => onPress && onPress(item, index)}>
         <Left>
            <Text>{item.label}</Text>
         </Left>
         <Right>
            <View style={{ marginLeft: -30 }}>
               {selected?.value === item.value ? (
                  <Icon name="check-circle" size={20} />
               ) : (
                  <Icon name="circle" size={20} />
               )}

            </View>
         </Right>
      </ListItem>
   )
})
const OptionsPicker = ({ onChange, value, label, name, renderField, options, flatListProps }) => {
   const pickerModal = useRef()
   const [ selected, setSelected ] = useState({})
   function openModal() {
      pickerModal.current?.open()
   }
   function onPress() {
      openModal()
   }
   useEffect(() => {
      if (onChange) {
         onChange(selected)
         pickerModal.current?.close()
      }
   }, [selected, onChange])

   function onSelect(ev) {
      setSelected(ev)
   }

   return (
      <Fragment>
         {renderField && renderField({ onPress, value, label })}
         <Portal>
            <Modalize adjustToContentHeight ref={pickerModal} HeaderComponent={() => (
               <Modal_Header title={'Choose option'} />

            )}
               flatListProps={{
                  data: options,
                  keyExtractor: row => row.value,
                  renderItem: (_row) => (
                     <RenderOption onPress={onSelect} {..._row} selected={selected} />
                  ),
                  ...flatListProps
               }}
            />
         </Portal>
      </Fragment>
   )
}

export default OptionsPicker
