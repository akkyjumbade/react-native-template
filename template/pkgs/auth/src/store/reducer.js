import {T_SET_CURRENT_TEAM} from "./teamReducer";

const initialState = {
   token: null,
   user: null,
   currentTeam: null,
   is_authenticated: false,
};

export const T_LOGIN = 'AUTH_LOGIN'
export const T_REGISTER = 'AUTH_REGISTER'
export const T_AUTH_SET = 'SET_USER'
export const T_AUTH_TOKEN = 'SET_TOKEN'
export const T_AUTH_LOGOUT = 'T_AUTH_LOGOUT'
export const T_SET_ADDRESSES = 'T_SET_ADDRESSES'

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case T_REGISTER:
      case T_AUTH_SET:
         state = {
            ...state,
            user: action.payload,
         }
         break;
      case T_LOGIN:
      case T_AUTH_SET:
         state = {
            ...state,
            user: action.payload,
         }
         break;
      case T_AUTH_LOGOUT:
         state = {
            ...state,
            user: null,
            token: null,
            is_authenticated: null,
            currentTeam: null,
         }
         break;
      case T_AUTH_TOKEN:
         state = {
            ...state,
            token: action.payload,
         }
         break;
      case T_SET_ADDRESSES:
         state = {
            ...state,
            savedAddresses: action.payload,
         }
         break;
      case T_SET_CURRENT_TEAM:
         state = {
            ...state,
            currentTeam: action.payload,
         }
         break;

      default:
         break;
   }
   return state;
};
