import React from 'react'
import { View } from 'react-native'
import TextInput from './TextInput'

const SearchInputControl = (props) => {
   //
   return (
      <View>
         <View>
            <TextInput
               {...props}
               placeholder={props.placeholder} />
         </View>
      </View>
   )
}

SearchInputControl.propTypes = {
   // prop: PropTypes.string
}

SearchInputControl.defaultProps = {
   type: 'search',
   placeholder: 'Search',
}

export default SearchInputControl
