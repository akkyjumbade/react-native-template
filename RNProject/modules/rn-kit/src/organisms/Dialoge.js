import React, { useState } from 'react'
import { View, } from 'react-native'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/core'
import styled from 'styled-components/native'

const StyledDialog = styled.View`
   background: white;
`

export default function Dialogue(props) {
   const [ isOpen, setIsOpen ] = useState(Boolean(props.isOpen))
   const inEffect = useFocusEffect()
   const toggle = () => setIsOpen(prev => !prev)
   return (
      <SafeAreaView>

         {/* dialog script */}
         {(inEffect && isOpen)}
      </SafeAreaView>
   )
}

Dialogue.propTypes = {

}

Dialogue.defaultProps = {

}
