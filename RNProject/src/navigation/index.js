import React, { Fragment, memo, useContext, useEffect, useMemo, useState } from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator, } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';

import { ThemeContext } from 'styled-components/native';

import { Host } from 'react-native-portalize';
import { linkingConfig } from '../config';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import EditProfileScreen from '../screens/Auth/EditProfileScreen';
import PasswordLostScreen from '../screens/Auth/PasswordLostScreen';
import PasswordChangeScreen from '../screens/Auth/PasswordChangeScreen';
import VerifyOTPScreen from '../screens/Auth/VerifyOTPScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { horizontalAnimation } from './navigationTransitions';
import { fonts } from '@modules/rn-kit/themes';
import { useTheme } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '@/screens/Home';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = theme => ({
   // headerShown: false,
   headerTitleStyle: {
      fontFamily: fonts.heading,
   },
   // headerTransparent: true,
   headerStyle: {
      backgroundColor: 'white',
      shadowColor: '#fff',
      elevation: 0,
   },
   headerTintColor: '#4c5561',
   ...horizontalAnimation,
})

const AuthStack = ({ theme }) => {
   return (
      <Stack.Navigator screenOptions={screenOptions(theme)}>
         <Stack.Screen options={{ headerShown: false, title: 'Register', }} name="register" component={RegisterScreen} />
         <Stack.Screen options={{ title: '',  }} name="login" component={LoginScreen} />
         <Stack.Screen options={{ title: 'Password Lost?', }} name="password_request" component={PasswordLostScreen} />
         <Stack.Screen options={{ title: 'Change Password',  }} name="password_reset" component={PasswordChangeScreen} />
         <Stack.Screen options={{ title: 'Verify Phone',  }} name="verification" component={VerifyOTPScreen} />
      </Stack.Navigator>
   )
}

const Navigation = ({ user, loading }) => {
   const theme = useTheme()
   const LaunchScreen = WelcomeScreen
   const isAuthenticated = useMemo(() => {
      return user
      // return false
   }, [ user ])

   return (
      <SafeAreaProvider>
         <NavigationContainer linking={linkingConfig}>
            <Host>
               <Stack.Navigator screenOptions={screenOptions(theme)}>
                  <Stack.Screen headerMode="none" name="home" options={{ title: '', headerShown: false }} component={LaunchScreen} />
                  {!isAuthenticated ? (
                     <Stack.Screen
                        headerMode="none"
                        options={{ title: '', headerShown: false }}
                        name="auth"
                        component={AuthStack}
                     />
                  ) : (
                     <Fragment>
                        <Stack.Screen headerMode="none" name="home" options={{ headerTransparent: true, title: '',}} component={LaunchScreen} />
                        <Stack.Screen name="welcome" options={{ title: '' }} component={HomeScreen} />
                        <Stack.Screen name="PasswordLost" options={{ title: '' }} component={PasswordLostScreen} />
                        <Stack.Screen name="PasswordChange" options={{ title: '' }} component={PasswordChangeScreen} />
                        <Stack.Screen name="VerifyPhone" options={{ title: '' }} component={VerifyOTPScreen} />
                        <Stack.Screen name="EditProfile" options={{ title: '' }} component={EditProfileScreen} />
                     </Fragment>
                  )}
               </Stack.Navigator>
            </Host>
         </NavigationContainer>
      </SafeAreaProvider>
   );
}

const mapStateToProps = (state) => ({
   user: state.auth.user,
   loading: false
})

export default connect(mapStateToProps)(Navigation)
