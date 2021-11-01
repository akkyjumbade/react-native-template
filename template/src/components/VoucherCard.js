import { useNavigation } from '@react-navigation/core'
import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import styled from 'styled-components/native'
import { Container } from 'uikit'
import { Button } from 'uikit'
import { Text } from 'uikit'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import { SCREEN } from '../config'
import { colors } from '../style/theme'

const StyledCard = styled(TouchableOpacity)`
   background-color: ${({ theme, color }) => color ? color : theme.colors.primary};
   padding: 7px 15px;
   border-radius: 10px;
   margin-bottom: 10px;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border: 1px solid white;
   width: 100%;
`
const styles = StyleSheet.create({
   description: {
      borderTopColor: 'white',
      borderTopWidth: 1,
      paddingTop: 6,
      marginTop: 6,
      flexDirection: 'row',
      alignItems: 'center'
   }
})
const VoucherCard = ({ title, description, children, ...rest }) => {
   const modalEl = useRef()
   const navigation =  useNavigation()
   function onOfferClicked() {
      modalEl.current?.open()
   }
   function onDealClick() {
      navigation.navigate('Checkout', {
         voucher: rest
      })
   }
   return (
      <>
      <StyledCard {...rest} onPress={onOfferClicked}>
         <View>
            <Text weight="bold">{title}</Text>
         </View>
         {description ? (
         <View style={styles.description}>
            {description && description()}
         </View>
         ) : null}
      </StyledCard>
      <Portal>
         <Modalize modalHeight={SCREEN.height / 2} ref={modalEl} HeaderComponent={() => (
            <Modal_Header style={{ backgroundColor: '#D9BBD5', borderTopLeftRadius: 12,
            borderTopRightRadius: 12, padding: 15, }} title={'Deal Terms'} />
         )} FooterComponent={() => (
            <View style={{ paddingBottom: 30, paddingHorizontal: 15, }}>
               <Button onPress={onDealClick} weight="bold" title="Yes I Want The Deal" size="lg" intent={Button.INTENT_INFO} />
            </View>
         )}>
            <Container style={{ paddingTop: 15, }}>
               <View>
                  <Text size={16} style={{ marginBottom: 10, }}>
                  1. You Have to post within Next 24 hours.{'\n'}
                  (* Use all #tags & Mention The Location & Tag it should be Visible)
                  </Text>
                  <Text size={16} style={{ marginBottom: 10, }}>
                  2. You Have to post within Next 7 Days.{'\n'}
                  (* Use all #tags & Mention The Location & Tag it should be Visible)
                  </Text>
               </View>
               {/* {description ? (
               <View style={styles.description}>
                  {description && description()}
               </View>
               ) : null} */}
            </Container>
         </Modalize>
      </Portal>
      </>
   )
}


export default VoucherCard
