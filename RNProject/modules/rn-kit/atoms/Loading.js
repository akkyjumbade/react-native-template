import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'styled-components';
import styled from "styled-components/native";
import { Text } from '../atoms';

const StyledLoading = styled.View`
   font-size: 16px;
   color: ${({ theme }) => theme.colors.textColor};
   align-content: center;
   align-items: center;
   justify-content: center;
`

export const Spinner = () => {
   const { colors } = useTheme()
   return (
      <View style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
         <ActivityIndicator size={25} color={colors.dark} />
      </View>
   )
}

export default function LoadingSpinner(props) {
   const { colors } = useTheme()
   return (
      <StyledLoading >
         <View style={{ width: '100%', flex: 1, alignItems: 'center', }}>
            <ActivityIndicator size={25} color={colors.dark} />
         </View>
         {props.caption && (
         <View style={{ marginTop: 6, width: '100%', flex: 1, alignItems: 'center', }}>
            <Text>{props.caption || 'Loading...'}</Text>
         </View>
         )}

      </StyledLoading>
   )
}
