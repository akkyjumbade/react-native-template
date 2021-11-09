import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import LibIcon from 'react-native-vector-icons/Feather'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Badge from './Badge'
import { Text } from '../..'

const Icon = (props) => {
   const { name, } = props
   return (
      <TouchableOpacity style={{ position: 'relative', }}>
         <FeatherIcon name={name} {...props} />
      </TouchableOpacity>
   )
}
export default Icon

Icon.propTypes = {
   lib: PropTypes.oneOf([
      'fa', 'feather', 'ant', 'FontAwesome5'
   ]),
   name: PropTypes.string,
   size: PropTypes.number,
   badge: PropTypes.number,
}

Icon.defaultProps = {

}
