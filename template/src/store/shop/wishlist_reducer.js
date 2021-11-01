import localStorage from "../../localStorage"

export const T_WISHLIST_ADD = 'WISHLIST_ADD'
export const T_WISHLIST_REMOVE = 'WISHLIST_REMOVE'
export const T_WISHLIST_CLEAR = 'WISHLIST_CLEAR'
const initialState = {
   items: {},
}

const wishlist_reducer = (state = initialState, action) => {
   switch (action.type) {
      case T_WISHLIST_ADD:
         state = {
            ...state,
            items: {
               ...state.items,
               [action.payload.id]: action.payload
            }
         }
         break;
      case T_WISHLIST_REMOVE:
         delete state.items[action.payload.id]
         state = {
            ...state,
            items: {
               ...state.items,
               [action.payload.id]: null
            }
         }
         break;
      case T_WISHLIST_CLEAR:

         break;

      default:
         break;
   }
   return state
}
export default wishlist_reducer


// actions here


async function saveWishlist(items) {
   localStorage.save({ key: 'Wishlist', data: JSON.stringify(items) })
}
export function add_wishlist_action(item) {
   return async (dispatch, getState) => {
      dispatch({ type: T_WISHLIST_ADD, payload: item, })
      const cartItems = getState(state => state.wishlist.items)
      await saveWishlist(cartItems)
   }
}
export function remove_wishlist_action(item) {
   return async (dispatch, getState) => {
      dispatch({ type: T_WISHLIST_REMOVE, payload: item, })
      const cartItems = getState(state => state.wishlist.items)
      await saveWishlist(cartItems)
   }
}
