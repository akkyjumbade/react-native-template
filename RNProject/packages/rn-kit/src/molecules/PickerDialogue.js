import { Left, ListItem } from 'native-base';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize'
import { useSelector } from 'react-redux';

import { Icon, Text } from '../..'
import { SCREEN } from '../../../../src/config';
import Container from '../atoms/Container';
import ModalInterface, { Modal_Header, Modal_Footer } from '../organisms/ModalInterface';
import ModalWindow from '../organisms/ModalWindow';
import SearchInputControl from './SearchInputControl';

const styles = StyleSheet.create({
   fielContainer: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   arrowIcon: {
      marginLeft: -50,
      zIndex: 999,
      padding: 15,
      top: -25,
      position: 'absolute'
      // backgroundColor: 'red'
   }
})

export const OptionsItem = ({ item, index, selectedIndex, onSelect, valueKey, labelKey }) => {
   if (!item) {
      return null
   }
   return (
      <ListItem  iconLeft={true} onPress={() => onSelect(item, index)} noIndent style={{ marginHorizontal: 0 }}>
         <Left>
            {index === selectedIndex ? (
               <Icon name="check-circle" size={20} lib="fa" />
            ) : (
               <Icon name="circle" size={20} lib="fa" />
            )}
            <Text style={{ marginLeft: 10, }}>{item[labelKey]}</Text>
         </Left>
      </ListItem>
   )
}

export default function PickerDialogue(props) {
   const options = props.options
   const title = props.title ? props.title : 'Choose option'
   // const options = useSelector(state => state.service.providers)
   const modalizeRef = useRef(null);
   const [selectedIndex, setSelectedIndex] = useState(null)
   const { renderField, onChange, value } = props
   const { keyExtractor, renderOption } = props
   const selectedOption = useMemo(() => {
      return options && options[selectedIndex]
   }, [selectedIndex, options])

   function openModal() {
      modalizeRef.current?.open();
   }
   function closeModal() {
      modalizeRef.current?.close();
   }

   function onSelect(item, index) {
      setSelectedIndex(index)
      if (props.valueExtractor) {
         onChange && onChange(item[props.valueExtractor])
      } else {
         onChange && onChange(item.operator_id)
      }

      if (props.onSelectClose) {
         modalizeRef.current?.close();
      }
   }

   useEffect(() => {
      if ((!props.isOpen)) {
         closeModal()
      }
   }, [ props.isOpen ])

   function onDoneClick() {
      modalizeRef.current?.close()
   }
   function onCloseClick() {
      modalizeRef.current?.close()
   }

   return (
      <View>
         <TouchableOpacity style={styles.fielContainer} onPress={openModal}>
            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
               {/* <Text>{JSON.stringify(selectedOption)}</Text> */}
               {renderField && renderField({ selectedOption, onPress: openModal })}
            </View>
         </TouchableOpacity>

         <Portal>
            <Modalize
               ref={modalizeRef}
               modalHeight={SCREEN.height - 60}
               HeaderComponent={() => (
                  <Modal_Header title={title} >
                     <View style={{ paddingLeft: 20, paddingEnd: 5, marginBottom: 15, }}>
                        <SearchInputControl focus={true} />
                     </View>
                  </Modal_Header>
               )} FooterComponent={() => (
                  <>
                  {props.showFooter && (
                     <Modal_Footer onClose={onCloseClick} onDone={onDoneClick} />
                  )}
                  </>
               )}
               {...props}
               >
               {props.children}
            </Modalize>
         </Portal>
      </View>
   )
}

PickerDialogue.defaultProps = {
   showFooter: true,
   title: 'Choose'
}
