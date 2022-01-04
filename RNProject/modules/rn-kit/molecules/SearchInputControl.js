import icons from '@/icons'
import React from 'react'
import { View } from 'react-native'
import TextInput from './TextInput'

const SearchInputControl = (props) => {
   //
   return (
      <View>
         <View>
            <TextInput
               prepend={() => (
                  <View>
                     <icons.search />
                  </View>
               )}
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
