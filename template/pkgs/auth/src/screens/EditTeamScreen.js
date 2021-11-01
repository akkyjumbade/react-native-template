import React, { useEffect } from 'react'
import { Button, SafeAreaView, ScrollView, View } from 'react-native'
import { Text } from 'uikit'
import { Page } from 'uikit'
import EmailFieldForm from '../forms/EmailFieldForm'
import NameFieldForm from '../forms/NameFieldForm'
import PhoneFieldForm from '../forms/PhoneFieldForm'
import BioFieldForm from '../forms/BioFieldForm'


const EditTeamScreen = (props) => {
   const { navigation: { navigate }, route: { params } } = props
   useEffect(() => {
      // navigate('')
   }, [])
   const fieldName = params?.field ? params.field : 'name'
   return (
      <Page>
         {/* <Text>{JSON.stringify(params)}</Text> */}
         {fieldName === 'name' && (
            <NameFieldForm />
         )}
         {fieldName === 'email' && (
            <EmailFieldForm />
         )}
         {fieldName === 'phone' && (
            <PhoneFieldForm />
         )}
         {fieldName === 'bio' && (
            <BioFieldForm />
         )}
         {fieldName === 'kyc' && (
            <BioFieldForm />
         )}
      </Page>
   )
}

export default EditTeamScreen
