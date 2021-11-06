import React, { useContext, useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator, } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import { colors } from '../style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fonts, } from '../style';

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
import ExploreScreen from '../screens/ExploreScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const horizontalAnimation = {
   gestureDirection: 'horizontal',
   cardStyleInterpolator: ({ current, layouts }) => {
      return {
         cardStyle: {
            transform: [
               {
                  translateX: current.progress.interpolate({
                     inputRange: [0, 1],
                     outputRange: [layouts.screen.width, 0],
                  }),
               },
            ],
         },
      };
   },
};
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
         <Stack.Screen options={{ tteaitle: 'Change Password',  }} name="PasswordChange" component={PasswordChangeScreen} />
         <Stack.Screen options={{ title: 'Verify Phone',  }} name="VerifyPhone" component={VerifyOTPScreen} />
      </Stack.Navigator>
   )
}

const Navigation = () => {
   const user = useSelector(state => state.auth.user)
   const theme = useContext(ThemeContext)
   const userAccountStatus = user?.status

   const FirstScreen = userAccountStatus === 'active' ? ExploreScreen : WelcomeScreen
   console.log({
      userAccountStatus,
      FirstScreen,
      user: user
   })

   return (
      <NavigationContainer linking={linkingConfig}>
         <Host>
            <Stack.Navigator screenOptions={screenOptions(theme)}>
               {!user ? (
                  <Stack.Screen headerMode="none" options={{ title: '', headerShown: false, }} name="Auth" component={AuthStack} />
               ) : (
                  <Stack.Screen headerMode="none" name="Home" options={{ headerTransparent: true, title: '',}} component={FirstScreen} />
               )}

               <Stack.Screen options={{ title: '' }} name="Home" component={WelcomeScreen} />
               <Stack.Screen options={{ title: '',  }} name="PasswordLost" component={PasswordLostScreen} />
               <Stack.Screen options={{ title: '',  }} name="PasswordChange" component={PasswordChangeScreen} />
               <Stack.Screen options={{ title: '',  }} name="VerifyPhone" component={VerifyOTPScreen} />
               <Stack.Screen options={{ title: '',  }} name="EditProfile" component={EditProfileScreen} />
            </Stack.Navigator>
         </Host>
      </NavigationContainer>
   );
}

export default Navigation
