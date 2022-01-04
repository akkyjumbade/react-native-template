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
import EditProfileScreen from '../screens/User/EditProfileScreen';
import PasswordLostScreen from '../screens/Auth/PasswordLostScreen';
import PasswordChangeScreen from '../screens/Auth/PasswordChangeScreen';
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
import NotificationsPreferenceScreen from '@/screens/User/NotificationsPreferenceScreen';
import VerificationScreen from '@/screens/Auth/VerifyOTPScreen';
import Dashboard from '@/screens/Dashboard';
import WebviewScreen from '@/screens/WebviewScreen';
import AddressFormScreen from '@/screens/User/AddressFormScreen';
import AboutScreen from '@/screens/AboutScreen';
import MinimalNavHeader from './MinimalNavHeader';
import SettingsScreen from '@/screens/Settings/SettingsScreen';
import SecurityDashboardScreen from '@/screens/User/SecurityDashboardScreen';
import ReferScreen from '@/screens/User/ReferScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = (theme = null) => {
   console.log({ theme })
   return {
      // headerShown: false,
      headerTitleStyle: {
         fontFamily: fonts.heading,
      },
      // headerTransparent: true,
      headerStyle: {
         backgroundColor: theme?.colors?.pageBg ?? 'gray',
         shadowColor: '#fff',
         elevation: 0,
      },
      headerTintColor: '#4c5561',
      ...horizontalAnimation,
   }
}
const tabNavOptions = (args) => {
   return {
      ...screenOptions(),
      ...args
   }
}

const tabBarOptions = {

}

const AuthStack = () => {
   const theme = useTheme()
   return (
      <Stack.Navigator screenOptions={screenOptions(theme)}>
         <Stack.Screen options={{ headerShown: false, title: 'Register', }} name="register" component={RegisterScreen} />
         <Stack.Screen options={{ title: '',  }} name="login" component={LoginScreen} />
         <Stack.Screen options={{ title: '', }} name="password_request" component={PasswordLostScreen} />
         <Stack.Screen options={{ title: '',  }} name="password_reset" component={PasswordChangeScreen} />
         <Stack.Screen options={{ title: '',  }} name="verification" component={VerificationScreen} />
      </Stack.Navigator>
   )
}

const HomeStack = props => {
   const theme = useTheme()
   let defaultNavOptions = {
      headerStyle: {
         backgroundColor: theme?.colors?.pageBg ?? 'gray',
      },
   }
   return (
      <Tabs.Navigator
         tabBar={_props => <BottomTabNavigation {..._props} />}
         screenOptions={tabNavOptions({ headerShow: false, ...defaultNavOptions })}
      >
         <Tabs.Screen
            options={{title: 'Welome guest', headerShown: true }}
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

const RootNavigator = props => (
   <Stack.Navigator
      mode="modal"
      screenOptions={{
         ...screenOptions(),
         headerShown: false
      }}>
      {props.children}
   </Stack.Navigator>
)

const Navigation = ({ user, loading }) => {
   const theme = useTheme()
   const LaunchScreen = WelcomeScreen
   const isAuthenticated = useMemo(() => {
      return user
      // return false
      // sdf
   }, [ user ])
   console.log({ isAuthenticated })

   if (!isAuthenticated) {
      return (
         <SafeAreaProvider>
            <NavigationContainer linking={linkingConfig}>
               <Host>
                  <RootNavigator>
                     <Stack.Screen headerMode="none" name="welcome" options={{ title: '', headerShown: false }} component={LaunchScreen} />
                     <Stack.Screen
                        headerMode="none"
                        options={{ title: '', headerShown: false }}
                        name="auth"
                        component={AuthStack}
                     />
                  </RootNavigator>
               </Host>
            </NavigationContainer>
         </SafeAreaProvider>
      )
   }

   return (
      <SafeAreaProvider>
         <NavigationContainer linking={linkingConfig}>
            <Host>
               <Stack.Navigator screenOptions={screenOptions(theme)}>
                  <Stack.Screen name="index" options={{ title: '', headerShown: false }} component={HomeStack} />
                  <Stack.Screen name="dashboard" options={{ title: '', headerShown: false }} component={Dashboard} />
                  <Stack.Screen name="password_request" options={{ title: '' }} component={PasswordLostScreen} />
                  <Stack.Screen name="password_reset" options={{ title: '' }} component={PasswordChangeScreen} />
                  <Stack.Screen name="verification" options={{ title: '' }} component={VerificationScreen} />
                  <Stack.Screen name="profile" options={{ title: '' }} component={ProfileScreen} />
                  <Stack.Screen name="billing" options={{ title: '' }} component={BillingScreen} />
                  <Stack.Screen name="security" options={{ title: '' }} component={SecurityDashboardScreen} />
                  <Stack.Screen name="refer" options={{ title: '' }} component={ReferScreen} />
                  <Stack.Screen name="page" options={{ headerShown: true, title: '' }} component={WebviewScreen} />
                  <Stack.Screen name="preferences" options={{ title: '' }} component={SettingsScreen} />
                  <Stack.Screen name="preferences.notifications" options={{ title: '' }} component={NotificationsPreferenceScreen} />
                  <Stack.Screen name="address.add" options={{ title: '' }} component={AddressFormScreen} />
                  <Stack.Screen name="profile.info" options={{ title: '' }} component={EditProfileScreen} />
                  <Stack.Screen name="profile.edit" options={{ title: '' }} component={EditProfileScreen} />
                  <Stack.Screen name="profile.change_password" options={{ title: '' }} component={PasswordChangeScreen} />
                  <Stack.Screen name="about" options={{ title: '' }} component={AboutScreen} />
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
