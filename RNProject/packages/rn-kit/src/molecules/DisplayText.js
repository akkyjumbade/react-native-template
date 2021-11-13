import React, { useMemo } from 'react'
import { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Text } from '../..'
import ErrorBoundary from '../../../../src/components/ErrorBoundary'

const currencies = {
   INR: '\u20B9',
   EUR: '\u20AC',
   USD: '$',
}

const styles = StyleSheet.create({
   text: {
      flexDirection: 'row',
      alignItems: 'center',
   }
})

function formatAndDisplayOutput(value, format = 'text') {
   const locale = 'en-GB'
  try {
     let result = value
      const numFormat = Intl.NumberFormat(locale)
      const dateFormat = Intl.DateTimeFormat(locale, {
         weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      })
      let parsedDate = Date.parse(value)
      switch (format) {
         case 'datetime':
         case 'date':
            result = parsedDate ? dateFormat.format(parsedDate) : value
            break;
         case 'number':
         case 'float':
         case 'int':
            result = value ? numFormat.format(value) : value
            break;
         case 'bucks':
         case 'buck':
            result = value ? numFormat.format(value) : value
            result = result
            break;
         case 'badge':
         case 'label':
            result = value?.toUpperCase()
            break;
         default:
            break;
      }
      return result
   } catch (error) {
     return value
   }
}

const DisplayText = ({ value, format, currency, dateFormat, ...rest }) => {
   const displayText = useMemo(() => {
      return formatAndDisplayOutput(value, format)
   }, [ value, format ])
   let { prefix, suffix } = rest

   if (format === 'bucks') {
      // add prefix for currency symbol
      // prefix = currencies[currency] ?? ''
      prefix = currencies.EUR
   }

   return (
      <ErrorBoundary>
         <View style={[styles.text]}>
            {/* {prefix ? (
               <Text>{prefix}</Text>
            ) : null} */}
            <Text {...rest} style={{ }} direction="right">{displayText}</Text>
            {prefix ? (
               <Text>{prefix}</Text>
            ) : null}
            {/* {suffix ? (
               <Text>{suffix}</Text>
            ) : null} */}
         </View>
      </ErrorBoundary>
   )
}


export default connect(state => ({
   currency: state.config.currency ? state.config.currency : 'USD',
   dateFormat: state.config.dateFormat,
   timeFormat: state.config.timeFormat,
}))(DisplayText)
