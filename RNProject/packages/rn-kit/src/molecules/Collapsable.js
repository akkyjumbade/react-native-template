import React, { Fragment, useState } from 'react'

export default function Collapsable({ header, children }) {
   const [ isOpen, setIsOpen ] = useState(false)

   function onPress() {
      setIsOpen(prev => !prev)
   }

   return (
      <Fragment>
         {header && header({ onPress })}
         {isOpen && children}
      </Fragment>
   )
}
