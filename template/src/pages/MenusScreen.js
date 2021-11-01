import React from 'react'
import { connect } from 'react-redux'
import { Title } from 'uikit'
import { Container } from 'uikit'
import { Text } from 'uikit'
import { Page } from 'uikit'

const MenusScreen = props => {
   return (
      <Page>
         <Container>
            <Title>Menus</Title>
            <Text>Menus here</Text>
         </Container>
      </Page>
   )
}

export default connect(state => ({
   menus: state.config
}))(MenusScreen)
