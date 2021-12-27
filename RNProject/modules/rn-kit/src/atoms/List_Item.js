import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import { Container, Text } from '../..';
import { styles } from './List';


export const List_Item = props => {
   const { label, caption } = props;
   const { colors } = useContext(ThemeContext);

   return (
      <View style={styles.list_item_container}>
         <View style={styles.list_item}>
            <Container>
               <Text size={15}>{label}</Text>
               {props.children}
               {props.right && props.right()}
            </Container>
         </View>
         {caption && (
            <Container>
               <View style={{ marginTop: 6, marginBottom: 15 }}>
                  <Text color={colors.gray}>{caption}</Text>
               </View>
            </Container>
         )}
      </View>
   );
};
