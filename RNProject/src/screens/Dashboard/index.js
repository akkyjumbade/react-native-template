import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Center, HStack, View, VStack } from 'native-base';
import Page from '@modules/rn-kit/layouts/Page';
import { Text } from '@modules/rn-kit/atoms';
import { StyleSheet } from 'react-native';
import { SCREEN } from '@/config';
import { Col, Grid, Row } from 'react-native-easy-grid';
import Card from '@/components/Card';

const styles = StyleSheet.create({
   banner: {
      width: SCREEN.width,
      height: 150,
      backgroundColor: 'gray'
   }
})
const HeroSection = () => {
   return (
      <View style={styles.banner}>

      </View>
   )
}

const Dashboard = (props) => {
   const { user } = props

   return (
      <Page scroll={false}>
         <HeroSection />
         <Page.Container style={{ marginTop: 20, marginBottom: 20  }}>
            <VStack space={3}>
               <HStack space={3}>
                  <Card center flex title={'Orders'} />
                  <Card center flex title={'Rewards'} />
               </HStack>
               <HStack space={3}>
                  <Card center flex title={'Cart'} />
                  <Card center flex title={'Wishlist'} />
               </HStack>
            </VStack>
         </Page.Container>
         <Page.Container>
            <Text heading>Recent</Text>
         </Page.Container>
         {/* <Center style={{ flex: 1, }}>
            <Text>Dashboard</Text>
         </Center> */}
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
