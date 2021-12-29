import { fonts } from "."
import colors from "./colors"

export default {
   colors: {
      ...colors,
      primary: '#fef100'
   },
   fontConfig: {
      Inter: {
         400: {
            normal: fonts.primary,
         },
         600: {
            normal: 'Inter-Medium',
         },
         800: {
            normal: 'Inter-Bold',
         },
      }
   },
   fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'Inter',
   },
   components: {
      Toast: {
         baseStyle: {
            p: '3',
            px: '6',
            paddingHorizontal: 30,
            rounded: 'lg',
            shadow: 3,
            _title: {
               fontFamily: 'Inter-Regular',
               fontWeight: 400,
            },
            _description: {
               fontFamily: 'Inter-Regular'
            }
         },
         defaultProps: {},
         variants: {},
         sizes: {},
      }
   }
   // fontPrimary: ''
}
