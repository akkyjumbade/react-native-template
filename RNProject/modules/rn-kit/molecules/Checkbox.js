import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { Text, } from '../atoms'
// import Label from '../atoms/'
const StyledCheckbox = styled(View)`
   margin-left: -15px;
   margin-right: 20px;
`

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
   }
})
export default function Checkbox(props) {
   const [ checked, setChecked, ] = useState(false)
   function onToggle() {
      setChecked(prev => !prev)
      props.onChange && props.onChange(checked)
   }
   // useEffect(() => {
   //    props.onChange && props.onChange(checked)
   // }, [checked, props])

   return (
      <TouchableOpacity onPress={onToggle} style={styles.container}>
         <StyledCheckbox {...props}  />
         {props.label && (
            <Text >
               {props.label}
            </Text>
         )}
      </TouchableOpacity>
   )
}

Checkbox.propTypes = {
   label: PropTypes.string,
}
