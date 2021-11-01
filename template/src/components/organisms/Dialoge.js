import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import styled from 'styled-components/native'
import { SCREEN } from '../../config'
import { Text, Button } from 'uikit'

const StyledDialogeContainer = styled(Modal).attrs(attrs => ({
   // backgroundColor: attrs.backgroundColor || 'white',
}))`
   background-color: rgba(0, 0, 0, .2);
   z-index: 999;
   width: 100%;
   height: 100%;
   position: relative;
`
const StyledDialoge = styled.View.attrs(attrs => ({
   width: attrs.width || '100%',
   height: attrs.height || '300px',
   backgroundColor: attrs.backgroundColor || 'red',
}))`
   position: absolute;
   background-color: white;
   border-radius: 10px;
   box-shadow: 0 15px 25px rgba(0, 0, 0, .2);
   border: 1px solid ${({ theme }) => theme.colors.gray};
   margin: 0 auto;
   bottom: 100;
   flex: 1;
   width: 100%;
   min-height: 100px;
   flex-direction: column;
   align-items: stretch;
`
const StyledHeader = styled.View`
   background: red;
   flex: 1;
`
const StyledFooter = styled.View`
   background: gray;
   flex: 1;
`
const Header = ({ title }) => {
   // if (!title) {
   //    return null
   // }
   return (
      <StyledHeader>
         <View style={{ paddingHorizontal: 15, paddingVertical: 6 }}>
            {title && (
               <Text>{title}</Text>
            )}
         </View>
      </StyledHeader>
   )
}

const Footer = ({ actions, onClose }) => {
   return (
      <StyledFooter>
         <View>
            <Button title={'Close'} intent="danger" onPress={onClose} />
         </View>
      </StyledFooter>
   )
}

export default function Dialoge({ children, ...props }) {
   const [ showModal, setShowModal ] = useState(true)
   function onClose() {
      setShowModal(false)
   }
   if (!showModal) {
      return null
   }
   return (
      <StyledDialogeContainer>
         <StyledDialoge animationType="slide" transparent={true} {...props}>
            <Header title={props.title} />
            {children && (
               <View style={{ flex: 1 }}>
                  {children}
               </View>
            )}
            <Footer actions={props.actions} onClose={onClose} />
         </StyledDialoge>
      </StyledDialogeContainer>
   )
}
