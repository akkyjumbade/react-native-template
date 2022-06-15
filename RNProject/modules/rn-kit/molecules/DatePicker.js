import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput as BaseTextInput } from 'react-native';
import { default as BaseDatePicker } from 'react-native-modern-datepicker';
import colors from '../themes/colors';
import ButtonOutline from '../atoms/ButtonOutline';
import { Text, } from '../atoms';
// import { Text } from '..';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { View } from 'native-base';
import { fonts } from '../themes';


const StyledDatePicker = styled(TouchableOpacity)`
   border-color: ${props => props.theme.colors.secondary};
   border-style: solid;
   padding: 0 0;
   font-size: 16px;
`


export default function DatePicker({ ...props }) {
   const [ isOpened, setIsOpened ] = useState(false)
   // const [ isOpened, setIsOpened ] = useState(false)
   const modalRef = useRef(null)
   const toggle = useCallback(() => {
      modalRef.current?.open()
   }, [ modalRef ])
   const handleOnChange = useCallback((val) => {
      // console.info({ val })
      props.onChange && props.onChange(val)
      setTimeout(() => {
         modalRef.current?.close()
      }, 100);
   }, [ ])
   // const value = useMemo(())

   return (
      <Fragment>
         <StyledDatePicker onPress={toggle}>
            <Text style={{ fontWeight: 'bold' }} >{props.value ?? 'Choose date'}</Text>
            {/* <Text>{JSON.stringify({ isOpened })}</Text> */}
         </StyledDatePicker>
         {/* <ButtonOutline title={'Choose date'} /> */}
         {1 && (
            <Portal >
               <Modalize ref={modalRef} adjustToContentHeight modalStyle={{ zIndex: 999999, backgroundColor:'red' }} >
                  <BaseDatePicker {...props}
                     options={{
                        defaultFont: fonts.primary,
                        headerFont: fonts.primary,
                        mainColor: colors.dark,
                        // selectedTextColor: 'white'
                     }}
                     mode="calendar"
                     maximumDate={(new Date()).toDateString()}
                     onDateChange={handleOnChange}
                     // onSelectedChange={props.onChange}
                     />
                  {/* <Text>sdfsdfssdf sf</Text> */}
               </Modalize>
            </Portal>
         )}
         {/* <StyledDatePicker {...props} /> */}
      </Fragment>
   )
}

DatePicker.propTypes = {
   ...BaseTextInput.propTypes
}

DatePicker.defaultProps = {
   min: 0,
   max: 9999999999999,
}
