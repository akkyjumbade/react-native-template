import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import store, { persistor } from "./src/store";
import { theme } from "./src/style";
import { queryClient } from "./src/utils/http";

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <PersistGate persistor={persistor} loading={null} >
               <ThemeProvider theme={theme}>
                  <SafeAreaProvider>
                     <Text>Hello world</Text>
                  </SafeAreaProvider>
               </ThemeProvider>
            </PersistGate>
         </Provider>
      </QueryClientProvider>
   )
}

export default App
