import LottieView from 'lottie-react-native'
import React, { Fragment, useEffect } from 'react'
import Text from '../atoms/Text'
const animationFile = require('../themes/dark_mode_toggle_animation.json')

const SwitchControl = ({ value, onChange }) => {
   useEffect(() => {

   }, [])
   return (
      <Fragment>
         <Text>{value}</Text>
         <LottieView source={animationFile} />
      </Fragment>
   )
}

export default SwitchControl
