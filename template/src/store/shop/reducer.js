const initialState = {
   store_status: 'INIT',
   categories: null,
   tags: null,
   featured_items: null,
   items: null,
   filtered_items: null,
   filters: {
      sort_by: 'name',
      sort_dir: 'ASC',
   },
};

export const T_SET_CATEGORIES = 'SET_CATEGORIES';
export const T_SET_ITEMS = 'SET_ITEMS';
export const T_SET_FILTERED_ITEMS = 'SET_FILTERED_ITEMS';
export const T_SET_TAGS = 'SET_TAGS';
export const T_SET_SORT = 'SET_SORT';
export const T_ADD_ITEMS = 'SHOP_ADD_ITEMS';
export const T_SHOP_STATUS = 'SHOP_STATUS';


export default function shopReducer(state = initialState, action) {
   switch (action.type) {
      case T_SET_CATEGORIES:
         state = {
            ...state,
            categories: action.payload
         }
         break;
      case T_SET_ITEMS:
         state = {
            ...state,
            items: action.payload
         }
         break;
      case T_ADD_ITEMS:
         state = {
            ...state,
            items: state.items.push(...action.payload)
         }
         break;
      case T_SET_FILTERED_ITEMS:
         state = {
            ...state,
            categories: action.payload
         }
         break;
      case T_SET_TAGS:
         state = {
            ...state,
            tags: action.payload,
         }
         break;
      case T_SET_SORT:
         state = {
            ...state,
            tags: action.payload,
         }
         break;
      case T_SHOP_STATUS:
         state = {
            ...state,
            store_status: action.payload,
         }
         break;
      default:
         break;
   }
   return state;
};
