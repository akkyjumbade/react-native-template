import React, { useContext, useEffect, useState } from 'react'
import 'react-native-gesture-handler';

import { createStackNavigator, } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';

import About from '../pages/About';
import Contact from '../pages/Contact';
import LegalScreen from '../pages/LegalScreen';
import OffersScreen from 'ecommerce/src/screens/OffersScreen';
import MyProfileScreen from '../pages/MyProfileScreen';
import DashboardScreen from '../pages/DashboardScreen';
import ShopScreen from 'ecommerce/src/screens/ShopScreen';
import HomeNavigationBar from './HomeNavigationBar';
import WalkthroughScreen from '../pages/WalkthroughScreen';
import { connect, useSelector } from 'react-redux';
import PostInfo from '../pages/PostInfo';
import CatalogueCategory from 'ecommerce/src/screens/CatalogueCategory';
import ItemScreen from 'ecommerce/src/screens/ItemScreen';
import PaymentGatewayScreen from 'checkout/src/pages/PaymentGatewayScreen';
import CartScreen from 'ecommerce/src/screens/CartScreen';
import CheckoutScreen from 'ecommerce/src/screens/CheckoutScreen';
import CheckoutGateway from '../pages/CheckoutGateway';
import AddressForm from '../pages/AddressForm';
// import GeoLocationScreen from 'auth/src/screens/GeoLocationScreen';
import NotificationsScreen from 'auth/src/screens/NotificationsScreen';
import BottomTabNavigation from './BottomTabNavigation';
import { colors } from '../style/style';
import OrdersScreen from 'ecommerce/src/screens/OrdersScreen';
import My_Addresses from '../pages/account/My_Addresses';
import WishlistScreen from 'ecommerce/src/screens/WishlistScreen';
import OrderDetailScreen from 'ecommerce/src/screens/OrderDetailScreen';
import OrderTrackingScreen from 'ecommerce/src/screens/OrderTrackingScreen';
// auth pages
import EditProfileScreen from 'auth/src/screens/EditProfileScreen';
import SigninScreen from 'auth/src/screens/SigninScreen';
import SignupScreen from 'auth/src/screens/SignupScreen';
import PasswordLostScreen from 'auth/src/screens/PasswordLostScreen';
import PasswordChangeScreen from 'auth/src/screens/PasswordChangeScreen';
import VerifyPhoneScreen from 'auth/src/screens/VerifyPhoneScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingsScreen from '../pages/SettingsScreen';
import PermissionsScreen from '../pages/PermissionsScreen';
import MyRewardsScreen from '../pages/account/MyRewardsScreen';
import { fonts, themes } from '../style';
import MySessionsScreen from 'auth/src/screens/MySessionsScreen';
import CancelOrderScreen from 'ecommerce/src/screens/CancelOrderScreen';
import HomeScreen from '../pages/HomeScreen';
import TeamSignupScreen from '../../pkgs/auth/src/screens/TeamSignupScreen';
import PostsScreen from "../components/posts/PostsScreen";
import PostScreen from "../components/posts/PostScreen";
import PostReviewsScreen from "../components/posts/PostReviewsScreen";
import CategoryChoiceScreen from "../pages/CategoryChoiceScreen";
import ExploreScreen from "../pages/ExploreScreen";
import MenusScreen from '../pages/MenusScreen';
import MarketScreen from '../pages/MarketScreen';
import PostReportScreen from '../components/posts/PostReportScreen';
import CountryPickerScreen from 'auth/src/screens/CountryPickerScreen';
import CurrencyPickerScreen from 'auth/src/screens/CurrencyPickerScreen';
import LinkedAccountsScreen from "auth/src/screens/LinkedAccountsScreen";
import SavedCollectionScreen from "auth/src/screens/SavedCollectionScreen";
import TeamsScreen from "auth/src/screens/TeamsScreen";
import TeamScreen from "auth/src/screens/TeamScreen";
import TeamMembersScreen from "auth/src/screens/TeamMembersScreen";
import TeamRegistrationStack from "auth/src/screens/TeamRegistrationStack";
import ExploreNearbyScreen from '../pages/ExploreNearbyScreen';
import HeaderBackButton from '../components/HeaderBackButton'
import { ThemeContext } from 'styled-components/native';

import MinimalNavHeader from './MinimalNavHeader'
import MapHeaderNavigation from './MapHeaderNavigation';
import { Host } from 'react-native-portalize';
import GlobalStyles from '../GlobalStyles';
import { linkingConfig } from '../config';
import { Text } from '../../pkgs/uikit';
import WelcomeScreen from '../pages/WelcomeScreen';

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
   headerTitleStyle: {
      fontFamily: fonts.primary,
   },
   headerStyle: {
      backgroundColor: theme.colors?.primary,
      shadowColor: '#fff',
      elevation: 0,
   },
   headerTintColor: '#4c5561',
   ...horizontalAnimation,
})

