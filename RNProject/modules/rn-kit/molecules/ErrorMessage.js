import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '..'
import colors from '../themes/colors'
import Collapsable from './Collapsable'

const StyledError = styled.View`
   margin: 0 15px;
   padding: 15px;
   background: white;
   border: 1px solid ${({ theme }) => theme.colors.danger};
   border-radius: 10px;
`
export default function ErrorMessage({ error }) {
   return (
      <StyledError>
         <View>
            <Text size={13}>{error.name}</Text>
            <Text size={16} style={{ color: colors.danger, marginBottom: 10, }}>{error.message}</Text>
            <Collapsable header={({ onPress }) => (
               <TouchableOpacity onPress={onPress}>
                  <Text size={13}>View more</Text>
               </TouchableOpacity>
            )}>
               <Text size={10} style={{ color: colors.gray }}>{error.stack}</Text>
               {error.response?.data && (
                  <Text size={10} style={{ color: colors.gray }}>{JSON.stringify(error.response.data)}</Text>
               )}

            </Collapsable>
         </View>
      </StyledError>
   )
}
