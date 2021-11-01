const initialState = {
   q: '',
   suggestions: null,
}

export const T_SET_LOCATION_QUERY = 'SET_QUERY'
export const T_SET_LOCATION_SUGGESTIONS = 'SET_SUGGESTIONS'
export const T_SET_LOCATION_RESULT = 'SET_LOCATION_RESULT'
export const T_SET_LOCATION = 'T_SET_LOCATION'

export function location_reducer(state = initialState, action) {
   switch (action.type) {
      case T_SET_LOCATION_QUERY:
         state = {
            ...state,
            q: action.payload
         }
         break;
      case T_SET_LOCATION_SUGGESTIONS:
         state = {
            ...state,
            suggestions: action.payload
         }
         break;
      case T_SET_LOCATION_RESULT:
         state = {
            ...state,
            result: action.payload
         }
         break;
      case T_SET_LOCATION:
         state = {
            ...state,
            ...action.payload
         }
         break;

      default:
         break;
   }
   return state
}
