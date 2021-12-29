import { Dimensions } from "react-native";

export const SERVER_URL = '';
export const SCREEN = Dimensions.get('window')
export const GCP_API_KEY = 'AIzaSyCl4VjPXxr36NWtyK1u1lnSK6zI3PhxrVE'

export const LOGO_PATH = '../../assets/logo/logo@1080x1080.png'

export const FIREBASE_CONFIG = {
   apiKey: "AIzaSyD6BddktNOzTwsXH7KFA03tKObmtqjM9Gc",
   // authDomain: "project-id.firebaseapp.com",
   // databaseURL: "https://project-id.firebaseio.com",
   projectId: "quickstart-1558144836174",
   // storageBucket: "project-id.appspot.com",
   messagingSenderId: "476248991036",
   appId: "1:476248991036:android:d932876bab367d68d7aa39",
   // measurementId: "G-measurement-id",
};


export const linkingConfig = {
   prefixes: ['https://rnproject.com', 'rnproject://'],
   // config: {
   //    screens: {
   //       Home: 'feed/:sort',
   //    },
   // },
};

export const notificationChannels = [
   {
      channelId: 'default',
      channelName: 'Updates',
      channelDescription: '',
      importance: 'HIGH',
      vibrate: true,
      playSound: true,
      soundName: 'notification_sound.mp3',
   },
   {
      channelId: 'promotions',
      channelName: 'Promotions',
      channelDescription: 'Promotions & Newsletters',
      importance: 'DEFAULT',
   },
]

export const broadcastChannels = [
   {
      label: 'Push Notification',
      value: 'push_notification',
   },
   {
      label: 'Email',
      value: 'email',
   },
   {
      label: 'SMS',
      value: 'sms',
   },
]

const config = {
   appVersion: 'v1.0.0-alpha',
}
export default config
