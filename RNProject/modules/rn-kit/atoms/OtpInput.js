import React from 'react'
import { StyleSheet } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'

export default function OtpInput({ value, onChange, }) {
   return (
      <OTPInputView
         style={{ width: '100%', height: 45 }}
         pinCount={6}
         // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
         // onCodeChanged = {code => { this.setState({code})}}
         autoFocusOnLoad
         code={value}
         codeInputFieldStyle={styles.underlineStyleBase}
         codeInputHighlightStyle={styles.underlineStyleHighLighted}
         onCodeFilled={(code => {
            onChange && onChange(code)
            console.log(`Code is ${code}, you are good to go!`)
         })}
      />
   )
}


const styles = StyleSheet.create({
   borderStyleBase: {
      width: 40,
      // height: 45
   },

   borderStyleHighLighted: {
      borderColor: "#03DAC6",
   },

   underlineStyleBase: {
      width: 40,
      // height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: 'lightgray'
   },

   underlineStyleHighLighted: {
      borderColor: "#03DAC6",
   },
});
