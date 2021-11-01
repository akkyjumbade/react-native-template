import LocationForm from 'auth/src/components/LocationForm'
import SearchLocationAutoComplete from 'auth/src/components/SearchLocationAutoComplete'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View, Image, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { connect, useDispatch } from 'react-redux'
import { FormControl } from 'uikit'
import { TextInput } from 'uikit'
import { Container } from 'uikit'
import { Text, Button } from 'uikit'
import { Page } from 'uikit'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import ErrorBoundary from '../components/ErrorBoundary'
import MapWidget from '../components/molecules/MapWidget'
import { SCREEN } from '../config'
import { sampleCoordinates } from './data'
import { Callout, CalloutSubview, Marker, Overlay } from 'react-native-maps'
import MapMarker from '../components/molecules/MapMarker'
import OptionsInput, { OptionsItem } from 'uikit/src/molecules/OptionsInput'
import { Col, Grid, ListItem, Right, Separator } from 'native-base'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import { Icon } from 'uikit'
import PickerDialogue from 'uikit/src/molecules/PickerDialogue'
import NearbyPostCard from '../components/NearbyPostCard'
import { nearbyFilterOptions } from '../config/options'
import useCollapse from '../utils/useCollapse'
import { CategoriesGrid, cats } from './CategoryChoiceScreen'
import { uniqBy } from 'lodash-es'
import SearchInputControl from 'uikit/src/molecules/SearchInputControl'
import { useQuery } from 'react-query'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
   img: {
      width: '100%',
      height: 100,
      borderRadius: 10,
      flex: 1,
   },
   postCover: {
      width: '100%',
      height: 130,
      borderRadius: 10,
      overflow: 'hidden',
      resizeMode: 'cover'
   },
   searchItem: {
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: '#f4f4f4',
      borderColor: '#ccc',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
   },
   optionBtn: {
      backgroundColor: '#eee',
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
      borderRadius: 15,
   }
})

function RenderSearchItem({ item, onPress }) {
   return (
      <ListItem noIndent onPress={() => onPress && onPress(item)}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
               <View style={styles.searchItem} >
                  <Icon name={item.leftIcon ? item.leftIcon : 'map-marker-alt'} color={'#666'} lib="FontAwesome5" size={22} />
               </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1,  }}>
               <View style={{ paddingLeft: 15, flex: 1, flexGrow: 1, width: '100%', alignItems: 'flex-start' }}>
                  <View style={{  }}>
                     <Text bold size={17}>{item.location}</Text>
                  </View>
                  <View style={{  }}>
                     <Text size={13} color={'#666'} >{item.description}</Text>
                  </View>
               </View>

            </View>
            <View style={{ marginRight: 5, }}>
               {item.count && (
                  <>
                  <Text color={'#e0659f'}>{item.count} Deals</Text>
                  </>
               )}
               <Text>{item.distance}</Text>
            </View>
         </View>
      </ListItem>
   )
}

