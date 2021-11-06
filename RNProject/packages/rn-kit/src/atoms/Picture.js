import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'

const StyledPicture = styled.Image`

`

export default function Picture(props) {
   return (
      <StyledPicture {...props} />
   )
}

export const Avatar = ({ source }) => {
   return (
      <View>
         <Image source={source} />
      </View>
   )
}
