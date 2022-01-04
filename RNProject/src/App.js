import React, { memo } from "react";
import { enableFreeze } from 'react-native-screens';

import * as Sentry from "@sentry/react-native";
import { QueryClientProvider } from "react-query";
import Bootstrap from "./bootstrap";
import { queryClient } from "./utils/http";
import { NetworkProvider } from 'react-native-offline';
import ThemeContextProvider from "@modules/rn-kit/provider/ThemeContextProvider";
import { Provider } from "react-redux";
import store from "@/store";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import config from "./config";

enableFreeze(true)

Sentry.init({
   dsn: config.SENTRY_DSN,
   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
   // We recommend adjusting this value in production.
   tracesSampleRate: 1.0,
});

const App = () => {
   return (
      <React.Fragment>
         {/* <GestureHandlerRootView> */}
            <NetworkProvider pingInBackground={true} pingOnlyIfOffline={true} pingInterval={500} >
               <QueryClientProvider client={queryClient}>
                  <Provider store={store}>
                     <ThemeContextProvider>
                        <Bootstrap />
                     </ThemeContextProvider>
                  </Provider>
               </QueryClientProvider>
            </NetworkProvider>
         {/* </GestureHandlerRootView> */}
      </React.Fragment>
   )
}

export default App
