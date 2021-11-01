import axios from 'axios'
import { Left, ListItem } from 'native-base'
import React, { useEffect } from 'react'
import { FlatList, Image } from 'react-native'
import { useQuery } from 'react-query'
import { connect, useDispatch } from 'react-redux'
import { Text } from 'uikit'
import { Page } from 'uikit'
import configActions from '../../../../src/store/config/actions'

const apiURl = "https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;flag;alpha2Code"

const RenderCountryOption = ({ item, onPress }) => {
   return (
      <ListItem noIndent onPress={onPress}>
         <Left>
            <Image source={{ uri: item.flag, }} style={{ width: 30, height: 30, }} />
            <Text>{item.name}</Text>
         </Left>
      </ListItem>
   )
}

const CountryPickerScreen = ({ navigation, config }) => {
   const dispatch = useDispatch()
   const { data, isLoading } = useQuery('rest_countries', async () => {
      return await axios.get(apiURl)
   })
   function onSelect(_selected) {
      dispatch(configActions.updateCountryAction(_selected.alpha2Code))
      navigation.goBack()
   }
   // useEffect(() => {
   //    if (config.country) {
   //       navigation.goBack()
   //    }
   // }, [config.country])
   return (
      <Page loading={isLoading}>
         {/* <Text>{JSON.stringify({ config, })}</Text> */}
         <FlatList
            data={data?.data}
            keyExtractor={row => row.alpha2Code}
            renderItem={(row) => (
               <RenderCountryOption {...row} onPress={_ => onSelect(row.item)} />
            )}
          />
      </Page>
   )
}

export default connect(state => ({
   config: state.config,
}))(CountryPickerScreen)
