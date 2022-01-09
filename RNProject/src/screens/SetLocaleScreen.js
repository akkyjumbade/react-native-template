import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'
import { Page } from '@modules/rn-kit'
import WebView from 'react-native-webview'
import { SCREEN } from '@/config'
import { Center, FlatList, HStack, Image, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import icons from '@/icons'
import { SearchInputControl } from '@modules/rn-kit/molecules'
import { useQuery } from 'react-query'

const appLogoUri = {
   uri: 'http://placehold.it/144'
}

const styles = StyleSheet.create({
   logo: {
      width: 144,
      height: 144,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
   },
})

const SearchedItem = ({ item }) => {
   return (
      <View>
         <Text>{JSON.stringify({ item })}</Text>
      </View>
   )
}

const SetLocaleScreen = (props) => {
   const { uri } = props
   const { data: searchResult } = useQuery()

   return (
      <Page centerMode={false}>
         <Page.Container>
            <Page.Title>Set Language</Page.Title>
            <SearchInputControl placeholder={'Search...'} />
            <FlatList
               data={searchResult?.data}
               keyExtractor={row => row.id}
               renderItem={SearchedItem}
             />
         </Page.Container>
      </Page>
   )
}

SetLocaleScreen.propTypes = {
   uri: PropTypes.string.isRequired,
}

SetLocaleScreen.defaultProps = {
   uri: 'https://google.com'
}

export default SetLocaleScreen
