import React from 'react'
import TeamSignupScreen from "./TeamSignupScreen";
import VerifyPhoneScreen from "./VerifyPhoneScreen";

const TeamRegistrationStack = ({ Stack }) => {
   return (
      <Stack.Navigator>
         <Stack.Screen name={"Register"} component={TeamSignupScreen} />
         <Stack.Screen name={"VerifyPhone"} component={VerifyPhoneScreen} />
         <Stack.Screen name={"VerifyEmail"} component={VerifyPhoneScreen} />
      </Stack.Navigator>
   )
}

export default TeamRegistrationStack
