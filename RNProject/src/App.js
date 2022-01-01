import React, { memo } from "react";
import { QueryClientProvider } from "react-query";
import Bootstrap from "./bootstrap";
import { queryClient } from "./utils/http";
import { NetworkProvider } from 'react-native-offline';
import ThemeContextProvider from "@modules/rn-kit/provider/ThemeContextProvider";
import { Provider } from "react-redux";
import store from "@/store";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
   return (
      <React.Fragment>
         <NetworkProvider pingInBackground={true} >
            <QueryClientProvider client={queryClient}>
               <Provider store={store}>
                  <ThemeContextProvider>
                     <Bootstrap />
                     {/* <GestureHandlerRootView>
                     </GestureHandlerRootView> */}
                  </ThemeContextProvider>
               </Provider>
            </QueryClientProvider>
         </NetworkProvider>
      </React.Fragment>
   )
}

export default App
