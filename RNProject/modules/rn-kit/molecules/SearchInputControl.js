import React from 'react'
import { View } from 'react-native'
import TextInput from './TextInput'

const SearchInputControl = (props) => {
   //
   return (
      <View>
         <View>
            <TextInput
               // prepend={() => (
               //    <Icon name="search" color={'#000'} size={24} style={{ marginTop: 3, left: 3, }} />
               // )}
               {...props}
               // append={() => (
               //    <Icon name="x" color={'#666'} size={24} style={{ marginTop: -2, marginLeft: -6 }} />
               // )}
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
