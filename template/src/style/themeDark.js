import { StyleSheet } from "react-native"
import { fonts } from "."

const COLOR_PRIMARY = '#F2D0E0'
const COLOR_SECONDARY = '#E9F2A7'
const COLOR_SUCCESS = '#2ecc71'
const COLOR_DARK = '#222'
const COLOR_INFO = 'skyblue'
const COLOR_DANGER = 'crimson'
const COLOR_WARNING = 'orange'
const COLOR_DEFAULT = '#E9F2A7'

export const colors = {
   textColor: '#fff',
   gray: 'gray',
   black: 'black',
   dark: COLOR_DARK,
   label: '#f1f1f1',
   primary: COLOR_PRIMARY,
   secondary: COLOR_SECONDARY,
   success: COLOR_SUCCESS,
   warning: COLOR_WARNING,
   danger: COLOR_DANGER,
   light: '#333',
   white: 'white',
   default: COLOR_DEFAULT,
   info: COLOR_INFO,
}
const font_serif = 'Futura Book'
const font_sans_serif = 'Futura Book'
// const font_serif = 'ProximaNova-Bold'
// const font_sans_serif = 'GothamRounded-Bold'

export default {
   colors,
   font_serif,
   font_sans_serif,
   // fonts,
   font_primary: font_serif,
}


const hStyles = {
   // fontFamily: fonts.heading,
   fontSize: 16,
   margin: 0,
}
export const htmlStyles = StyleSheet.create({
   h1: {
      ...hStyles,
   },
   h2: {
      ...hStyles,
   },
   h3: {
      ...hStyles,
   },
   h4: {
      ...hStyles,
   },
   p: {
      ...hStyles,
   },
   article: {
      // fontFamily: fonts.heading,
      fontSize: 16,
      margin: 0,
   },
   small: {
      // fontFamily: fonts.heading,
      fontSize: 13,
      margin: 0,
   },
   em: {
      // fontFamily: fonts.heading,
   },
   b: {
      // fontFamily: fonts.heading,
   },
   strong: {
      // fontFamily: fonts.heading,
   },
   del: {
      color: 'gray'
   },
   ins: {
      color: 'green'
   },
   body: {
      padding: 0,
      margin: 0,
   },
})
