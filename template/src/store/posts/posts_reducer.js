const initialState = {
   categories: null,
   tags: null,
   banners: null,
   offers: null,
   items: null,
};

export const T_SET_POSTS = 'SET_POSTS'

export default function postsReducer(state = initialState, action) {
   switch (action.type) {
      case T_SET_POSTS:
         state = {
            ...state,
            ...action.payload,
         }
         break;

      default:
         break;
   }
   return state;
};
