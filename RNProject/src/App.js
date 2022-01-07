import React, { memo } from "react";
import * as Sentry from "@sentry/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import Bootstrap from "./bootstrap";
import { queryClient } from "./utils/http";
import { NetworkProvider } from 'react-native-offline';
import ThemeContextProvider from "@modules/rn-kit/provider/ThemeContextProvider";
import { Provider } from "react-redux";
import store from "@/store";
import { SENTRY_DSN } from "../.env";

Sentry.init({
   dsn: SENTRY_DSN,
   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
   // We recommend adjusting this value in production.
   tracesSampleRate: 1.0,
});

const App = () => {
   return (
      <React.StrictMode>
         <NetworkProvider>
            <QueryClientProvider client={queryClient}>
               <Provider store={store}>
                  <ThemeContextProvider>
                     <Bootstrap />
                  </ThemeContextProvider>
               </Provider>
            </QueryClientProvider>
         </NetworkProvider>
      </React.StrictMode>
   )
}

export default Sentry.wrap(App)
