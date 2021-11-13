import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator, } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';

import { ThemeContext } from 'styled-components/native';

import { Host } from 'react-native-portalize';
import { linkingConfig } from '../config';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import EditProfileScreen from '../screens/auth/EditProfileScreen';
import PasswordLostScreen from '../screens/auth/PasswordLostScreen';
import PasswordChangeScreen from '../screens/auth/PasswordChangeScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { horizontalAnimation } from './navigationTransitions';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = theme => ({
   // headerShown: false,
   headerTitleStyle: {
      // fontFamily: fonts.primary,
   },

   headerStyle: {
      backgroundColor: 'transparent',

      shadowColor: '#fff',
      elevation: 0,
   },
   headerTintColor: '#4c5561',
   ...horizontalAnimation,
})

const tabBarOptions = {
   // activeTintColor: colors.primary,
   // inactiveTintColor: colors.label,
}
const tabNavOptions = ({ route }) => ({

})

const AuthStack = props => {
   const theme = useContext(ThemeContext)
   return (
      <Stack.Navigator screenOptions={screenOptions(theme)}>
         <Stack.Screen options={{ title: 'Login', headerTitleStyle: { alignSelf: 'center' } }} name="Signin" component={LoginScreen} />
         <Stack.Screen options={{ title: 'Register', }} name="Signup" component={RegisterScreen} />
         <Stack.Screen options={{ title: 'Password Lost?', }} name="PasswordLost" component={PasswordLostScreen} />
         <Stack.Screen options={{ title: 'Change Password',  }} name="PasswordChange" component={PasswordChangeScreen} />
         <Stack.Screen options={{ title: 'Verify Phone',  }} name="VerifyPhone" component={VerifyOTPScreen} />
      </Stack.Navigator>
   )
}

const Navigation = ({ user, loading }) => {
   const userAccountStatus = user?.status

   const FirstScreen = WelcomeScreen
   console.log({
      userAccountStatus,
      FirstScreen,
      user: user
   })

   return (
      <NavigationContainer linking={linkingConfig}>
         <Host>
            <Stack.Navigator >
               {!user ? (
                  <Stack.Screen headerMode="none" options={{ title: '', headerShown: false, }} name="Auth" component={AuthStack} />
               ) : (
                  null
               )}
               <Stack.Screen headerMode="none" name="Home" options={{ headerTransparent: true, title: '',}} component={FirstScreen} />
               <Stack.Screen name="Welcome" options={{ title: '' }} component={WelcomeScreen} />
               <Stack.Screen name="PasswordLost" options={{ title: '' }} component={PasswordLostScreen} />
               <Stack.Screen name="PasswordChange" options={{ title: '' }} component={PasswordChangeScreen} />
               <Stack.Screen name="VerifyPhone" options={{ title: '' }} component={VerifyOTPScreen} />
               <Stack.Screen name="EditProfile" options={{ title: '' }} component={EditProfileScreen} />
            </Stack.Navigator>
         </Host>
      </NavigationContainer>
   );
}

const mapStateToProps = (state) => ({
   user: state.auth.user,
   loading: false
})

export default connect(mapStateToProps)(Navigation)
