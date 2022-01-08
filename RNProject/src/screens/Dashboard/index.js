import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Avatar, Center, HStack, View } from 'native-base';
import { Page, } from '@modules/rn-kit';
import { Text } from '@modules/rn-kit/atoms';
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import colors from '@modules/rn-kit/themes/colors';

const styles = StyleSheet.create({
   tabbarItem: {
      borderBottomWidth: 1,
      borderBottomColor: colors.light,
      paddingVertical: 6,
   },
   avatar: {
      position: 'absolute',
      top: '150%',
      left: 15
   }
})
const HeroSection = () => {
   const { width } = useWindowDimensions()
   const banner = useMemo(() => {
      return {
         uri: 'https://picsum.photos/536/354'
      }
   }, [])
   return (
      <View>
         <ImageBackground source={banner} style={{ width, height: 150, position: 'relative' }}>
            <Text color="transparent">Hero </Text>
            <Avatar style={styles.avatar} size={'lg'}  source={require('../../../assets/avatar_placeholder.jpeg')} />
         </ImageBackground>
      </View>
   )
}

const Dashboard = (props) => {
   const { user } = props

   return (
      <Page>
         <HeroSection user={user} />
         <Page.Container style={{ flex: 1, paddingTop: 10, }}>
            <HStack space={4} marginBottom={'10'}>
               <View style={{ width: 60 }} />
               <View>
                  <Text bold fontSize={'lg'}>{user?.name ?? 'Guest'}</Text>
                  {/* <Text fontSize={'xs'} >{user?.email ?? ''}</Text>
                  <Text fontSize={'xs'} >{user?.phone ?? ''}</Text> */}
               </View>
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-evenly'}>
               <View style={styles.tabbarItem}>
                  <Text>Overview</Text>
               </View>
               <View style={styles.tabbarItem}>
                  <Text>Orders</Text>
               </View>
               <View style={styles.tabbarItem}>
                  <Text>Members</Text>
               </View>
               <View style={styles.tabbarItem}>
                  <Text>Activitiy</Text>
               </View>
            </HStack>
         </Page.Container>
      </Page>
   )
}

Dashboard.propTypes = {
   // prop: PropTypes.string
}
Dashboard.defaultProps = {
   // type: 'text'
}
// redux connect with component
const mapStateToProps = (state) => ({
   user: state.auth.user,
})
const mapActionsToProps = (dispatch) => {
   return {
      // action: payload => dispatch({ type: '',... })
   }
}
export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
