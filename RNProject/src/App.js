import React, { Fragment, memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import Bootstrap from "./bootstrap";
import { queryClient } from "./utils/http";
import { NetworkProvider } from 'react-native-offline';
import ThemeContextProvider from "@modules/rn-kit/provider/ThemeContextProvider";
import { Provider } from "react-redux";
import store from "@/store";
import { SENTRY_DSN } from "../.env";
import { registerPushNotification } from "./services/PushNotificationService";

registerPushNotification()

const App = () => {
   return (
      <Fragment>
         <NetworkProvider>
            <QueryClientProvider client={queryClient}>
               <Provider store={store}>
                  <ThemeContextProvider>
                     <Bootstrap />
                  </ThemeContextProvider>
               </Provider>
            </QueryClientProvider>
         </NetworkProvider>
      </Fragment>
   )
}

export default App
