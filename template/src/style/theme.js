import { StyleSheet } from "react-native"

const COLOR_PRIMARY = '#F2D0E0'
const COLOR_SECONDARY = '#585859'
const COLOR_SUCCESS = '#E9F2A7'
const COLOR_DARK = '#222'
const COLOR_INFO = '#B6E1F2'
const COLOR_DANGER = 'crimson'
const COLOR_WARNING = '#F2D3AC'
const COLOR_DEFAULT = '#585859'

export const colors = {
   textColor: 'darkslategray',
   gray: 'gray',
   black: 'black',
   dark: COLOR_DARK,
   label: '#f1f1f1',
   primary: COLOR_PRIMARY,
   secondary: COLOR_SECONDARY,
   success: COLOR_SUCCESS,
   warning: COLOR_WARNING,
   danger: COLOR_DANGER,
   light: '#fff',
   white: 'white',
   default: COLOR_DEFAULT,
   info: COLOR_INFO,
}
const font_serif = 'CircularStd-Book'
const font_sans_serif = 'CircularStd-Bold'
// const font_serif = 'ProximaNova-Bold'
// const font_sans_serif = 'GothamRounded-Bold'

export default {
   colors,
   font_serif,
   font_sans_serif,
   font_primary: font_serif,
   font_primary_bol: font_sans_serif,
   // fonts: fonts,
}


const hStyles = {
   // fontFamily: fonts.primary,
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
      // fontFamily: font_serif,
      fontSize: 16,
      margin: 0,
   },
   small: {
      // fontFamily: font_serif,
      fontSize: 13,
      margin: 0,
   },
   em: {
      // fontFamily: font_serif,
   },
   b: {
      // fontFamily: font_serif,
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
