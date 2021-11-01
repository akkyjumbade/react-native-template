import axios from 'axios'
import { Left, List, ListItem, Right } from 'native-base'
import React, { useEffect } from 'react'
import { FlatList, Image, View } from 'react-native'
import { useQuery } from 'react-query'
import { connect, useDispatch } from 'react-redux'
import { Text } from 'uikit'
import { Page } from 'uikit'
import configActions from '../../../../src/store/config/actions'

const apiURl = "https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;flag;alpha2Code"

const RenderCountryOption = ({ item, onPress }) => {
   return (
      <View noIndent >
         {/* <View style={{ paddingHorizontal: 15, }}>
            <Text>{item.name}</Text>
         </View> */}
         <List>
            {item.currencies?.map(cur => (
               <ListItem noIndent key={cur.code} onPress={_ => onPress && onPress(cur)} >
                  <Left>
                     <Text>{cur.code} - {cur.name}</Text>
                  </Left>
                  <Right>
                     <Text>{cur.symbol}</Text>
                  </Right>
               </ListItem>
            ))}
         </List>
      </View>
   )
}

const CurrencyPickerScreen = ({ navigation, config }) => {
   const dispatch = useDispatch()
   const { data, isLoading } = useQuery('rest_countries', async () => {
      return await axios.get(apiURl)
   })
   function onSelect(_selected) {
      dispatch(configActions.updateCurrencyAction(_selected.code))
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
               <RenderCountryOption {...row} onPress={ev => onSelect(ev)} />
            )}
          />
      </Page>
   )
}

export default connect(state => ({
   config: state.config,
}))(CurrencyPickerScreen)
