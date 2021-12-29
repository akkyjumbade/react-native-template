import React, { Fragment } from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

const StyledContainer = styled.View`
   flex-direction: column;
   padding: 0 ${props => props.padding}px;
`
export default function Container({ flex = false, children, ...props }) {
   return (
      <StyledContainer {...props}>
         {children}
      </StyledContainer>
   )
}


Container.propTypes = {
   flex: PropTypes.bool,
   padding: PropTypes.number
}
Container.defaultProps = {
   flex: false,
   padding: 15
}
