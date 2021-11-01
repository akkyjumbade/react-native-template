import React from 'react'
import { Button, Image, SafeAreaView, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect, } from 'react-redux'
import Container from 'uikit/src/atoms/Container'
import { Text, Grid, Page } from 'uikit'

const CatalogueScreen = (props) => {
   const { categories } = props
   const { navigation } = props
   return (
      <Page scroll={true}>
         <Container>
            <Text>Catalogue</Text>
            <Grid style={{ marginHorizontal: -10 }} items={categories} colsPerRow={2} render={(row) => (
               <TouchableOpacity onPress={() => navigation.navigate('CatalogueCategory', { category: row })} style={{ padding: 8, }}>
                  <Image source={{ uri: row.thumbnail }} style={{ borderRadius: 10,width: '100%', height: 180, }} />
                  <Text size={13} style={{ marginTop: 8, }}>{row.title}</Text>
               </TouchableOpacity>
            )} />
         </Container>

      </Page>
   )
}

export default connect(state => ({
   categories: state.posts.item_categories,
}))(CatalogueScreen)
