import styled, { css } from "styled-components/native";

const buttonSizes = {
   sm: '35px',
   md: '45px',
   lg: '70px',
}


export const StyledBaseButton = styled.TouchableOpacity`
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
`
