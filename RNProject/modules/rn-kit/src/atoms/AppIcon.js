import React from 'react'
import styled from 'styled-components/native'

const StyledAppIcon = styled.Image.attrs(attrs => ({
   size: 150
}))`
   width: ${props => props.size}px;
   height: ${props => props.size}px;
   margin-bottom: 15px;
   border-radius: 12px;
   align-self: center;
`


export default function AppIcon(props) {
   const iconPath = require('../../../../assets/icon.png')
   return (
      <StyledAppIcon {...props} source={iconPath} />
   )
}
