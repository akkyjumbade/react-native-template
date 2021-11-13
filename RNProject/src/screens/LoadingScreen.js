import React from 'react'
import Page from '@/components/layouts/Page'
import Text from '@rn-kit/atoms/Text'
import ButtonPrimary from '@rn-kit/atoms/ButtonPrimary'

const LoadingScreen = (props) => {
   //
   return (
      <Page>
         <Text>Loading...</Text>
         <ButtonPrimary title={'Login'} />
      </Page>
   )
}

LoadingScreen.propTypes = {
   // prop: PropTypes.string
}

LoadingScreen.defaultProps = {
   type: 'text'
}

export default LoadingScreen
