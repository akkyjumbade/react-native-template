const initialState = {
   items: {},
   subtotal: 0,
   total: 0,
   coupon_code: 0,
   discount: 0,
}
export const T_CART_ADD = 'CART_ADD'
export const T_CART_INCREMENT = 'CART_INCREMENT'
export const T_CART_DECREMENT = 'CART_DECREMENT'
export const T_CART_REMOVE = 'CART_REMOVE'
export const T_CART_CLEAR = 'CART_CLEAR'
export const T_CART_UPDATE = 'CART_UPDATE'

function clearEmpties(o) {
   for (var k in o) {
      if (!o[k] || typeof o[k] !== "object") {
         continue // If null or not an object, skip to the next iteration
      }

      // The property is an object
      if (Object.keys(o[k]).length === 0) {
         delete o[k]; // The object had no properties, so delete that property
      }
   }
}

const cart_reducer = (state = initialState, action) => {
   switch (action.type) {
      case T_CART_ADD:
         state = {
            ...state,
            items: {
               ...state.items,
               [action.payload.id]: {
                  ...action.payload,
                  qty: 1
               }
            }
         }
         break;
      case T_CART_INCREMENT:
         let initQty = action.payload.qty ?? 0
         state = {
            ...state,
            items: {
               ...state.items,
               [action.payload.id]: {
                  ...action.payload,
                  qty: initQty + 1
               }
            }
         }
         break;
      case T_CART_DECREMENT:
         let initQty2 = action.payload.qty ?? 0
         state = {
            ...state,
            items: {
               ...state.items,
               [action.payload.id]: {
                  ...action.payload,
                  qty: initQty2 - 1
               }
            }
         }
         break;
      case T_CART_REMOVE:
         delete state.items[action.payload.id]
         state = {
            ...state,
            items: {
               ...state.items,
               [action.payload.id]: null
            }
         }
         let _items = clearEmpties(state.items)
         state = {
            ...state,
            items: {
               ...state.items,
              ..._items
            }
         }
         break;
      case T_CART_UPDATE:
         state = {
            ...state,
            ...action.payload
         }
         break;
      case T_CART_CLEAR:

         break;

      default:
         break;
   }
   return state
}
export default cart_reducer

export const cart_item_increment_qty_action = (item, qty = 1) => {
   return dispatch => {
      dispatch({ type: T_CART_INCREMENT, payload: item })
   }
}
export const cart_item_decrement_qty_action = (item, qty = 1) => {
   return dispatch => {
      dispatch({ type: T_CART_DECREMENT, payload: item })
      // calcCartSummary(dispatch)
   }
}

// function calcCartSummary() {
//    dispatch({
//       type: ''
//    })
// }

