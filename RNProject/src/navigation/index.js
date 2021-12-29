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
import ExploreScreen from '@/screens/Explore';
import BottomTabNavigation from './BottomTabNavigation';
import ProfileScreen from '@/screens/User/ProfileScreen';
import NotificationsScreen from '@/screens/User/NotificationsScreen';
import BillingScreen from '@/screens/User/BillingScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = (theme = null) => ({
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
const tabNavOptions = () => {
   return screenOptions()
}

const tabBarOptions = {

}

const AuthStack = ({ theme }) => {
   return (
      <Stack.Navigator screenOptions={screenOptions(theme)}>
         <Stack.Screen options={{ headerShown: false, title: 'Register', }} name="register" component={RegisterScreen} />
         <Stack.Screen options={{ title: '',  }} name="login" component={LoginScreen} />
         <Stack.Screen options={{ title: '', }} name="password_request" component={PasswordLostScreen} />
         <Stack.Screen options={{ title: '',  }} name="password_reset" component={PasswordChangeScreen} />
         <Stack.Screen options={{ title: '',  }} name="verification" component={VerifyOTPScreen} />
      </Stack.Navigator>
   )
}

const HomeStack = props => {
   const theme = useTheme()
   return (
      <Tabs.Navigator
         tabBar={_props => <BottomTabNavigation {..._props} />}
         screenOptions={tabNavOptions()}
      >
         <Tabs.Screen
            options={{title: '', headerLeft: () => null}}
            name="home"
            component={HomeScreen}
         />
         <Tabs.Screen
            options={{title: ''}}
            name="explore"
            component={ExploreScreen}
         />
         <Tabs.Screen
            options={{title: ''}}
            name="dashboard"
            component={HomeScreen}
         />
         <Tabs.Screen
            options={{title: 'Notifications'}}
            name="notifications"
            component={NotificationsScreen}
         />
         {/* <Tabs.Screen
            options={{title: 'My Profile'}}
            name="profile"
            component={ProfileScreen}
         /> */}
      </Tabs.Navigator>
   );
};

const Navigation = ({ user, loading }) => {
   const theme = useTheme()
   const LaunchScreen = WelcomeScreen
   const isAuthenticated = useMemo(() => {
      return user
      // return false
   }, [ user ])

   if (!isAuthenticated) {
      <SafeAreaProvider>
         <NavigationContainer linking={linkingConfig}>
            <Host>
               <Stack.Navigator screenOptions={screenOptions(theme)}>
                  <Stack.Screen headerMode="none" name="welcome" options={{ title: '', headerShown: false }} component={LaunchScreen} />
                  <Stack.Screen
                     headerMode="none"
                     options={{ title: '', headerShown: false }}
                     name="auth"
                     component={AuthStack}
                  />
               </Stack.Navigator>
            </Host>
         </NavigationContainer>
      </SafeAreaProvider>
   }

   return (
      <SafeAreaProvider>
         <NavigationContainer linking={linkingConfig}>
            <Host>
               <Stack.Navigator screenOptions={screenOptions(theme)}>
                  <Stack.Screen name="home" options={{ title: '', headerShown: false }} component={HomeStack} />
                  <Stack.Screen name="password_request" options={{ title: '' }} component={PasswordLostScreen} />
                  <Stack.Screen name="password_reset" options={{ title: '' }} component={PasswordChangeScreen} />
                  <Stack.Screen name="verification" options={{ title: '' }} component={VerifyOTPScreen} />
                  <Stack.Screen name="profile" options={{ title: '' }} component={ProfileScreen} />
                  <Stack.Screen name="billing" options={{ title: '' }} component={BillingScreen} />
                  <Stack.Screen name="profile.edit" options={{ title: '' }} component={EditProfileScreen} />
                  <Stack.Screen name="profile.changePassword" options={{ title: '' }} component={PasswordChangeScreen} />
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
