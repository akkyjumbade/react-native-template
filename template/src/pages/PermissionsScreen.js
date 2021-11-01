import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'uikit'
import { Page } from 'uikit'
import { Title } from 'uikit/src/atoms/Text'

const PermissionsScreen = props => {
   return (
      <Page>
         <Container>
            <Title>Permissions</Title>
         </Container>
      </Page>
   )
}

export default connect(state => ({

}))(PermissionsScreen)
