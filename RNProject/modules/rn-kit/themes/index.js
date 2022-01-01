import { StyleSheet } from "react-native"
import colors from "./colors"

export const fonts = {
   primary: 'Inter-Medium',
   heading: 'Inter-Bold',
   bold: 'Inter-Bold',
   title: 'Inter-Black',
}

const htmlStyle = StyleSheet.create({
   a: {
      color: colors.primary,
   }
})

export default {
   default: 'default',
   htmlStyle,
}
