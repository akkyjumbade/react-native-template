import React, { useMemo } from 'react'
import { Button, Dimensions, Image, SafeAreaView, ScrollView, SectionList, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect, } from 'react-redux'
import Container from 'uikit/src/atoms/Container'
import { Text, Page } from 'uikit'
import CatalogueFilter from '../components/CatalogueFilter'
import { Heading } from 'uikit/src/atoms/Text'
import { Col, Grid } from 'native-base'

const numColumns = 3;

const CategoryItem = ({ section, index, onPress }) => {
   if (index % numColumns !== 0) {
      return null;
   }

   const items = [];
   for (let i = index; i < index + numColumns; i++) {
      const item = section.data[i];

      if (i >= section.data.length) {
         break;
      }

      if (item.empty === true) {
         items.push(
            <Col key={index} style={[styles.item, styles.itemInvisible]} />,
         );
      } else {
         items.push(
            <Col style={{ paddingHorizontal: 8, paddingBottom: 15, }}>
               <TouchableOpacity onPress={_ => onPress && onPress(item)} key={item.key} >
                  <Image resizeMode="cover" source={{ uri: item.thumbnail }} style={{ borderRadius: 20, width: 100, height: 100 , }} />
                  {/* sdfd */}
                  <Text size={13} style={{ marginTop: 8, }}>{item.title}</Text>
               </TouchableOpacity>
            </Col>
         );
      }
   }

   return (
      <Grid style={{ marginHorizontal: -8 }}>
         {items}
      </Grid>
   );
};
const ShopScreen = (props) => {
   const { categories, posts } = props
   const { navigation } = props
   const cats = useMemo(() => {
      return categories && categories.map(row => {
         return ({
            ...row,
            data: row.children,
         })
      })
   }, [categories])
   return (
      <Page scroll={true}>
         <CatalogueFilter categories={categories} />
         <Container>
            {/* <Text>{JSON.stringify({ categories })}</Text> */}
            <SectionList
               sections={cats}
               keyExtractor={row => row.id}
               style={styles.container}
               renderSectionHeader={({ section }) => (
                  <TouchableOpacity onPress={_ => navigation.navigate('CatalogueCategory', { category: section })}>
                     <View>
                        <Heading style={{ marginBottom: 5 }}>{section.title}</Heading>
                        {Boolean(section.description) ? (
                           <Text style={{ marginBottom: 10, }}>{section.description}</Text>
                        ) : null}
                        <Image source={{ uri: section.thumbnail }} style={styles.categoryBanner} />
                     </View>
                  </TouchableOpacity>
               )}
               renderItem={_row => (
                  <CategoryItem {..._row} onPress={row => navigation.navigate('CatalogueCategory', { category: row })} />
               )}
            />
         </Container>
      </Page>
   )
}

export default connect(state => ({
   categories: state.posts.categories?.products,
   posts: state.posts,
}))(ShopScreen)



const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginVertical: 20,
   },
   item: {
      flexWrap: 'wrap',
      // backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 3,
      margin: 1,
      height: 100,
      // overflow: 'hidden'
      // height: Dimensions.get('window').width / numColumns, // approximate a square
   },
   advertisementItem: {
      backgroundColor: 'darkgrey',
      // height: Dimensions.get('window').width / (numColumns + 1),
   },
   itemInvisible: {
      backgroundColor: 'transparent',
   },
   itemText: {
      color: '#fff',
   },
   categoryBanner: {
      width: '100%',
      height: 200,
      borderRadius: 20,
      marginBottom: 15,
   }
});
