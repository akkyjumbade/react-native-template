import { Image, View } from 'native-base'
import React from 'react'
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
