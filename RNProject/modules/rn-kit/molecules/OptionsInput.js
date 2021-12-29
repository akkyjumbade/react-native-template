import { Left, ListItem } from 'native-base';
import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize'
import PropTypes from 'prop-types'

import { Icon, Text } from '../..'
import { Modal_Header, Modal_Footer } from '../organisms/ModalInterface';

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
   },
   field: {
      // backgroundColor: '#f4f4f4',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderRadius: 1000,
      // borderWidth: 1,
      // borderColor: '#cecece',
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

export default function OptionsInput(props) {
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
      // alert('Opening model')
      modalizeRef.current?.open();
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

   function onDoneClick() {
      modalizeRef.current?.close()
   }
   function onCloseClick() {
      modalizeRef.current?.close()
   }

   return (
      <View>
         <TouchableOpacity style={styles.fielContainer} onPress={openModal}>
            <View style={styles.field}>
               {/* <Text>{JSON.stringify(selectedOption)}</Text> */}
               {renderField && renderField({ selectedOption, })}
            </View>
            {/* <Icon size={20} lib="fa" name={props.rightIcon} style={styles.arrowIcon} /> */}
         </TouchableOpacity>

         <Portal>
            <Modalize ref={modalizeRef} adjustToContentHeight HeaderComponent={() => (
               <Modal_Header title={title} />
            )} flatListProps={{
               data: options,
               keyExtractor: keyExtractor,
               renderItem: (args_) => renderOption(args_, onSelect, selectedIndex)
            }}
             />
         </Portal>
      </View>
   )
}


OptionsInput.propTypes = {
   options: PropTypes.arrayOf(PropTypes.object).isRequired,
   renderField: PropTypes.func.isRequired,
   renderOption: PropTypes.func.isRequired,
   keyExtractor: PropTypes.func.isRequired,
   onChange: PropTypes.func,
   rightIcon: PropTypes.string,
}

OptionsInput.defaultProps = {
   rightIcon: 'chevron-down'
}
