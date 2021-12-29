import useTranslation from '@/hooks/useTranslation'
import { AlertDialog, Button, useToast, View } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { server } from '@/utils/http'
import { alert } from '@modules/rn-kit/utils/alert'
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary'
import ButtonSecondary from '@modules/rn-kit/atoms/Button'
import { useDispatch } from 'react-redux'
import { auth_logout_action } from '@/store/auth/auth.actions'

const defaultProps = {
   onSuccess: () => alert('Code not ready for onSuccess'),
   onError: () => alert('Code not ready for onError'),
   label: 'Delete',
   lables: {
      confirm: 'Confirm',
      cancel: 'Cancel'
   }
}

const useLogoutQuery = (url) => {
   return useMutation(async (payload = null) => {
      return await server().post(url)
   })
}

const LogoutActionDialogue = ({ renderButton, label, onSuccess, onError } ) => {
   const url = '/logout'
   const [isOpen, setIsOpen] = React.useState(false)
   const __ = useTranslation()
   const onClose = () => setIsOpen(false)
   const { mutateAsync, isLoading } = useLogoutQuery(url)
   const dispatch = useDispatch()
   const toast = useToast()
   const onConfirmed = async () => {
      try {
         const { data, } = await mutateAsync({  })
         // ignore server logout
      } catch (error) {

      } finally {
         onClose()
         toast.show({
            title: __('response.logged_out')
         })
         setTimeout(() => {
            dispatch(auth_logout_action())
         }, 1000);
      }
   }
   const cancelRef = React.useRef(null)

   return (
      <View>
         {renderButton && renderButton({ onPress: () => setIsOpen(!isOpen)})}
         <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
         >
            <AlertDialog.Content >
               <AlertDialog.CloseButton />
               <AlertDialog.Header>Are you sure to logout?</AlertDialog.Header>
               <AlertDialog.Body>
                  Are you sure to logout?
               </AlertDialog.Body>
               <AlertDialog.Footer>
                  <Button.Group space={2} >
                     <ButtonSecondary
                        title={__('cancel')}
                        ref={cancelRef}
                        onPress={onClose}
                     />
                     <ButtonPrimary
                        title={__('confirm')}
                        disabled={isLoading}
                        loading={isLoading}
                        onPress={onConfirmed}
                     />
                  </Button.Group>
               </AlertDialog.Footer>
            </AlertDialog.Content>
         </AlertDialog>
      </View>
   )
}

LogoutActionDialogue.propTypes = {
   onSuccess: PropTypes.func,
   onError: PropTypes.func,
   label: PropTypes.string,
   // lables: PropTypes.objectOf({
   //    confirm: PropTypes.string,
   //    cancel: PropTypes.string,
   // }),
}
LogoutActionDialogue.defaultProps = defaultProps

export default LogoutActionDialogue
