import { Radio } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Text from '@modules/rn-kit/atoms/Text'
import styled from 'styled-components/native'
import { forwardRef } from 'react'

const StyledRadio = styled(Radio)`
   border-color: gray;
   border: 2px solid black;
   border-radius: 100px;
   padding: 0;
   margin: 0;
   align-items: flex-start;
   flex-direction: column;
   width: 23px;
   height: 23px;
`
const styles = StyleSheet.create({
   field_list: {
      flexDirection: 'column',
      alignItems: 'flex-start',
   },
   field_inline: {
      flexDirection: 'row',
      alignItems: 'flex-start',
   },
})

const RadioControl = (props) => {
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
   const { options, value, onChange, name } = props
   let style = styles.field_list
   if (!options) {
      return null
   }
   return (
      <View style={style}>
         <Radio.Group
            name={name}
            accessibilityLabel={name}
            value={value}
            onChange={(nextValue) => {
               onChange && onChange(nextValue)
            }}
         >
            {options.map((opt, optindex) => (
               <Radio key={'radio__' + opt.value} colorScheme={opt.value === value ? 'yellow' : ''} value={opt.value} my={0.5} >
                  {opt.label}
               </Radio>
            ))}
         </Radio.Group>
      </View>
   )
}

RadioControl.propTypes = {
   ...Radio.propTypes,
   label: PropTypes.string,
   name: PropTypes.string,
}


export default forwardRef((props, ref) => (
   <RadioControl {...props} ref={ref} />
))
