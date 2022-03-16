import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";

const buttonSizes = {
   sm: '35px',
   md: '45px',
   lg: '70px',
}


export const StyledBaseButton = styled(Pressable)`
   padding: 0 20px;
   border-radius: 14px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   overflow: hidden;
   position: relative;
   background-color: white;
   color: black;
   opacity: ${props => props.disabled ? '0.5' : 1};
   ${props => {
      if (props.small || (props.size && props.size === 'sm')) {
         return css`
         height: ${buttonSizes.sm};
         `
      } else {
         return css`
         height: ${buttonSizes.md};
         `
      }
   }}
   ${({ variant = 'default', theme }) => {
      let variantStyle = ``
      switch (variant) {
         case 'primary':
            variantStyle = css`
               background-color: ${theme.colors.primary}
            `
            break;
         case 'primary-outline':
            variantStyle = css`
               background-color: transparent;
               border-color: ${theme.colors.primary}
            `
            break;
         case 'secondary':
            variantStyle = css`
               background-color: ${theme.colors.secondary ?? 'blue'}
            `
            break;
         case 'secondary-outline':
            variantStyle = css`
               background-color: transparent;
               border-color: ${theme.colors.secondary}
            `
            break;
         case 'danger':
            variantStyle = css`
               background-color: ${theme.colors.danger}
            `
            break;
         case 'danger-outline':
            variantStyle = css`
               background-color: transparent;
               border-color: ${theme.colors.danger}
            `
            break;
         case 'info':
            variantStyle = css`
               background-color: ${theme.colors.info}
            `
            break;
         case 'info-outline':
            variantStyle = css`
               background-color: transparent;
               border-color: ${theme.colors.info}
            `
            break;
         default:
            variantStyle = css`
               background-color: #eceff1;
            `
            break;
      }
      return variantStyle
   }}
`

export function getButtonLabelProps(btnProps = {}) {
   let props = {
      backgroundColor: 'transparent',
      color: 'black',
      fontSize: 17,
   }
   if (btnProps.small) {
      props.fontSize = 13
   }
   if (btnProps.loading) {
      props.opacity = 0
   }
   switch (btnProps.variant) {
      case 'primary':
         props = {
            ...props,
            color: 'black',
         }
         break;
      case 'primary-outline':
         props = {
            ...props,
            color: 'blue',
         }
         break;
      case 'info':
         props = {
            ...props,
            color: 'black',
         }
         break;
      case 'info-outline':
         props = {
            ...props,
            color: 'blue',
         }
         break;
      case 'success':
         props = {
            ...props,
            color: 'black',
         }
         break;
      case 'success-outline':
         props = {
            ...props,
            color: 'blue',
         }
         break;
      case 'warning':
         props = {
            ...props,
            color: 'black',
         }
         break;
      case 'warning-outline':
         props = {
            ...props,
            color: 'blue',
         }
         break;
      case 'danger':
         props = {
            ...props,
            color: 'black',
         }
         break;
      case 'danger-outline':
         props = {
            ...props,
            color: 'blue',
         }
         break;
      default:
         break;
   }
   return props
}
