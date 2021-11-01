const initialState = {
   recent_transactions: null,
   services: null,
   service_status: 'INIT',
   providers: null,
   all_operators: null,
};

export const T_SET_SERVICES = 'SET_SERVICES'
export const T_SET_SERVICE_STATUS = 'SET_SERVICE_STATUS'
export const T_SET_SERVICE_PROVIDERS = 'SET_SERVICE_PROVIDERS'
export const T_SET_SERVICE_UPDATE = 'SET_SERVICE_UPDATE'

export default function service_reducer(state = initialState, action) {
   switch (action.type) {
      case T_SET_SERVICES:
         state = {
            ...state,
            services: action.payload,
         }
         break;
      case T_SET_SERVICE_STATUS:
         state = {
            ...state,
            service_status: action.payload
         }
         break;
      case T_SET_SERVICE_PROVIDERS:
         state = {
            ...state,
            providers: action.payload
         }
         break;
      case T_SET_SERVICE_UPDATE:
         state = {
            ...state,
            ...action.payload
         }
         break;
      default:
         break;
   }
   return state;
}
