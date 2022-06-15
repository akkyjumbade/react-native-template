import { Text } from '@modules/rn-kit'
import React, { useMemo, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import ErrorBoundary from './errors/ErrorBoundary'

const ProfilePhotoUpdate = ({ uri, children }) => {
   const [ isOpened, setIsOpened ] = useState(false)
   const modalRef = useRef()
   const defaultPhoto = useMemo(() => {
      return uri
   }, [ uri ])


   const toggleWindow = () => {
      setIsOpened(prev => !prev)
      modalRef.current?.open()
   }

   return (
      <ErrorBoundary>
         <TouchableOpacity onPress={toggleWindow}>
            {children}
         </TouchableOpacity>
         {/* <Text>Update photo</Text> */}
         {/* <Portal>
            <Modalize ref={modalRef} >
               <Text>Choose photo</Text>
            </Modalize>
         </Portal> */}
      </ErrorBoundary>
   )
}

export default ProfilePhotoUpdate
