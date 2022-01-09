import { SERVER_URL } from "@/config";
import store from "@/store";
import { server } from "@/utils/http";
import colors from "@modules/rn-kit/themes/colors";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import deviceInfoModule from "react-native-device-info";
import PushNotification, { Importance } from 'react-native-push-notification';

const defaultProps = {
   largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
   largeIconUrl: `${SERVER_URL}/assets/img/logo.jpeg`, // (optional) default: undefined
   smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
   // bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
   // subText: "This is a subText", // (optional) default: none
   // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
   // bigLargeIcon: "ic_launcher", // (optional) default: undefined
   // bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
   color: colors.primary, // (optional) default: system default
   vibrate: true, // (optional) default: true
   vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
   // tag: "some_tag", // (optional) add tag to message
   // group: "group", // (optional) add group to message
   // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
   // ongoing: false, // (optional) set whether this is an "ongoing" notification
   // priority: "high", // (optional) set notification priority, default: high
   // visibility: "private", // (optional) set notification visibility, default: private
   // ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
   // shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
   // onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
}

export const triggerNotification = (payload) => {
   // alert(JSON.stringify(payload))
   PushNotification.localNotification({
      ...payload,
      ...defaultProps
   })
}

// Must be outside of any component LifeCycle (such as `componentDidMount`).
export const registerPushNotification = () => {
   deviceInfoModule.isEmulator().catch(() => {

      PushNotification.configure({
         // (optional) Called when Token is generated (iOS and Android)
         onRegister: function (token) {
            const bearerToken = store.getState().auth.token
            if (bearerToken) {
               server({ token: bearerToken }).post(`/api/me/update_push_notification`, {
                  ...token
               }).catch(error => {
                  console.log("TOKEN ERROR:", error);
               }).finally(() => {

               })
            }
            console.log("TOKEN:", token);
         },

         // (required) Called when a remote is received or opened, or local notification is opened
         onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);

            // process the notification
            triggerNotification({
               ...notification,
            })

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
         },

         // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
         onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
         },

         // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
         onRegistrationError: function (err) {
            console.error(err.message, err);
         },

         // IOS ONLY (optional): default: all - Permissions to register.
         permissions: {
            alert: true,
            badge: true,
            sound: true,
         },

         // Should the initial notification be popped automatically
         // default: true
         popInitialNotification: true,

         /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          * - if you are not using remote notification or do not have Firebase installed, use this:
          *     requestPermissions: Platform.OS === 'ios'
          */
         requestPermissions: true,
      })
   })
}


function updatePushNotificationChannel(channel) {
}

export function registerPushNotificationChannels(items) {
   items.map(ch => {
      PushNotification.channelExists(ch.id, isExists => {
         if (!isExists) {
            PushNotification.createChannel({
               ...ch,
               importance: Importance[ch.importance] ?? Importance.DEFAULT,
            }, (created) => {
               console.log(`createChannel returned '${created}'`);
            });
         } else {
            // update or
            updatePushNotificationChannel(ch)
         }
      });
   });
}
