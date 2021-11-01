import React from 'react';
import Bootstrap from './src/bootstrap'

import LoadingPage from './src/pages/LoadingPage';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NetworkProvider } from 'react-native-offline';


const App = () => {

   return (
      <NetworkProvider>
         <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
               <Bootstrap loadingScreen={() => (
                  <LoadingPage />
               )} />
            </PersistGate>
         </Provider>
      </NetworkProvider>
   );
};


export default App;
