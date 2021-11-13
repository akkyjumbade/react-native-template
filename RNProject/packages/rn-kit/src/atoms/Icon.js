import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import FeatherIcon from 'react-native-vector-icons/Feather'

const Icon = ({ name, lib, size, badge, ...props }) => {
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
