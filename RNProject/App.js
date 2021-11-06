import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Bootstrap from "./src/bootstrap";
import store, { persistor } from "./src/store";
import { queryClient } from "./src/utils/http";
import { NetworkProvider } from 'react-native-offline';
import ThemeProvider from "./src/providers/ThemeProvider";

const App = () => {
   return (
      <NetworkProvider>
         <QueryClientProvider client={queryClient}>
            <Provider store={store}>
               <PersistGate persistor={persistor} loading={null} >
                  <ThemeProvider>
                     <Bootstrap />
                  </ThemeProvider>
               </PersistGate>
            </Provider>
         </QueryClientProvider>
      </NetworkProvider>
   )
}

export default App
