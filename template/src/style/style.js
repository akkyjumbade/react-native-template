import { StyleSheet } from "react-native"
import { fonts } from "."
import {default as allColors} from './colors'

const COLOR_PRIMARY = '#F2D0E0'
const COLOR_SECONDARY = '#585859'
const COLOR_SUCCESS = '#E9F2A7'
const COLOR_DARK = '#222'
const COLOR_INFO = '#B6E1F2'
const COLOR_DANGER = 'crimson'
const COLOR_WARNING = '#F2D3AC'
const COLOR_DEFAULT = '#585859'

export const colors = allColors

const font_serif = 'Futura Book'
const font_sans_serif = 'Futura Book'
// const font_serif = 'ProximaNova-Bold'
// const font_sans_serif = 'GothamRounded-Bold'

export default {
   colors,
   font_serif,
   font_primary: font_serif,
   font_sans_serif
}


const hStyles = {
   fontFamily: font_serif,
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
      fontFamily: font_serif,
      fontSize: 16,
      margin: 0,
   },
   small: {
      fontFamily: font_serif,
      fontSize: 13,
      margin: 0,
   },
   em: {
      fontFamily: font_serif,
   },
   b: {
      fontFamily: font_serif,
   },
   strong: {
      fontFamily: font_sans_serif,
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
