import React from 'react'
import HTMLView from 'react-native-htmlview'
import { htmlStyles } from '../../../../src/style/style'

export default function HTMLInterface({ value }) {
   const data = value
   return (
      <HTMLView stylesheet={htmlStyles} value={data} />
   )
}
