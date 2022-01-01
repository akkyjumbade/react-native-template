import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Center } from 'native-base';
import { Page, Text } from '@modules/rn-kit';

const Dashboard = (props) => {
   const { user } = props

   return (
      <Page>
         <Center style={{ flex: 1, }}>

            <Text>Dashboard</Text>
         </Center>
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
