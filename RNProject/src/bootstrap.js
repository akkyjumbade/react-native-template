import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import OfflineScreen from './screens/OfflineScreen'
import useAppMount from './hooks/useAppMount'
import { Text } from 'react-native'

const Bootstrap = (props) => {
   // const isOnline = useIsConnected()
   const { status, mode } = useAppMount()

   return (
      <Fragment>
         {mode === 'online' ? (
            <OfflineScreen />
         ) : (
            <OfflineScreen />
         )}
      </Fragment>
   )
}

Bootstrap.propTypes = {
   // prop: PropTypes.string
}

Bootstrap.defaultProps = {
   type: 'text'
}

export default Bootstrap