const tabBarOptions = {
   activeTintColor: colors.primary,
   inactiveTintColor: colors.label,
}
const tabNavOptions = ({ route }) => ({
   // tabBarIcon: ({ focused, color, size }) => {
   //    let iconName;

   //    if (route.name === 'Home') {
   //       iconName = focused
   //          ? 'ios-information-circle'
   //          : 'ios-information-circle-outline';
   //    } else if (route.name === 'Settings') {
   //       iconName = focused ? 'ios-list-box' : 'ios-list';
   //    }

   //    // You can return any component that you like here!
   //    return <Ionicons name={iconName} size={size} color={color} />;
   // },
})
const AuthStack = props => {
   const theme = useContext(ThemeContext)
   return (
      <Stack.Navigator screenOptions={screenOptions(theme)}>
         <Stack.Screen options={{ title: 'Login', headerTitleStyle: { alignSelf: 'center' } }} name="Signin" component={SigninScreen} />
         <Stack.Screen options={{ title: 'Register', }} name="Signup" component={SignupScreen} />
         <Stack.Screen options={{ title: '', }} name="TeamSignup" component={TeamSignupScreen} />
         <Stack.Screen options={{ title: '', }} name="PasswordLost" component={PasswordLostScreen} />
         <Stack.Screen options={{ tteaitle: '',  }} name="PasswordChange" component={PasswordChangeScreen} />
         <Stack.Screen options={{ title: '',  }} name="VerifyPhone" component={VerifyPhoneScreen} />
      </Stack.Navigator>
   )
}
const HomeStack = props => (
   <Tabs.Navigator headerMode="none" tabBar={(_props) => <BottomTabNavigation {..._props} />} screenOptions={tabNavOptions} tabBarOptions={tabBarOptions}>
      <Tabs.Screen options={{ title: 'Home', }} name="Welcome" component={ExploreScreen} />
      <Tabs.Screen options={{ title: 'Store', }} name="Catalogue" component={ShopScreen} />
      <Tabs.Screen options={{ title: 'My Wallet', }} name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen options={{ title: 'My Profile', }} name="MyProfile" component={MyProfileScreen} />
   </Tabs.Navigator>
)

const ECommerceStack = props => (
   <Stack.Navigator  headerMode="none">
      <Stack.Screen options={{ title: 'Deals near me' }} name={'Market'} component={MarketScreen} />
      <Stack.Screen options={{ title: '' }} name={'Shop'} component={ShopScreen} />
      <Stack.Screen options={{ title: '' }} name={'ShopCategory'} component={CatalogueCategory} />
      <Stack.Screen options={{ title: '' }} name={'Item'} component={ItemScreen} />
      {/*<Stack.Screen name={'Item'} component={ItemScreen} />*/}
   </Stack.Navigator>
)

const PostsStack = props => (
   <Stack.Navigator headerMode="none" >
      <Stack.Screen name={'Posts'} component={PostsScreen} />
      <Stack.Screen name={'Post'} component={PostScreen} />
      <Stack.Screen name={'PostReviews'} component={PostReviewsScreen} />
      <Stack.Screen name={'PostReport'} component={PostReportScreen} />
   </Stack.Navigator>
)

// const TeamRegistrationStack
const TeamStack = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name="TeamRegister" component={TeamSignupScreen} />
         <Stack.Screen name="Teams" component={TeamsScreen} />
         <Stack.Screen name="Team" component={TeamScreen} />
         {/* <Stack.Screen name="TeamMembers" />
         <Stack.Screen name="TeamMemberAdd" />
         <Stack.Screen name="TeamMemberEdit" /> */}
      </Stack.Navigator>
   )
}

