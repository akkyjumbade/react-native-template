import React from 'react'
import HTMLView from 'react-native-htmlview'
import { useTheme } from 'styled-components'

export default function HTMLInterface({ value }) {
   const { htmlStyle } = useTheme()
   const data = value
   return (
      <HTMLView stylesheet={htmlStyle} value={data} />
   )
}
