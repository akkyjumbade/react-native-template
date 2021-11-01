import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const MARKER_SIZE = 33
const StyledMarker = styled.View`
   background-color: ${props => props.color ? props.color : props.theme.colors.primary};
   border-radius: 1000px;
   width: ${MARKER_SIZE};
   height: ${MARKER_SIZE};
   align-items: center;
   justify-content: center;

`
const MapMarker = (props) => {
   //
   return (
      <StyledMarker {...props}>
         {props.children}
      </StyledMarker>
   )
}

MapMarker.propTypes = {
   label: PropTypes.string,
}

MapMarker.defaultProps = {
   label: 'Marker label'
}

export default MapMarker
