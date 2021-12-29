import { update_profile_photo_action } from 'auth/src/store/actions'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import { useMutation } from 'react-query'
import { connect, useDispatch } from 'react-redux'
import { Text } from '../..'

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center'
   },
   avatar: {
      width: 68, height: 68, borderRadius: 1000,
      margin: 15,
   }
})
const demoUser = {
   avatar: 'http://placehold.it/80',
}

const UserPersona = ({ user = demoUser, inline = false }) => {
   let isInlineStyle = {}
   const profilePhoto = {
      uri: user?.profile_photo_url
   }
   if (inline) {
      isInlineStyle = {
         flexDirection: 'row',
      }
   }
   // const { mutate } = useMutation(imgFile => {
   //    return
   // })
   const dispatch = useDispatch()
   function onPhotoSelect(imgFile) {
      dispatch(update_profile_photo_action(imgFile))
   }
   if (!user) {
      return null
   }
   return (
      <View style={[styles.container, isInlineStyle]}>
         <View>
            <PhotoUpload onPhotoSelect={onPhotoSelect}>
               <Image source={profilePhoto} style={styles.avatar} />
            </PhotoUpload>
         </View>
         <View>
            <Text size={18}>{user?.name}</Text>
            <Text size={13}>@{user?.email}</Text>
         </View>
      </View>
   )
}

export default connect(state => ({
   user: state.auth.user
}))(UserPersona)
