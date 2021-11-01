/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { Image, View } from 'react-native'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { load_category_action } from '../../../../src/store/posts/actions'
import Container from 'uikit/src/atoms/Container'
import { Text, Grid } from 'uikit'
import Page from '../../../../src/components/organisms/Page'
import { Loading } from 'uikit'
import ItemWidget from '../../../../src/components/molecules/ItemWidget'
import http from '../../../../src/utils/http'

const CategoryItems = ({ category }) => {
   const { isLoading, data } = useQuery(`cat_${category.id}`, async () => {
      const url = `/api/v1/shop_category_info?category=${category.id}`
      console.log({ url})
      return await http.get(url)
   })
   if (isLoading) {
      return (
         <Loading />
      )
   }
   return (
      <View>
         {/* <Text>{JSON.stringify({ data: data })}</Text> */}
         <Grid style={{ marginHorizontal: -10 }} items={data?.data} colsPerRow={2} render={(row) => (
            <ItemWidget item={row} />
         )} />
      </View>
   )
}

export default function CatalogueCategory({ route, navigation }) {
   const category = route.params.category
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(false)
      dispatch(load_category_action({ payload: route.params.id }))

   }, [route.params])

   useEffect(() => {
      navigation.setOptions({
         title: category?.title
      })
   }, [category, navigation])

   const categoryItems = useMemo(() => {
      // return category
      return null
   }, [])

   if (loading && !category) {
      return (
         <Page>
            <Loading />
         </Page>
      )
   }
   return (
      <Page scroll={true}>
         {/* <Text>
            {JSON.stringify({ category })}
         </Text> */}
         <Image source={{ uri: category.thumbnail }} style={{ marginBottom: 15, width: '100%', height: 250, }} />
         <Container>
            <Text size={22} style={{ marginBottom: 15, }}>{category.title}</Text>
            <Text>{category.description}</Text>

            <CategoryItems category={category} />
         </Container>
      </Page>
   )
}
