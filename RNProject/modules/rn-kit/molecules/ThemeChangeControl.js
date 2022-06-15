import { setThemeAction } from '@/store/options/options.actions'
import AnimatedLottieView from 'lottie-react-native'
import { View } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
const animationFile = require('../themes/dark_mode_toggle_animation.json')

const styles = StyleSheet.create({
   toggle: {
      width: 24,
      height: 24,
      marginRight: 10,
      transform: [{ scale: 1.8 }]
   },
})

const ThemeChangeControl = ({ }) => {
   const toggleRef = useRef()
   const theme = useSelector(state => state.options.appearance_theme)
   const dispatch = useDispatch()
   function toggleTheme() {
      dispatch(setThemeAction(theme === 'light' ? 'dark' : 'light'))

   }
   useEffect(() => {
      if (theme === 'dark')
      {
         toggleRef.current?.play()
      } else {
         toggleRef.current?.reset()
      }
   }, [ theme ])

   return (
      <TouchableOpacity onPress={toggleTheme}>
         <AnimatedLottieView autoPlay={false}  loop={false} style={styles.toggle} ref={toggleRef} source={animationFile} />
      </TouchableOpacity>
   )
}


export default ThemeChangeControl
