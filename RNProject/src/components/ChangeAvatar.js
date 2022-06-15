import React from 'react'
import { View, Image } from 'react-native'

// const avatarImage = require('')
const avatarImage = {
   uri: ''
}

const ChangeAvatar = ({ avatar }) => {
  return (
    <View>
      <Image source={avatar} />
    </View>
  )
}

ChangeAvatar.propTypes = {}
ChangeAvatar.defaultProps = {
   avatar: avatarImage
}

export default ChangeAvatar
