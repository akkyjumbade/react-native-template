import useTranslation from '@/hooks/useTranslation'
import { AlertDialog, Button, useToast, View } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { queryClient, server } from '@/utils/http'
import ButtonSecondary from '@modules/rn-kit/atoms/Button'
import ButtonPrimary from '@modules/rn-kit/atoms/ButtonPrimary'

const defaultProps = {
   onSuccess: () => console.log('Code not ready for onSuccess'),
   onError: (error) => console.log(error),
   label: 'Delete',
   lables: {
      confirm: 'Confirm',
      cancel: 'Cancel'
   }
}

const useDeleteQuery = (url) => {
   return useMutation(async (payload) => {
      return await server().post(url, {
         _method: 'DELETE',
         ...payload
      })
   }, {
      onSuccess(res) {
         queryClient.invalidateQueries()
      }
   })
}

const DeleteActionDialogue = ({ url, renderButton, label, labels = defaultProps.lables, onSuccess, onError } = defaultProps ) => {
   const [isOpen, setIsOpen] = React.useState(false)
   const __ = useTranslation()
   const toast = useToast()
   const onClose = () => setIsOpen(false)
   const { mutateAsync, isLoading } = useDeleteQuery(url)
   const onConfirmed = async () => {
      try {
         const { data, } = await mutateAsync({  })
         onSuccess && onSuccess(data)
         onClose()
      } catch (error) {
         onError && onError(error)
         toast.show({
            title: error.message,
            status: 'error'
         })
         onClose()
         console.warn({ error })
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
               <AlertDialog.Header>Are you sure?</AlertDialog.Header>
               <AlertDialog.Body>
                  This action cannot be reversed.
                  Deleted data can not be recovered.
               </AlertDialog.Body>
               <AlertDialog.Footer>
                  <Button.Group space={2} >
                     <ButtonSecondary
                        onPress={onClose}
                        ref={cancelRef}
                        title={labels.cancel}
                     />
                     <ButtonPrimary
                        loading={isLoading}
                        disabled={isLoading}
                        title={labels.confirm}
                        onPress={onConfirmed}
                     />
                  </Button.Group>
               </AlertDialog.Footer>
            </AlertDialog.Content>
         </AlertDialog>
      </View>
   )
}

DeleteActionDialogue.propTypes = {
   onSuccess: PropTypes.func,
   onError: PropTypes.func,
   label: PropTypes.string,
   lables: PropTypes.objectOf({
      confirm: PropTypes.string,
      cancel: PropTypes.string,
   }),
}
DeleteActionDialogue.defaultProps = defaultProps

export default DeleteActionDialogue
