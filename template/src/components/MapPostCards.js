import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { BackHandler, View } from 'react-native'
import NearbyPostCard from './NearbyPostCard'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { Container, Icon, Text } from 'uikit'
import LocationForm from 'auth/src/components/LocationForm'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import { Col, Grid, ListItem, Row } from 'native-base'
import { sampleCoordinates } from '../pages/data'
import OptionsInput from 'uikit/src/molecules/OptionsInput'
import { useNavigation } from '@react-navigation/core'
import { useBackButton } from '@react-navigation/native'
import { map } from 'lodash-es'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import PickerDialogue from 'uikit/src/molecules/PickerDialogue'
import SearchInputControl from 'uikit/src/molecules/SearchInputControl'
import { CategoryCard, cats } from '../pages/CategoryChoiceScreen'
import _ from 'lodash'
import { SCREEN } from '../config'
import { useDispatch } from 'react-redux'
import configActions from '../store/config/actions'

const filterOptions = [
   {
      label: 'Nearby',
      value: 'Nearby',
   },
   {
      label: 'LowtoHigh',
      value: 'LowtoHigh',
   },
]

const Toolbar = ({ onSearch, value, onFilter }) => {
   function updateFilter() {
      onFilter && onFilter(value)
   }
   const dispatch = useDispatch()
   // const navigation = useNavigation()
   const categories = useMemo(() => {
      return _.chunk(cats, 2)
   }, [])
   function onCardClick(item) {
      // navigation.navigate('Market')
      // dispatch(configActions.setPreferredChoice(item.title))
   }

   return (
      <View style={{ height: 40, paddingHorizontal: 15, }}>
         <Grid>
            <Col size={40}>
               {/* <Text>Nearby</Text> */}
               <OptionsInput
                  renderField={() => (
                     <Text>Nearby</Text>
                  )}
                  renderOption={({ item }) => (
                     <ListItem noIndent>
                        <Text>{item.label}</Text>
                     </ListItem>
                  )}
                  keyExtractor={row => row.value}
                  options={filterOptions}
                />
            </Col>
            <Col size={30}></Col>
            <Col size={30} style={{ justifyContent: 'flex-end',  flexDirection: 'row' }}>
               <View style={{ flex: 1,  }}>
                  <PickerDialogue
                     renderField={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                           <Text style={{ marginRight: 6, }}>Search</Text>
                           <Icon name="search" size={22} />
                        </View>
                     )}>
                     <Container>
                        <SearchInputControl />
                     </Container>
                     <Container>
                        <Text>P[sdfd levef</Text>
                        <Grid style={{ paddingVertical: 15, marginHorizontal: -8, }}>
                           {categories && categories.map((row, row_k) => (
                              <Row style={{ marginBottom: 10, }} key={row_k}>
                                 {row.map((cat, cat_index) => (
                                    <Col style={{ paddingHorizontal: 8, }} key={'item-' + cat_index}>
                                       <CategoryCard onPress={() => onCardClick(cat)} {...cat} />
                                    </Col>
                                 ))}
                              </Row>
                           ))}
                        </Grid>
                     </Container>
                  </PickerDialogue>
               </View>

            </Col>
         </Grid>
      </View>
   )
}

const MapPostCards = memo(({ coordinate, location = {} }) => {
   const SCREEN = useWindowDimensions()
   const navigation = useNavigation()
   // useBackButton()
   const postCards = useMemo(() => {
      return sampleCoordinates
   }, [])
   function onCardClick(item) {
      navigation.navigate('Blog', { screen: 'Post', params: {post: item,} })
   }
   //
   return (
      <View>
         <View>
            <Text>{JSON.stringify({ coordinate })}</Text>
         </View>
         <Portal>
         <Text>P[sdfd levef</Text>
            <Modalize
               alwaysOpen={SCREEN.height / 2.5}
               modalStyle={{ margin: 0, }}
               adjustToContentHeight
               HeaderComponent={() => (
                  <Modal_Header title={'Nearby'}>
                     <Toolbar />
                  </Modal_Header>
               )}
               >
               <Text>{JSON.stringify({ coordinate })}</Text>
               <View style={{ paddingHorizontal: 15, }}>
                  {postCards && postCards.map((postCard, postCardIndex) => (
                     <NearbyPostCard onPress={() => onCardClick(postCard)} item={postCard} index={postCardIndex} />
                  ))}
               </View>
            </Modalize>
         </Portal>
      </View>
   )
})

MapPostCards.propTypes = {
   coordinate: PropTypes.object.isRequired,
}

MapPostCards.defaultProps = {
   // type: 'text'
}

export default MapPostCards
