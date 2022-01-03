import React from 'react'
import { View } from 'react-native'
import { RadioGroup } from './RadioControl'

const GenderChoiceControl = ({ value, options, onChange }) => {
   return (
      <View style={{ marginTop: 6, }}>
         <RadioGroup
            name={'fuel_type'}
            value={value}
            options={options}
            onChange={onChange}
         />
      </View>
   )
}

GenderChoiceControl.defaultProps = {
   options: [
      {
         label: 'Female',
         value: 'female',
      },
      {
         label: 'Male',
         value: 'male',
      },
   ]
}
export default GenderChoiceControl