export const postTypes = [
   {
      title: 'Story',
      thumbnail: 'utensils',
      image: require('../../assets/icons8-storytelling-100.png'),
      themeColor: '#F2D3AC',
   },
   {
      title: 'Posts',
      thumbnail: 'hotel',
      image: require('../../assets/icons8-create-new-child-post-100.png'),
      themeColor: '#D9BBD5',
   },
]
const SearchListHeader = ({ onSortChange, sortIndex }) => {
   const { toggle, isExpanded} = useCollapse()
   const [ filters, _setFilters ] = useState({})
   function setFilters() {

   }
   return (
      <Container>
         <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 15, flex: 1 }}>
               <PickerDialogue
                  showFooter={false}
                  title={'Filter'}
                  renderField={() => (
                     <View style={styles.optionBtn}>
                        <Text>Filter</Text>
                     </View>
                  )}
               >
                  <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 15, }}>
                     <View style={{ paddingHorizontal: 0, flex: 1, minHeight: 250, marginBottom: 30 }}>
                        <View style={{ marginBottom: 15, marginHorizontal: 15 }}>
                           <Text bold size={20}>Categories</Text>
                        </View>
                        <CategoriesGrid categories={cats} />
                     </View>
                     <View style={{ paddingHorizontal: 0, flex: 1, minHeight: 150, marginBottom: 30, }}>
                        <View style={{ marginBottom: 15, marginHorizontal: 15 }}>
                           <Text bold size={20}>Post Types</Text>
                        </View>
                        <CategoriesGrid categories={postTypes} />
                     </View>
                     <View style={{ paddingHorizontal: 15 }}>
                        <Button title={'Confirm'} size="lg" intent="primary" />
                     </View>

                  </View>
               </PickerDialogue>

            </View>
            <View style={{ flex: 4 }}>
               <OptionsInput
                  rightIcon="sort"
                  renderField={({ selectedOption }) => (
                     <View style={styles.optionBtn}>
                        {selectedOption ? (
                           <Text>{JSON.stringify(selectedOption)}</Text>
                        ) : (
                           <Text style={{ flexWrap: 'nowrap', }}>High Value</Text>
                        )}
                        <Icon name="sort" lib="FontAwesome5" size={16} style={{ marginTop: -2, marginLeft: 4, }} />
                     </View>
                  )}
                  keyExtractor={row => row.value}
                  options={nearbyFilterOptions}
                  showFooter={false}
                  renderOption={({ item, index }) => (
                     <OptionsItem onSelect={onSortChange} index={index} selectedIndex={sortIndex} labelKey={'label'} valueKey={'value'} item={item} />
                  )}
               />
            </View>
         </View>
      </Container>
   )
}

const Toolbar = ({ onFilter: _onFilter, data: _data, nearbyValue, onSearchToggle }) => {
   const [isOpen, setIsOpen] = useState(true)
   const [filters, setFilters] = useState({
      nearbyValue
   })
   const [ sortIndex, setSortIndex ] = useState(0)
   function onFilter(ev) {
      setIsOpen(false)
      _onFilter && _onFilter(ev)
   }
   function onSortChange(ev, _index) {
      setIsOpen(false)
      setSortIndex(_index)
      _onFilter && _onFilter(ev)
   }
   const data = useMemo(() => {
      const nearbyItem = {
         title: "Nearby",
         location: "Nearby",
         leftIcon: "location-arrow",
         coordinate: {
            "latitude": 41.3792997,
            "longitude": 2.1590763,
         },
      }
      return uniqBy([nearbyItem, ..._data], 'location')
   }, [_data])

   function _onSearchToggle() {
      onSearchToggle && onSearchToggle()
   }

   return (
      <View style={{ paddingHorizontal: 15, minHeight: 35, }}>
         <Grid>
            <Col size={50}>
               <View style={{ marginRight: 15, }}>
                  <PickerDialogue
                     onSelect={''}
                     closeOnSelect={true}
                     renderField={({ selectedOption}) => (
                        <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 0 }}>
                           {selectedOption ? (
                              <Text size={20}>{JSON.stringify(selectedOption)}</Text>
                           ) : (
                              <Text size={20} >Berlin</Text>
                           )}
                           <Icon name="sort-down" lib="FontAwesome5" size={20} style={{ marginTop: -5, marginLeft: 4, }} />
                        </View>
                     )}
                     title={'Choose city'}
                     flatListProps={{
                        keyExtractor: row => row.value,
                        data: data,
                        renderItem: __rp => (
                           <RenderSearchItem onPress={onFilter} {...__rp} />
                        )
                     }}
                     showFooter={false}
                     >
                     {/* <Text>sdfsdf</Text> */}
                  </PickerDialogue>

               </View>
            </Col>
            <Col size={30} >
               <OptionsInput
                  rightIcon="sort"
                  renderField={({ selectedOption }) => (
                     <View style={styles.optionBtn}>
                        {selectedOption ? (
                           <Text>{JSON.stringify(selectedOption)}</Text>
                        ) : (
                           <Text style={{ flexWrap: 'nowrap', }}>High Value</Text>
                        )}
                        <Icon name="sort" lib="FontAwesome5" size={16} style={{ marginTop: -2, marginLeft: 4, }} />
                     </View>
                  )}
                  keyExtractor={row => row.value}
                  options={nearbyFilterOptions}
                  showFooter={false}
                  renderOption={({ item, index }) => (
                     <OptionsItem onSelect={onSortChange} index={index} selectedIndex={sortIndex} labelKey={'label'} valueKey={'value'} item={item} />
                  )}
               />
            </Col>
            <Col size={15} style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 15 }}>
               <View style={{ alignSelf: 'flex-start', alignContent: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row',  }}>
                  <View style={[styles.optionBtn]}>
                     <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <Icon name={'search'} onPress={_onSearchToggle} size={20} />
                     </View>
                  </View>
               </View>
            </Col>
         </Grid>
      </View>
   )
}

