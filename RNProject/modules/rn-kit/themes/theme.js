import themes, { fonts } from "."
import colors from "./colors"

export default {
   colors: {
      ...colors,
      primary: '#1C6DD0'
   },
   htmlStyle: themes.htmlStyle,
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
            },
         },
         defaultProps: {},
         variants: {},
         sizes: {},

      },
      Select: {
         baseStyle: {
            borderRadius: 10,
            _actionSheetContent: {
               borderRadius: 10,
               borderWidth: 0,
            },
            borderWidth: 0,
         },
         defaultProps: {},
         variants: {},
         sizes: {},
      },
      SelectItem: {
         baseStyle: {
            borderRadius: 'lg'
         }
      }
   }
   // fontPrimary: ''
}
