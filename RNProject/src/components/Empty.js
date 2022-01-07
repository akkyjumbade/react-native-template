import icons from '@/icons'
import { Text, View } from 'native-base'
import React from 'react'

const Empty = ({ iconName = 'ban', title, children }) => {
   const Icon = icons[iconName]
   return (
      <View style={{ paddingVertical: 30, alignItems: 'center' }}>
         <View style={{ marginBottom: 15, marginTop: 15,  }}>
            <Icon width={100} height={100} color={'gray'} />
         </View>
         <Text>{title}</Text>
         <View style={{ marginTop: 20, }}>
            {children}
         </View>
      </View>
   )
}

Empty.defaultProps = {
   title: 'No data available'
}
export default Empty
