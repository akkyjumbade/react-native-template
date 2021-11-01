import React, { Fragment } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'uikit'
import { Text } from 'uikit'
import AddressForm from './AddressForm'

const EmptyAddressAction = (props) => {
   return (
      <Fragment>
         <View>
            <TouchableOpacity style={{ padding: 15, alignSelf: 'center', alignItems: 'center' }}>
               <Icon size={26} name="plus-circle" />
               <Text style={{ marginTop: 10, }}>
                  {/* {JSON.stringify(props)} */}
                  Add new address
               </Text>
            </TouchableOpacity>
         </View>
         <AddressForm address={{}} />
      </Fragment>
   )
}

export default connect(state => ({
   user: state.auth.user,
}))(EmptyAddressAction)
