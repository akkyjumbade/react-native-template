import React, {  useMemo } from 'react'
import styled from "styled-components/native";
import chunk from 'lodash/chunk'
import { View } from 'react-native';
import PropTypes from 'prop-types'

const StyledGrid = styled.View`
   flex-wrap: wrap;
   width: 100%;
`
export const Grid_Row = styled.View`
   flex-direction: row;
   flex: 1;
`
export const Grid_Col = styled.View`
   background-color: #0000;
   align-content: center;
   flex: 1;
`


export default function Grid(props) {
   const { items, render, colsPerRow = 1 } = props
   const chunkedItems = useMemo(() => {
      return chunk(items, colsPerRow)
   }, [items, colsPerRow])

   if (!items) {
      return (
         null
      );
   }

   return (
      <View {...props}>
         <StyledGrid>
            {chunkedItems && chunkedItems.map((rows, rowsk) => (
               <Grid_Row key={rowsk}>
                  {rows && rows.map((row, rowk) => (
                     <Grid_Col key={rowk}>
                        {render && render(row, rowk)}
                     </Grid_Col>
                  ))}
               </Grid_Row>
            ))}
         </StyledGrid>
      </View>
   )
}

Grid.propTypes = {
   items: PropTypes.arrayOf(PropTypes.object).isRequired,
   colsPerRow: PropTypes.number,
   render: PropTypes.func,
}
