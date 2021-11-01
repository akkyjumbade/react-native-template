const initial_state = {
   query: '',
   queries: {},
   filters: {},
   sort: {},
}

export const T_SEARCH = 'SET_SEARCH_QUERY'
export const T_SEARCH_CLEAR = 'SET_SEARCH_CLEAR'
export const T_SEARCH_FILTER = 'SET_SEARCH_FILTER'
export const T_SEARCH_SORT = 'SET_SEARCH_SORT'

export default function search_reducer(state = initial_state, action) {
   switch (action.type) {
      case T_SEARCH:
         state = {
            ...state,
            query: action.payload
         }
         break;
      case T_SEARCH_CLEAR:
         state = {
            ...state,
            query: ''
         }
         break;
      case T_SEARCH_FILTER:
         state = {
            ...state,
            filters: {
               ...state.filters,
               ...action.payload,
            }
         }
         break;
      case T_SEARCH_SORT:
         state = {
            ...state,
            sort: {
               ...state.sort,
               ...action.payload,
            }
         }
         break;

      default:
         break;
   }
   return state
}
