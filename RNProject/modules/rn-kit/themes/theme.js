import React from 'react'
import CheckIcon from "@/icons/CheckIcon"
import themes, { fonts } from "."
import colors from "./colors"

export default {
   colors: {
      ...colors,
      primary: '#47ffc4'
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
               fontFamily: 'CircularStd-Book',
               fontWeight: 400,
            },
            _description: {
               fontFamily: 'CircularStd-Book'
            }
         },
         defaultProps: {},
         variants: {},
         sizes: {},
      },
      Select: {
         baseStyle: {
            borderRadius: 13,
            // overflow: 'hidden',
            fontSize: 13,
            customDropdownIconProps: {
              size: 6,
              mr: 2,
            },
            _actionSheetContent: {
               borderRadius: 20,
            },
         },
         defaultProps: {
            variant: 'unstyled',
            optimized: true,
            placeholder: 'Choose option',
            _selectedItem: {
               bg: "teal.600",
               endIcon: <CheckIcon size={5} />
            }
            // borderRadius: 10,
         },
      },
      SelectItem: {
         baseStyle: {
            p: 1,
            px: 2,
            borderRadius: 20,
            minH: 0,
         },
         defaultProps: {
            style: {
               defaultProps: 20,
            }
         }
      }
   }
   // fontPrimary: ''
}
