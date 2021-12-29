import React, {  } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import TextInput from './TextInput'

export default function EmailInput({ prepend, append, ...props }) {
   return (
      <Fragment>
         <TextInput {...props}
            keyboardType={'email-address'}
            placeholder={'example@domain.com'}
            autoCapitalize={'none'} />
      </Fragment>
   )

}

EmailInput.propTypes = {
   name: PropTypes.string,
}
