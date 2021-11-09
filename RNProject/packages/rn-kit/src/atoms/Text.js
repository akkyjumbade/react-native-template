import React, { Fragment } from 'react'
import { Text as BaseText } from 'react-native';

export default function Text({ children }) {
   return (
      <BaseText>{children}</BaseText>
   )
}

