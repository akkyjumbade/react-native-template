import { Radio } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text } from '../..'
import styled from 'styled-components/native'

const StyledRadio = styled(Radio)`
   border-color: gray;
   border: 2px solid black;
   border-radius: 100px;
   padding: 0;
   margin: 0;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   width: 23px;
   height: 23px;
`
const styles = StyleSheet.create({
   field_list: {
      flexDirection: 'column',
      alignItems: 'center',
   },
   field_inline: {
      flexDirection: 'row',
      alignItems: 'center',
   },
})

export default function RadioControl(props) {
   const { label, } = props

   return (
      <View style={styles.field_inline}>
         <StyledRadio {...props} />
         {label && (
         <View style={{ marginLeft: 4, }}>
            <Text>{label}</Text>
         </View>
         )}
      </View>
   )
}

export const RadioGroup = props => {
   const options = props.options
   const { inline = false, value } = props
   let style = styles.field_list
   if (inline) {
      style = styles.field_inline
   }
   if (!options) {
      return null
   }
   function onChange(ev) {
      if (props.onChange) {
         props.onChange(ev)

      }
   }
   return (
      <View style={style}>
         {options.map((opt, optindex) => (
            <View style={{ marginRight: 4, }} key={optindex + opt.value}>
               <RadioControl selected={value === opt.value} {...opt} onPress={() => onChange(opt)} />
            </View>
         ))}
      </View>
   )
}

RadioControl.propTypes = {
   ...Radio.propTypes,
   label: PropTypes.string,
}