const ExploreScreen = props => {
   const resultModal = useRef()
   let alwaysOpenState = (SCREEN.height / 2.5)
   const nearbyServices = sampleCoordinates
   const [openSearch, setOpenSearch] = useState(false)
   const { data, error, isLoading: isLoadingBusinesses } = useQuery(`/api/businesses`)
   function onMapChange(ev) {
      const nativeEvent = ev?.nativeEvent || {}
      console.log({ nativeEvent })
   }
   const isFocused = useIsFocused()

   function focusNearbyPointFirst() {

   }
   const navigation = useNavigation()
   function navigateToPost(item) {
      navigation.navigate('Blog', { screen: 'Post', params: {post: item,} })
   }

   useEffect(() => {
      // setTimeout(() => {
      //    onSearchClick()
      // }, 400);

      focusNearbyPointFirst()
      return () => {
         // alwaysOpenState = false
      }
   }, [])
   function onSearchClick() {
      resultModal.current?.open()
   }
   function onSelectResult(selected, actions) {
      // alert(selected?.title)
      actions && actions.closeModal()
      console.log({ selected })
   }
   console.info({ data, isLoadingBusinesses })
   return (
      <Page showStatusbar={true}>
         <SafeAreaView>
            <ErrorBoundary>
               <MapWidget onChange={onMapChange} onSearchClick={onSearchClick} >
                  {nearbyServices.map((smp, index) => (
                     <Marker
                        {...smp}
                        key={index}
                     >
                        <MapMarker color={smp.color}>
                           <Text>{smp.count}</Text>
                        </MapMarker>
                        <Callout style={{ minHeight: 10, width: 120 }}>
                           <View>
                              <Text>{smp.title}</Text>
                              <Text>{smp.description}</Text>
                           </View>
                        </Callout>
                     </Marker>
                  ))}
               </MapWidget>
            </ErrorBoundary>

            <Portal >
            {isFocused && (
               <Modalize
                  ref={resultModal}
                  alwaysOpen={alwaysOpenState}
                  HeaderComponent={() => (
                     <View style={{ paddingTop: 15, minHeight: 30,  }}>
                        <Toolbar
                           data={nearbyServices}
                           onFilter={onSelectResult}
                           onSearchToggle={() => setOpenSearch(prev => !prev)}
                           />
                        {openSearch && (
                           <>
                           <View style={{ marginTop: 10, marginLeft: 20, marginRight: 11 }}>
                              <FormControl>
                                 <SearchInputControl />
                              </FormControl>
                           </View>
                           <View style={{ flexDirection: 'row' }}>
                              <SearchListHeader />
                           </View>
                           </>
                        )}

                     </View>
                  )}
                  >
                  <Container style={{ marginTop: 15, }}>
                     {/* <Text>{JSON.stringify({data, isLoadingBusinesses })}</Text> */}
                     <FlatList
                        data={data?.data}
                        keyExtractor={row => row.id}
                        ListEmptyComponent={() => (
                           <View>
                              {isLoadingBusinesses && (
                                 <ActivityIndicator />
                              )}
                           </View>
                        )}
                        renderItem={({ item }) => (
                           <View>
                              <Text>{JSON.stringify({ item })}</Text>
                           </View>
                        )}
                     />
                     {/* <FlatList
                        data={nearbyServices}
                        keyExtractor={row => row.id}
                        renderItem={(propw_) => (
                           <NearbyPostCard {...propw_} onPress={_ => navigateToPost(propw_.item)} />
                        )}
                     /> */}
                  </Container>
               </Modalize>
               )}
            </Portal>
         </SafeAreaView>
      </Page>
   )
}
export default connect(state => ({
   location: state.location,
}))(ExploreScreen)
