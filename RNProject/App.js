import React, { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import Bootstrap from "./src/bootstrap";
import { queryClient } from "./src/utils/http";
import { NetworkProvider } from 'react-native-offline';
import ThemeContextProvider from "@ui/provider/ThemeContextProvider";
import { Provider } from "react-redux";
import store from "@/store";

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

export default App
