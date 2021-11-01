import React, { useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Icon } from 'uikit'
import { Text } from 'uikit'
import { TextInput } from 'uikit'
import { FormControl } from 'uikit'
import { Container } from 'uikit'
import http from '../../../../src/utils/http'
import PropTypes from 'prop-types'
import { Left, ListItem, Right } from 'native-base'

const SearchResultItem = ({ item, onPress }) => {
   return (
      <ListItem onPress={ev => onPress(item)}>
         <Left style={{ flex: 1}}>
            <Text>{item.title}</Text>
         </Left>
         <Right>
            <Text>^</Text>
         </Right>
      </ListItem>
   )
}

const SearchLocationAutoComplete = props => {
   const [ searchResult, setSearchResult ] = useState(null)
   function onSearch(q) {
      fetchQueryLocation({ q }).then(res => {
         setSearchResult(res?.data)
      })
   }
   function askGpsLocation() {
      // ask gps location and send to map
   }
   function onSelected(item) {
      if (props.onSelect) {
         props.onSelect(item)
      }
   }
   async function fetchQueryLocation(params = {}) {
      let str = new URLSearchParams(params)
      try {
         const { data } = await http.get(`/api/locations?${str.toString()}`)
         return data
      } catch (error) {
         console.warn(JSON.stringify(error))
      }
   }

   return (
      <View>
         <Container>
            <FormControl>
               <TextInput focus={true}  prepend={() => (
                  <Icon name="search" size={18} style={{ marginRight: 5 }} />
               )} placeholder="Enter location" onChangeText={onSearch} />
            </FormControl>
         </Container>
         <ListItem noIndent onPress={askGpsLocation}>
            <Left>
               <Text>Your current location (GPS).</Text>
            </Left>
         </ListItem>
         {/* <Text>{JSON.stringify({ searchResult })}</Text> */}
         <FlatList
            data={searchResult}
            keyExtractor={row => row.id}
            ListHeaderComponent={() => (
               <Container style={{ paddingTop: 10, }}>
                  {searchResult && (
                  <Text weight="bold">Search result</Text>
                  )}
               </Container>
            )}
            renderItem={row => (
               <SearchResultItem {...row} onPress={onSelected} />
            )}
            />
      </View>
   )
}

SearchLocationAutoComplete.propTypes = {
   onSelect: PropTypes.func,
}
export default SearchLocationAutoComplete
