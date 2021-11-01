import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import localStorage from "../localStorage";
import configReducer from "./config/reducer";
import postsReducer from "./posts/posts_reducer";
import service_reducer from "./services/service_reducer";
import cart_reducer from "./shop/cart_reducer";
import shopReducer from "./shop/reducer";
import { location_reducer } from "./location/location_reducer";
import wishlist_reducer from "./shop/wishlist_reducer";
import { persistStore, persistReducer } from 'redux-persist'
import { checkout_reducer } from "../../pkgs/ecommerce/src/store/checkout/checkout_reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "auth/src/store/reducer";
import notifications_reducer from "auth/src/store/notifications_reducer";
import http, { server } from "../utils/http";
import permissionsReducer from "auth/src/store/permissionsReducer";
import resources_reducer from "./global/resources_reducer";
import appSettingsReducer from "./global/appSettingsReducer";

const reduxProps = {
   api: http,
   server: server,
   cacheStore: localStorage,
   new: 1,
}
const rootReducer = combineReducers({
   auth: authReducer,
   config: configReducer,
   posts: postsReducer,
   shop: shopReducer,
   cart: cart_reducer,
   service: service_reducer,
   location: location_reducer,
   notifications: notifications_reducer,
   wishlist: wishlist_reducer,
   checkout: checkout_reducer,
   permissions: permissionsReducer,
   resources: resources_reducer,
   // appSettings: appSettingsReducer
})
const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   whitelist: ['auth', 'cart', 'shop', 'location', 'checkout', 'config']
}
export const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk.withExtraArgument(reduxProps, reduxProps)));
export const persistor = persistStore(store)

export default store;
