import { useNavigation } from '@react-navigation/core'
import chunk from 'lodash/chunk'
import { Col, Grid, Row } from 'native-base'
import React, { useEffect, useMemo } from 'react'
import { Linking, TouchableOpacity, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Container } from 'uikit'
import { Text, Loading, Page } from 'uikit'

const OffersScreen = ({ route, navigation }) => {
   const posts = useSelector(state => state.posts?.posts)
   const ads = useMemo(() => {
      // let limitedItems = posts?.ads?.slice(0, 12)
      return posts && chunk(posts?.ads, 3)
   }, [posts])
   return (
      <Page>
         <Container>
            <Grid>
               {ads && ads.map((row, rowk) => (
                  <Row key={rowk}>
                     {row.map((cell) => (
                        <Col key={cell.id}>
                           <TouchableOpacity onPress={() => navigation.navigate('PostInfo', { post: cell })} style={{ padding: 10, marginBottom: 15, height: 50,  }}>
                              <Image resizeMode="contain" source={{ uri: cell.thumbnail,  }} style={{ width: '100%', height: '100%'}} />
                              {/* <Text>{JSON.stringify(cell)}</Text> */}
                           </TouchableOpacity>
                        </Col>
                     ))}
                  </Row>
               ))}
            </Grid>
         </Container>
      </Page>
   )
}

export default OffersScreen