const Navigation = (_props) => {
   const [isLoggedin, setIsLoggedIN] = useState(() => Boolean(_props.user))
   const theme = useContext(ThemeContext)
   useEffect(() => {
      setIsLoggedIN(Boolean(_props.user))
   }, [ _props.user ])
   const userAccountStatus = _props.user?.status

   const FirstScreen = userAccountStatus == 'active' ? ExploreScreen : WelcomeScreen
   console.log({
      userAccountStatus,
      FirstScreen,
      user: _props.user
   })

   if (!isLoggedin) {
      return (
         <SafeAreaProvider>
            <NavigationContainer linking={linkingConfig}>
               <Host>
                  <Stack.Navigator screenOptions={screenOptions(theme)}>
                     <Stack.Screen headerMode="none" options={{ title: '', headerShown: false, }} name="Auth" component={AuthStack} />
                  </Stack.Navigator>
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
                  {!isLoggedin ? (
                     <Stack.Screen headerMode="none" options={{ title: '', headerShown: false, }} name="Auth" component={AuthStack} />
                  ) : (
                     <Stack.Screen headerMode="none" name="Home" options={{ headerTransparent: true, header: (pageProps) => <MapHeaderNavigation {...pageProps} />, title: '',}} component={FirstScreen} />
                  )}

                  <Stack.Screen options={{ title: '' }} name="Menus" component={MenusScreen} />
                  <Stack.Screen options={{ title: 'About' }} name="About" component={About} />
                  <Stack.Screen options={{ title: 'Contact' }} name="Contact" component={Contact} />
                  <Stack.Screen options={{ title: 'Legal' }} name="Legal" component={LegalScreen} />
                  <Stack.Screen options={{ title: '' }} name="PostInfo" component={PostInfo} />
                  {/* <Stack.Screen headerMode="none" options={{ title: '' }} name="GeoLocation" component={GeoLocationScreen} /> */}
                  <Stack.Screen options={{ title: '' }} name="CatalogueCategory" component={CatalogueCategory} />
                  <Stack.Screen headerMode="none" options={{ title: 'Deals Near Me' }} name={'Market'} component={ECommerceStack} />
                  {/*<Stack.Screen options={{ title: '' }} name="Item" component={ItemScreen} />*/}
                  <Stack.Screen options={{ title: 'My Cart' }} name="Cart" component={CartScreen} />
                  <Stack.Screen options={{ title: '' }} name="Checkout" component={CheckoutScreen} />
                  <Stack.Screen options={{ title: '',  }} name="Offers" component={OffersScreen} />
                  <Stack.Screen options={{ title: '',  }} name="CheckoutPayment" component={CheckoutGateway} />
                  {/* account pages */}
                  <Stack.Screen options={{ title: '',  }} name="MySessions" component={MySessionsScreen} />
                  <Stack.Screen options={{ title: '',  }} name="My_Addresses" component={My_Addresses} />
                  <Stack.Screen options={{ title: '',  }} name="Wishlist" component={WishlistScreen} />
                  <Stack.Screen options={{ title: '',  }} name="My_Orders" component={OrdersScreen} />
                  <Stack.Screen options={{ title: 'Cancel order?',  }} name="CancelOrder" component={CancelOrderScreen} />
                  <Stack.Screen options={{ title: '',  }} name="TrackOrder" component={OrderTrackingScreen} />
                  <Stack.Screen options={{ title: '',  }} name="Notifications" component={NotificationsScreen} />
                  <Stack.Screen options={{ title: '',  }} name="MyRewards" component={MyRewardsScreen} />
                  <Stack.Screen options={{ title: '',  }} name="Permissions" component={PermissionsScreen} />
                  <Stack.Screen options={{ title: '',  }} name="Order" component={OrderDetailScreen} />
                  <Stack.Screen options={{ title: '',  }} name="PaymentGateway" component={PaymentGatewayScreen} />
                  <Stack.Screen options={{ title: 'Preferences',  }} name="Settings" component={SettingsScreen} />
                  <Stack.Screen headerMode="none" options={{ title: '',  }} name="Blog" component={PostsStack} />
                  {/* profile update */}
                  <Stack.Screen options={{ title: '',  }} name="PasswordLost" component={PasswordLostScreen} />
                  <Stack.Screen options={{ title: '',  }} name="PasswordChange" component={PasswordChangeScreen} />
                  <Stack.Screen options={{ title: '',  }} name="VerifyPhone" component={VerifyPhoneScreen} />
                  <Stack.Screen options={{ title: '',  }} name="EditProfile" component={EditProfileScreen} />
                  <Stack.Screen options={{ title: '' }} name="AddressForm" component={AddressForm} />
                  <Stack.Screen options={{ title: '' }} name="LinkedAccounts" component={LinkedAccountsScreen} />
                  <Stack.Screen options={{ title: '' }} name="SavedCollection" component={SavedCollectionScreen} />
                  {/* <Stack.Screen options={{ title: '' }} name="Teams" component={TeamsScreen} /> */}
                  <Stack.Screen header="none" headerMode="none" options={{ header: () => null, title: '' }} name="TeamStack" component={TeamStack} />
                  <Stack.Screen options={{ title: '' }} name="TeamMembers" component={TeamMembersScreen} />
                  <Stack.Screen header="none" headerMode="none" options={{ title: 'Explore Nearby', header: __props => (<MinimalNavHeader {...__props} /> )  }} name="Explore" component={ExploreNearbyScreen} />



                  <Stack.Screen options={{ title: 'Choose country' }} name="CountryPicker" component={CountryPickerScreen} />
                  <Stack.Screen options={{ title: 'Choose currency' }} name="CurrencyPicker" component={CurrencyPickerScreen} />
                  <Stack.Screen options={{ title: '', }} name="Dashboard" component={DashboardScreen} />
                  <Stack.Screen options={{ title: '', }} name="MyProfile" component={MyProfileScreen} />
                  <Stack.Screen options={{ title: '', }} name="Choice" component={CategoryChoiceScreen} />
               </Stack.Navigator>
            </Host>
         </NavigationContainer>
      </SafeAreaProvider>
   );
}

export default connect(state => ({
   user: state.auth.user,
   config: state.config
}))(Navigation)
