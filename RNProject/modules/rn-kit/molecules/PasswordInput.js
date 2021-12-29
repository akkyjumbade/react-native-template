import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import TextInput from './TextInput'
import EyeIcon from '@/icons/EyeIcon'
import EyeOff from '@/icons/EyeOff'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ErrorBoundary from '@/components/errors/ErrorBoundary'

const PasswordInput = ({ prepend, ...props }) => {
   const [ toggleEye, setToggleEye ] = useState(true)
   function togglePassword() {
      setToggleEye(prev => !prev)
   }
   const ToggleButton = () => {
      return (
         <TouchableOpacity onPress={togglePassword}>
            {toggleEye ? (
               <EyeOff width={20} height={20} color={'gray'} />
            ) : (
               <EyeIcon width={20} height={20} color={'gray'} />
            )}
         </TouchableOpacity>
      )
   }

   return (
      <ErrorBoundary>
         <TextInput
            placeholder={'Strong password'}
            {...props}
            secureTextEntry={toggleEye}
            append={() => <ToggleButton />} />
      </ErrorBoundary>
   )

}

PasswordInput.propTypes = {
   name: PropTypes.string,
}

export default PasswordInput
